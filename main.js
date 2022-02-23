const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data ).toString();
    }
}

class BlockChain{
    constructor() {
        this.chain = [this.createGenenisBlock()];
    }

    createGenenisBlock() {
        return new Block(0, "22/02/2022", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let ezwCoin = new BlockChain();
ezwCoin.addBlock(new Block(1, "22/02/2022", "aezfdadasd"));
ezwCoin.addBlock(new Block(2, "22/02/2022", "puyadadad"));

console.log('Is blockchain valid?' + ezwCoin.isChainValid());

ezwCoin.chain[1].data = ("I replaced.");
ezwCoin.chain[1].hash = ezwCoin.chain[1].calculateHash();

console.log('Is blockchain valid?' + ezwCoin.isChainValid());

// console.log(JSON.stringify(ezwCoin, null, 4));  