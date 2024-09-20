// App.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Dapp with Metamask Authentication</h1>
        {!isConnected && (
          <div>
            <button onClick={onConnect}>Connect to Metamask</button>
          </div>
        )}
        {isConnected && (
          <div>
            <p>You are connected to Metamask</p>
            <p>ETH Balance: {ethBalance}</p>
            <button onClick={onDisconnect}>Disconnect</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
