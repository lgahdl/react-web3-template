import { type Address } from "viem";
import { readContract, writeContract } from "@wagmi/core";
import { config } from "@/wagmi";

class ViemClient {
  private connectedAccount?: Address;

  constructor(connectedAccount?: Address) {
    this.connectedAccount = connectedAccount;
  }

  // Update the connected account
  setAccount(account?: Address) {
    this.connectedAccount = account;
    return this;
  }

  // Generic read contract function
  async readContract({
    address,
    abi,
    functionName,
    args = [],
  }: {
    address: Address;
    abi: any;
    functionName: string;
    args?: any[];
  }) {
    const result = readContract(config, {
      abi,
      address,
      functionName,
      args,
    });
    return result;
  }

  // Generic write contract function
  async writeContract({
    address,
    abi,
    functionName,
    args = [],
    account,
  }: {
    address: Address;
    abi: any;
    functionName: string;
    args?: any[];
    account?: Address;
  }) {
    const result = await writeContract(config, {
      address,
      abi,
      functionName,
      args,
      account: account || this.connectedAccount,
    });

    if (!this.connectedAccount && !account) {
      throw new Error("No connected account for write operation");
    }
    return result;
  }
}

// Export a default instance with mainnet
export default ViemClient;
