export type AlchemyTransaction = {
  blockNum: string;
  uniqueId: string;
  hash: string;
  from: string;
  to: string | null;
  value: number;
  erc721TokenId: null;
  erc1155Metadata: null;
  tokenId: null;
  asset: "USDC";
  category: "erc20";
  rawContract: {
    value: string;
    address: string;
    decimal: string;
  };
};
