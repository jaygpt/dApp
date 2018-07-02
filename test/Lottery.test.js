const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } =  require('../compile');
let lottery;
let accounts;
beforeEach(async ()=>{
    //list
    accounts = await web3.eth.getAccounts();
    //contract
    //web3.eth.Contract is taking an json formatted interface that is abi
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({from: accounts[0], gas: '1000000'})
});

describe('lottery' ,()=>{
    it('deploy',()=>{
        //contract.options.address is address where contaract is deployed
       assert.ok(lottery.options.address); 
    });

    it('allows one account ',async ()=> {

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        });
        //.send becase to call any function we needs to do transcation
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02','ether')
        });
        const players = await lottery.methods.seeAllplayer().call({
            from: accounts[1]
        });

        assert.ok(2, players.length);
        assert.ok(accounts[1],players[1]);
    });

    it('require minimum etuer', async()=>{
        try{
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it('send money to player and reset',async ()=>{
        await lottery.methods.picWinner().send(
            from : accounts[0]
        ) ;

    })
}