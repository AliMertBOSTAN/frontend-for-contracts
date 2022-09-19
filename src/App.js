import { BigNumber, Contract, ethers } from "ethers";
import React, { useState } from "react";
import { useContract } from "./hooks/Contract.js";

function App() {
  const Contract = useContract();
  console.log("Contract in App.js", Contract);
  const [data, setdata] = useState({
    address: "",
  });
  const [result, setResult] = useState([]);

  const btnhandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  const accountChangeHandler = (account) => {
    setdata({
      address: account,
    });
  };


  const getContract = async () => {
    if (!Contract) {
      console.log("Contract address is:", Contract)
      return;
    }
    const _result = await Contract.swap("0xc7198437980c041c805A1EDcbA50c1Ce5db95118", "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70", 123, true, false, 100000, 0, 10, 9, 0x1);
    // const result = await Contract.readslot(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
    setResult(_result);

    console.log("Contract info:", _result)
  };

  return (
    <div className="App">
      <button onClick={btnhandler}>
        Connect to wallet
      </button>

      <button onClick={getContract}>Do swap from CorcSwap contract</button>
      <br />
      <br />
      <div>{`from: ${result.from}`} </div>
      <div>{`to: ${result.to} `} </div>
      <div>{`hash: ${result.hash}`} </div>
      <div>{`value: ${result.value}`} </div>
    </div>
  );
}

export default App;
