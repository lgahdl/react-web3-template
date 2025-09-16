import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import ViemClient from "@/lib/viemClient";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
const Home: NextPage = () => {
  const { address, chain } = useAccount();
  const [client, setClient] = useState<ViemClient | null>(
    new ViemClient(address)
  );
  const [message, setMessage] = useState<string>("");
  // Initialize or update the ViemClient when the connected address changes
  useEffect(() => {
    // Update client with connected account
    if (client) {
      client.setAccount(address);
    } else {
      // Initialize client first time
      setClient(new ViemClient(address));
    }
  }, [address, chain]);

  // Example contract details (replace with your own)
  const contractAddress = "0x6dfa800959236260e9b2d5ed24609f01825370cb";
  const contractAbi = [
    {
      inputs: [],
      name: "getMessage",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "message",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "newMessage",
          type: "string",
        },
      ],
      name: "setMessage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // Generic read transaction
  const sendReadTransaction = async () => {
    try {
      if (!client) {
        alert("Client not initialized");
        return;
      }
      const result = await client.readContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "getMessage",
      });
      console.log(result);
      alert("Read result: " + result);
    } catch (error) {
      alert("Read error: " + error);
    }
  };

  // Generic write transaction
  const sendWriteTransaction = async () => {
    try {
      // Example: set value to 42
      if (!address) {
        alert("No wallet connected");
        return;
      }

      if (!client) {
        alert("Client not initialized");
        return;
      }

      const txHash = await client.writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "setMessage",
        args: [message],
      });
      alert("Write tx sent: " + txHash);
    } catch (error) {
      alert("Write error: " + error);
    }
  };
  return (
    <div>
      <Head>
        <title>React Web3 Template</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="h-screen w-full flex flex-col bg-[#513A79]">
        <div className="h-14 bg-[#2D2836] w-full p-2">
          <ConnectButton />
        </div>
        <div className="flex flex-col flex-1 p-2 gap-2">
          <h1 className="text-white">React Web3 Template</h1>
          <Button
            className="w-122 cursor-pointer  hover:bg-purple-900"
            onClick={() => {
              sendReadTransaction();
            }}
          >
            Send Read Transaction
          </Button>
          <div className="flex gap-2">
            <Input
              placeholder="Enter new message"
              value={message}
              onChange={(e) => {
                e.preventDefault();
                setMessage(e.target.value);
              }}
              className="bg-gray-200 text-black w-60"
            />
            <Button
              className="w-60 cursor-pointer hover:bg-purple-900"
              onClick={() => {
                sendWriteTransaction();
              }}
            >
              Send Write Transaction
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
