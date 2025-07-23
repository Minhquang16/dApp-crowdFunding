require('dotenv').config({ path: '.env.local' });
const { ethers } = require("ethers");
const crowdFunding = require('./context/CrowdFunding.json');

async function createTestCampaigns() {
    try {
        console.log("🎯 Creating test campaigns...");
        
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        console.log("📍 Contract Address:", contractAddress);
        
        // Connect to local network
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        const signer = provider.getSigner(0); // Use first account
        const contract = new ethers.Contract(contractAddress, crowdFunding.abi, signer);
        
        const signerAddress = await signer.getAddress();
        console.log("👤 Signer address:", signerAddress);
        
        // Create test campaigns
        const campaigns = [
            {
                title: "Build Community Center",
                description: "Help us build a community center for local activities and events",
                target: ethers.utils.parseEther("15"), // 15 ETH
                deadline: Math.floor(Date.now() / 1000) + (45 * 24 * 60 * 60) // 45 days from now
            },
            {
                title: "Education Fund for Children",
                description: "Support education for underprivileged children in rural areas",
                target: ethers.utils.parseEther("8"), // 8 ETH
                deadline: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days from now
            },
            {
                title: "Clean Water Project",
                description: "Provide clean water access to remote villages",
                target: ethers.utils.parseEther("25"), // 25 ETH
                deadline: Math.floor(Date.now() / 1000) + (60 * 24 * 60 * 60) // 60 days from now
            },
            {
                title: "Animal Shelter Support",
                description: "Help maintain and expand our local animal shelter",
                target: ethers.utils.parseEther("5"), // 5 ETH
                deadline: Math.floor(Date.now() / 1000) + (20 * 24 * 60 * 60) // 20 days from now
            }
        ];
        
        for (let i = 0; i < campaigns.length; i++) {
            const campaign = campaigns[i];
            console.log(`\n📝 Creating campaign ${i + 1}: ${campaign.title}`);
            
            const tx = await contract.createCampaign(
                signerAddress,
                campaign.title,
                campaign.description,
                campaign.target,
                campaign.deadline
            );
            
            await tx.wait();
            console.log(`✅ Campaign ${i + 1} created successfully!`);
        }
        
        // Verify campaigns were created
        const allCampaigns = await contract.getCampaigns();
        console.log(`\n🎉 Total campaigns created: ${allCampaigns.length}`);
        
        allCampaigns.forEach((campaign, index) => {
            console.log(`\nCampaign ${index + 1}:`);
            console.log(`  Title: ${campaign.title}`);
            console.log(`  Target: ${ethers.utils.formatEther(campaign.target)} ETH`);
            console.log(`  Collected: ${ethers.utils.formatEther(campaign.amountCollected)} ETH`);
        });
        
        console.log("\n🚀 Ready to test the DApp!");
        console.log("📱 Run: npm run dev");
        console.log("🌐 Visit: http://localhost:3000");
        
    } catch (error) {
        console.error("💥 Error creating test campaigns:", error);
    }
}

createTestCampaigns();