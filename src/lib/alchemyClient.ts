import { Alchemy, Network } from "alchemy-sdk";
import dotenv from "dotenv";
dotenv.config;

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",
  network: Network.ETH_MAINNET,
};

export default new Alchemy(config);
