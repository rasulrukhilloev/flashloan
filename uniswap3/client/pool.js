const { ethers } = require('ethers');
const { Pool } = require('@uniswap/v3-sdk');
const { Token } = require('@uniswap/sdk-core');
const {
  abi: QuoterABI,
} = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');

const poolAddress = '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8';

const poolContract = new ethers.Contract(poolAddress, QuoterABI);
//finish it 46
