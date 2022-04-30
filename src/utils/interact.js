import * as dotenv from 'dotenv';
import contractABI from "../contract-abi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

dotenv.config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const web3 = createAlchemyWeb3(alchemyKey);
const contractAddress = process.env.CONTRACT_ADDRESS;

export const bankContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            const obj = {
                status: "",
                address: addressArray[0],
              };
            return obj;
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
              };
        }
    } 
}

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "",
          };
        } else {
          return {
            address: "",
            status: "Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    }
};