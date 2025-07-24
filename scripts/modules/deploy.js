const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");
  
  // Get the contract factory
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  console.log("📄 Contract factory created");
  
  // Deploy the contract
  console.log("⏳ Deploying contract...");
  const crowdFunding = await CrowdFunding.deploy();
  
  // Wait for deployment to finish
  await crowdFunding.waitForDeployment();
  
  const contractAddress = await crowdFunding.getAddress();
  console.log(`✅ CrowdFunding deployed to: ${contractAddress}`);
  
  // Verify deployment
  const deployedCode = await hre.ethers.provider.getCode(contractAddress);
  if (deployedCode === "0x") {
    throw new Error("❌ Contract deployment failed - no code at address");
  }
  
  console.log("🎉 Deployment successful!");
  console.log(`📍 Contract Address: ${contractAddress}`);
  console.log(`🌐 Network: ${hre.network.name}`);
  
  return contractAddress;
}

// Execute deployment
main()
  .then((address) => {
    console.log(`\n🔥 COPY THIS ADDRESS TO .env.local:`);
    console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Deployment failed:", error);
    process.exit(1);
  });