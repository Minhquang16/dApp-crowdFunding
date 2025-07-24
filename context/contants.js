import  { ethers } from "ethers";
import Web3Modal from "web3modal";
import crowdFunding from './CrowdFunding.json';

//crowfunding marketplace 


export const CrowdFundingAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK;

export const CrowdFundingABI = crowdFunding.abi;