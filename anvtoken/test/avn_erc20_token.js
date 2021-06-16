const AVN_ERC20Token = artifacts.require("AVNTOKEN");

contract("3nd AVN test", async accounts => {

    const WALLET_A = accounts[0];
    const WALLET_B = accounts[1];
    const WALLET_C = accounts[2];


    it("totalSupply must be 3000", async () => {
        const instance = await AVN_ERC20Token.deployed();
        const balance = await instance.totalSupply.call();
        console.log("Balance : " + balance / 1E18);
        assert.equal(balance / 1E18, 3000);
    });


    it("tokenName must be equal", async () => {
        const instance = await AVN_ERC20Token.deployed();
        const name = await instance.name.call();
        console.log("Name : " + name);
        assert.equal(name, "AVN Token");
    });


    it("tokenName symbol be equal", async () => {
        const instance = await AVN_ERC20Token.deployed();
        const symbol = await instance.symbol.call();
        console.log("Symbol : " + symbol);
        assert.equal(symbol, "AVN");
    });

    it("tokenBalance must be equal", async () => {
        const instance = await AVN_ERC20Token.deployed();
        const balance = await instance.balanceOf.call(WALLET_B, {from: WALLET_B})
        console.log("Token Balance : " + balance / 1E18);
        assert.equal(balance / 1E18, 0);
    });

    it("transferToken from A to B amount X", async () => {

        const instance = await AVN_ERC20Token.deployed();

        var amount = 100000000000000000;
        const balanceA = await instance.balanceOf.call(WALLET_A, {from: WALLET_A})
        console.log("WalletA Balance : " + balanceA / 1E18);
        const balanceB = await instance.balanceOf.call(WALLET_B, {from: WALLET_B})
        console.log("WalletB Balance : " + balanceB / 1E18);

        await instance.transfer(WALLET_B, amount, {from: WALLET_A});

        const balanceA1 = await instance.balanceOf.call(WALLET_A, {from: WALLET_A})
        console.log("AfterWalletA Balance : " + balanceA1 / 1E18);
        const balanceB1 = await instance.balanceOf.call(WALLET_B, {from: WALLET_B})
        console.log("AfterWalletB Balance : " + balanceB1 / 1E18);

        assert.equal(balanceA, balanceA - amount - 10);

    });


});