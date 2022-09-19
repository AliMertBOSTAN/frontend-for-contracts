import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../constants/Addresses.js";
import { ABI } from "../constants/ABI.js";

export const useContract = () => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const _contract = new ethers.Contract(contractAddress, ABI, signer);
        console.log("Address", contractAddress);
        console.log("Provider:", provider);
        setContract(_contract);
        console.log("Contract", contract);
    }, []);

    return contract;
};