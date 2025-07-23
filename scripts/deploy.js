const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying CrowdFunding contract...");
  
  // Compile contracts
  await hre.run('compile');
  
  // Get the contract factory
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  
  // Deploy the contract
  const crowdFunding = await CrowdFunding.deploy();
  
  // Wait for deployment
  await crowdFunding.deployed();
  
  const address = crowdFunding.address;
  
  console.log("✅ CrowdFunding deployed to:", address);
  console.log("🌐 Network:", hre.network.name);
  
  // Save address to a file for easy access
  const fs = require('fs');
  const deploymentInfo = {
    address: address,
    network: hre.network.name,
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to deployment.json");
  
  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });