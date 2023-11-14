const Deed = artifacts.require("Deed");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Deed, accounts[0], accounts[1], 5, {value: 100});
};
