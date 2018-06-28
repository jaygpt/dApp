const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
//interface is abi key which interacts with js and solidity whereas bytecode is overall contract
const provider = new HDWalletProvider('melt garment circle duck rude report argue tongue gate harbor carpet nephew','https://rinkeby.infura.io/IwXeaA7paHZsIDAMIwMw');
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from', accounts[0]);

    const results = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ gas: 1000000,from: accounts[0]})
    console.log('contract deployed to ', results.options.address);
};
deploy();