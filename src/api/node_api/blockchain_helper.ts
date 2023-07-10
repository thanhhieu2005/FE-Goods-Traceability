import Web3 from "web3";

let selectedAccount;

// let nftContract;
let erc20Contract : any;

let isInitialized = false;

export const init = async () => {
  const provider = window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts: any) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err: any) => {
        console.log(err);
        return;
      });

    window.ethereum.on("accountsChanged", function (accounts: any) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }

  const web3 = new Web3(provider);

  const erc20Abi: any = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      inputs: [
        { internalType: "string", name: "_productId", type: "string" },
        {
          internalType: "string",
          name: "_contractContentId",
          type: "string",
        },
        {
          internalType: "address",
          name: "_creatorAddress",
          type: "address",
        },
      ],
      name: "addTrackingBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_productId", type: "string" }],
      name: "getTrackingBlock",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "trackingCreator",
              type: "address",
            },
            {
              internalType: "string",
              name: "contractContentId",
              type: "string",
            },
            { internalType: "string", name: "productId", type: "string" },
          ],
          internalType: "struct TrackingModel.tracking",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "trackingChain",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  erc20Contract = new web3.eth.Contract(
    erc20Abi,
    // Dai contract on Polygon
    "0x456E5aC29729C18d4C43ef3a1aA91074E9b3bD38"
  );

  isInitialized = true;
};

export const getTrackingBlock = async () => {
  if (!isInitialized) {
    await init();
  }
  const provider = window.ethereum;

  const account: any = await provider.request({ method: "eth_requestAccounts" });

  erc20Contract.methods
    .getTrackingBlock("ReactContractID")
    .call()
    .then((result: any) => {
      console.log(result);
      return result;
    });
};

export const addTrackingBlock = async (transactionId: any, contentTransaction: any) => {
  if (!isInitialized) {
    await init();
  }
  const provider = window.ethereum;

  const account = await provider.request({ method: "eth_requestAccounts" });

  const tx = await erc20Contract.methods
    .addTrackingBlock(transactionId, contentTransaction, account[0])
    .send({ from: account[0] });

  console.log(tx);

  return tx;
};
