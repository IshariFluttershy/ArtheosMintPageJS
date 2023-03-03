const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const tokens1 = require("./tokens1.json");
const tokens2 = require("./tokens2.json");
const tokens3 = require("./tokens3.json");


async function main() {
    let tab = [];
    tokens1.map((token) => {
      tab.push(token.address);
    });
    let leaves1 = tab.map((address) => keccak256(address));
    this.tree1 = new MerkleTree(leaves1, keccak256, { sort: true });
    let root1 = this.tree1.getHexRoot();
    this.merkleTreeRoot1 = root1;

    tab = [];
    tokens2.map((token) => {
      tab.push(token.address);
    });
    let leaves2 = tab.map((address) => keccak256(address));
    this.tree2 = new MerkleTree(leaves2, keccak256, { sort: true });
    let root2 = this.tree2.getHexRoot();
    this.merkleTreeRoot2 = root2;

    tab = [];
    tokens3.map((token) => {
      tab.push(token.address);
    });
    let leaves3 = tab.map((address) => keccak256(address));
    this.tree3 = new MerkleTree(leaves3, keccak256, { sort: true });
    let root3 = this.tree3.getHexRoot();
    this.merkleTreeRoot3 = root3;

    console.log(    
        `root1 = ${merkleTreeRoot1} -- root2 = ${merkleTreeRoot2} -- root3 = ${merkleTreeRoot3}`
    )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
