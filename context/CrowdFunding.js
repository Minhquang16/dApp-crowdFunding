import React ,{useState, useEffect } from "react";
import Web3Modal from "web3modal"; 
import {ethers} from "ethers";


//internal import 

import { CrowdFundingABI, CrowdFundingAddress } from "./contants";

// ---fetching smart contract
const fetchContract = (signerOrProvider) => 
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI,signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children}) =>{
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) =>{
        const {title, description, amount, deadline} = campaign;
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount);

        try{
            const transaction = await contract.createCampaign(
                currentAccount,//owner
                title, //title
                description, //description
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime() //dealine

                );
            await transaction.wait();

            console.log("contract call success", transaction);
        }catch(error){
            console.log("contract call failure", error);
        }
    };

    const getCampaigns = async () =>{
        try {
            // Kiểm tra xem contract address có tồn tại không
            if (!CrowdFundingAddress) {
                console.error("Contract address is not defined");
                return [];
            }

            const provider = new ethers.providers.JsonRpcProvider("SEPOLIA_RPC_URL");
            const contract = fetchContract(provider);

            const campaigns = await contract.getCampaigns();
            console.log("Raw campaigns from contract:", campaigns);

            if (!campaigns || campaigns.length === 0) {
                console.log("No campaigns found");
                return [];
            }

            const parsedCampaigns = campaigns.map((campaign,i)=>({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(
                    campaign.amountCollected.toString()
                ),
                pId: i,
            }));
            
            console.log("Parsed campaigns:", parsedCampaigns);
            return parsedCampaigns;
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            return [];
        }
    };

    const getUserCampaigns = async () =>{
        try {
            // Kiểm tra xem contract address có tồn tại không
            if (!CrowdFundingAddress) {
                console.error("Contract address is not defined");
                return [];
            }

            const provider = new ethers.providers.JsonRpcProvider("SEPOLIA_RPC_URL");
            const contract = fetchContract(provider);

            const allCampaigns = await contract.getCampaigns();

            // Kiểm tra xem có MetaMask không
            if (!window.ethereum) {
                console.error("MetaMask is not installed");
                return [];
            }

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            
            if (!accounts || accounts.length === 0) {
                console.log("No accounts connected");
                return [];
            }

            const currentUser = accounts[0];

            const filteredCampaigns = allCampaigns.filter(
                (campaign) =>
                    campaign.owner.toLowerCase() === currentUser.toLowerCase()  
                // lấy  địa chỉ ví động 
            );

            const userData = filteredCampaigns.map((campaign, i)=>({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(
                    campaign.amountCollected.toString()
                ),
                pId: i,
            }));
            
            console.log("User campaigns:", userData);
            return userData;
        } catch (error) {
            console.error("Error fetching user campaigns:", error);
            return [];
        }
    };

    const donate = async (pId, amount) =>{
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId,{
            value: ethers.utils.parseEther(amount),
        });
        await campaignData.wait();
        location.reload();

        return campaignData;
    };
    const getDonations = async(pId) =>{
        const provider = new ethers.providers.JsonRpcProvider("SEPOLIA_RPC_URL");
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOrDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i < numberOrDonations; i++){
            parsedDonations.push({
                donator: donations[0][1],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }
        return parsedDonations;
    };

    //check if wallet

    const checkIfWalletConnected = async ()=>{
        try{
            if(!window.ethereum)
                return setOpenError(true), setError("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{
                console.log("No Account Found");
            }
        }catch(error){
            console.log("Something wrong while connecting to wallet");
        }
    };

    useEffect(()=>{
        checkIfWalletConnected();
    },[]);

    //connect wallet function

    const connectWallet = async () =>{
        try{
            if(!window.ethereum)
                return setOpenError(true), setError("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

                setCurrentAccount(accounts[0]);
        }catch(error){
            console.log("Error while connecting to wallet");
        }
    };

    return (
        <CrowdFundingContext.Provider
        value={{
            titleData,
            currentAccount,
            createCampaign,
            getCampaigns,
            getUserCampaigns,
            donate,
            getDonations,
            connectWallet
        }}>
        {children}
        </CrowdFundingContext.Provider>
    );
};

