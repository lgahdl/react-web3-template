import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import ViemClient from "@/lib/viemClient";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import alchemy from "@/lib/alchemyClient";
import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const Home: NextPage = () => {
  const { address, chain } = useAccount();
  const [client, setClient] = useState<ViemClient | null>(
    new ViemClient(address)
  );
  const [walletAddressToSearch, setWalletAddressToSearch] =
    useState<string>("");

  const [transactions, setTransactions] = useState<AssetTransfersResult[]>([]);
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

  const searchTransactions = async () => {
    try {
      const transactions = await alchemy.core.getAssetTransfers({
        fromAddress: walletAddressToSearch ?? address,
        category: [AssetTransfersCategory.ERC20],
        contractAddresses: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"],
      });

      setTransactions(transactions.transfers);
    } catch (error) {
      alert("Error fetching transactions: " + error);
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
        <div className="flex flex-col p-2 gap-2">
          <h1 className="text-white">React Web3 Template</h1>
          {/* <Button
            className="w-122 cursor-pointer  hover:bg-purple-900"
            onClick={() => {
              sendReadTransaction();
            }}
          >
            Send Read Transaction
          </Button> */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter wallet address"
              value={walletAddressToSearch}
              onChange={(e) => {
                e.preventDefault();
                setWalletAddressToSearch(e.target.value);
              }}
              className="bg-gray-200 text-black w-60"
            />
            <Button
              className="w-60 cursor-pointer hover:bg-purple-900"
              onClick={() => {
                searchTransactions();
              }}
            >
              Search Address Transactions
            </Button>
          </div>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow className=" bg-gray-200">
                <TableHead className="w-[100px]">Tx Hash</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {transactions.map((tx) => (
                <TableRow key={tx.uniqueId}>
                  <TableCell className="font-medium">
                    {tx.hash.substring(0, 6) +
                      "..." +
                      tx.hash.substring(tx.hash.length - 4)}
                  </TableCell>
                  <TableCell>
                    {tx.from.substring(0, 6) +
                      "..." +
                      tx.from.substring(tx.from.length - 4)}
                  </TableCell>
                  <TableCell>
                    {tx.to
                      ? tx.to.substring(0, 6) +
                        "..." +
                        tx.to.substring(tx.to.length - 4)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(tx.value) / 10 ** 6} {tx.asset}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={"https://etherscan.io/tx/" + tx.hash}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Home;
