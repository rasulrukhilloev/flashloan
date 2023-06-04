const { ethers } = require('ethers');
const {
  abi: QuoterABI,
} = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.g.alchemy.com/v2/uTmQDs8Y1PQXGcHP4NGmEDTYpclCoYpy'
);

async function getPrice(addressFrom, addresssTo, amountInHuman) {
  const quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';

  const quotetrContract = new ethers.Contract(
    quoterAddress,
    QuoterABI,
    provider
  );

  const amountIn = ethers.utils.parseUnits(amountInHuman, 6);
  const quoteAmountOut = await quotetrContract.callStatic.quoteExactInputSingle(
    addressFrom,
    addresssTo,
    3000,
    amountIn.toString(),
    0
  );
  const amount = ethers.utils.formatUnits(quoteAmountOut.toString(), 18);

  return amount;
}

const main = async () => {
  const addressFrom = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
  const addresssTo = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  const amountInHuman = '1900';
  const amountOut = await getPrice(addressFrom, addresssTo, amountInHuman);
  console.log({ amountOut });
};
main();
