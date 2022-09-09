async function main() {
    [owner, signer2, signer3] = await ethers.getSigners();
  
    TokenCoin = await ethers.getContractFactory('TokenCoin', owner);
    tokenCoin = await TokenCoin.deploy();
  
    Crowdsale = await ethers.getContractFactory('Crowdsale', owner);
    crowdSale = await Crowdsale.deploy(2, owner.address, tokenCoin.address);
  
    await tokenCoin.connect(owner).mint(
      crowdSale.address,
      ethers.utils.parseEther('10000') // mint 10k TokenCoins
    )
  
    console.log("Crowdsale:",      crowdSale.address);
    console.log("TokenCoin:",        tokenCoin.address);
    console.log("signer2:",        signer2.address);
  }
  
  // npx hardhat run --network localhost scripts/deploy.js
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });