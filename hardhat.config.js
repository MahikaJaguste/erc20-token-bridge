// hardhat.config.js
const { infuraProjectId, mnemonic, etherscanApiKey } = require('./secrets.json');

require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  networks: { 
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraProjectId}`,
      accounts: {mnemonic: mnemonic}
    },
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherscanApiKey
  },
  solidity: "0.8.9"
};