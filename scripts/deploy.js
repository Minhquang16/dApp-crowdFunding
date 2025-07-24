const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying CrowdFunding contract...");

  await hre.run('compile');

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");

  const [deployer] = await hre.ethers.getSigners();
  const balance = await deployer.getBalance();
  console.log("👤 Deployer address:", deployer.address);
  console.log("💰 Balance:", hre.ethers.utils.formatEther(balance), "ETH");

  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.deployed();

  const address = crowdFunding.address;
  console.log("✅ CrowdFunding deployed to:", address);
  console.log("🌐 Network:", hre.network.name);

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
