const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } =  require('../compile');
let accounts;
let inbox;
beforeEach(async ()=>{
    //list
    accounts = await web3.eth.getAccounts();
    //contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({from: accounts[0], gas: '134600'})
});

describe('Inbox',()=>{
    it('deploy contract',()=>{
        //options is place where all basic details are stored
        assert.ok(inbox.options.address);
    });
    it('default message',async ()=>{
        //methods is place where all public msg is saved
        const message = await inbox.methods.message().call();
        //calling message with no arguments and call is called with no transcation here
        assert.equal(message,'Hi there!');
    });

    it('updated message',async ()=>{
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        //calling message with no arguments and call is called with no transcation here
        assert.equal(message,'bye');
    });
})