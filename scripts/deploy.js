async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 

  const ERC20Basic = await ethers.getContractFactory("ERC20Basic"); // Getting the Contract
  const erc20Basic = await ERC20Basic.deploy(100); //deploying the contract

  await erc20Basic.deployed(); // waiting for the contract to be deployed

  console.log("ERC20Basic deployed to:", erc20Basic.address); // Returning the contract address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract 