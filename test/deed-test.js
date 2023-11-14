const Deed = artifacts.require("Deed");

contract('Deed', (accounts) => {
  let deed = null;
  before(async () => {
    deed = await Deed.deployed();
  });

  it('Should withdraw', function () {
    setTimeout(async () => {
      const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      await deed.withdraw({from: accounts[0]});
      const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      assert(finalBalance.sub(initialBalance).toNumber() === 100);
      }, "5000");
  });

  it('Should NOT withdraw if too early', async () => {
    const deed = await Deed.new(accounts[0], accounts[1], 5, {value: 100});
    try {
      await deed.withdraw({from: accounts[0]});
    } catch (e) {
      assert(e.message.includes('Too early'));
      return;
    }
    assert(false);
  });

  it('Should NOT withdraw if caller is not lowyer', async () => {
    const deed = await Deed.new(accounts[0], accounts[1], 5, {value: 100});
    setTimeout(async () => {
      try {
        await deed.withdraw({from: accounts[5]});
      } catch (e) {
        assert(e.message.includes('Lawyer only'));
        return;
      }
      assert(false);
      }, "5000");
  });
});
