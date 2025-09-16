import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/o3n2H3TcOJ0hl8ATxsz0Brx3g-xyg9yp"
    ),
  },
  ssr: true,
});
