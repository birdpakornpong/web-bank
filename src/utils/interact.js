import * as dotenv from 'dotenv';
import contractABI from "../contract-abi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

dotenv.config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
export const web3 = createAlchemyWeb3(alchemyKey);
const contractAddress = "0xb97d05B5b4e50567767B65dB76DFE9f603a2E6F5";

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

export const checkBalanceOwner = async (owner) => {
    const balance = await bankContract.methods.balanceOf(String(owner)).call(function (err, res) {
        if (err) {
            return 0
        }
        return res
    });
    return balance
}

export const checkTotalBalance = async (owner) => {
    const totalBalance = await bankContract.methods.checkTotal().call();
    return totalBalance
}

async function sendTransaction(transactionParameters) {
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            status: (transactionView(txHash)),
            type: "success"
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
            type: "error"
        };
    }
}

const transactionView = (txHash) => {
    return (
        <span>
            ✅{" "}
            <a target="_blank" href={`https://kovan.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
            </a>
            <br />
        </span>
    )
}

export const depositAmount = async (address, amount) => {
    // value เลขฐาน 16
    const amountSix = web3.utils.toHex(amount);
    const transactionParameters = {
        to: contractAddress,
        from: address,
        value: amountSix,
        data: bankContract.methods.deposit().encodeABI(),
    }
    const status = await sendTransaction(transactionParameters)
    return status
}

export const withdrawAmount = async (address, amount) => {
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: bankContract.methods.withdraw(amount).encodeABI(),
    }
    const status = await sendTransaction(transactionParameters)
    return status
}

export const transferAmount = async (address, to, amount) => {
    const transactionParameters = {
        to: contractAddress, 
        from: address,
        data: bankContract.methods.transfer(to,amount).encodeABI(),
    };
    const status = await sendTransaction(transactionParameters)
    return status
}