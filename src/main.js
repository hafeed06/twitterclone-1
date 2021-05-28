window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        console.log('ethereum accessible')
        address = await web3.eth.getAccounts();
        balance = await web3.eth.getBalance(address[0]);
        console.log(balance)
        try {
            await ethereum.enable();
        
        } catch (error) {
            console.log(error)
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});