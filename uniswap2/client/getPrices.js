const ethers = require('ethers');

const {
  addressFrom,
  addressTo,
  addressFactory,
  addressRouter,
} = require('./addressList');

const { erc20, factoryABI, pairAbi, routerAbi } = require('./abiList');

// Strandard Provider
const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.g.alchemy.com/v2/uTmQDs8Y1PQXGcHP4NGmEDTYpclCoYpy'
);

//Connect to Factory
const contractFactory = new ethers.Contract(
  addressFactory,
  factoryABI,
  provider
);

//Connect to Routerß
const contractRouter = new ethers.Contract(addressRouter, routerAbi, provider);

//Call the Blockchain
const getPrices = async (amountInHuman) => {
  //Convert amout in human form
  const contractToken = new ethers.Contract(addressFrom, erc20, provider);
  const decimals = await contractToken.decimals();
  const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString();

  //Get amounts out
  const amountsOut = await contractRouter.getAmountsOut(
    amountIn,
    [
      addressFrom, //BUSD
      addressTo,
    ] // WBUSD
  );

  //Convert amount out - decimals
  const contractToken2 = new ethers.Contract(addressTo, erc20, provider);
  const decimals2 = await contractToken2.decimals();

  //Convert amount out - human
  const amountOutHuman = ethers.utils.formatUnits(
    amountsOut[1].toString(),
    decimals2
  );
  console.log(amountOutHuman);
};

const amountInHuman = '1';

getPrices(amountInHuman);
