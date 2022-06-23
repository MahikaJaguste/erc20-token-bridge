// import { HDWalletProvider } from '@truffle/hdwallet-provider';
const { POSClient, use } = require('@maticnetwork/maticjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-ethers');
const { mumbaiDatahubApi, goerliInfuraApi, privateKey } = require('../secrets.json');

// install ethers plugin
use(Web3ClientPlugin);

const from = "0xa518097A3843F10c06a9B9419aa02245771dD442"; // the user account that wants to transfer funds
const rootToken = "0x137fc8df51dd3dfc127cab7cfab4c05eb3016f64"; // Goerli address of ERC20 token
const childToken = "0x1d607faa0a51518a7728580c238d912747e71f7a"; //Mumbai address of mapped ERC20 token
const amount = 1 * (10 ** 18);

const parentProvider = new ethers.providers.JsonRpcProvider(goerliInfuraApi); // Infura Goerli testnet JSONRPC URL
const maticProvider = new ethers.providers.JsonRpcProvider(mumbaiDatahubApi); // DataHub Mumbai Testnet JSONRPC URL

const posClient = new POSClient();

(async () => {
  await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new ethers.Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : from
      }
    },
    child: {
      provider: new ethers.Wallet(privateKey, maticProvider),
      defaultConfig: {
        from : from
      }
    }
  });

  // get token contracts
  const parentERC20Token = posClient.erc20(rootToken, true);
  const childERC20Token = posClient.erc20(childToken);

  // getBalance for both tokens
  try{
    const balance = await parentERC20Token.getBalance(from);
    console.log(balance);
    const balance_child = await childERC20Token.getBalance(from);
    console.log(balance_child);
  }
  catch(err){
    console.log(err);
  }

  // // approve on goerli and deposit on mumbai
  // try{
  //   const approveResult = await parentERC20Token.approve(amount.toString(), {from, gasPrice: "10000000000"});
  //   const approveTxHash = await approveResult.getTransactionHash();
  //   const approveTxReceipt = await approveResult.getReceipt();
  //   console.log("Approve resut:", approveResult);
  //   console.log("Approve transaction hash:", approveTxHash);
  //   console.log("Approve transaction receipt:", approveTxReceipt);

  //   const depositResult = await parentERC20Token.deposit(amount.toString(), from, {from, gasPrice: "10000000000"});
  //   const depositTxHash = await depositResult.getTransactionHash();
  //   const depositTxReceipt = await depositResult.getReceipt();
  //   console.log("Deposit resut:", depositResult);
  //   console.log("Deposit transaction hash:", depositTxHash);
  //   console.log("Deposit transaction receipt:", depositTxReceipt);
  // }
  // catch(err){
  //   console.log(err);
  // }

  try{
    const isDeposited = await posClient.isDeposited('0x6190693f18802dc6b2c1a1471e0aeff2d34a4ce4cfc92bced437fc86f4b1c786');
    console.log(isDeposited);
  }
  catch(err){
    console.log(err);
  }

})();