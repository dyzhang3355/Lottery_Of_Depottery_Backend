import {expect} from "./chai-setup";

import {ethers, deployments, getNamedAccounts, getUnnamedAccounts} from 'hardhat';

// ##########################################################
// we import our utilities
import {setupUsers, setupUser} from './utils';

async function setup () {
  // it first ensures the deployment is executed and reset (use of evm_snapshot for faster tests)
  await deployments.fixture(["EECE571G2022W2"]);

  // we get an instantiated contract in the form of a ethers.js Contract instance:
  const contracts = {
    Token: (await ethers.getContract('MyToken')),
  };

  // we get the tokenOwner
  const {tokenOwner} = await getNamedAccounts();

  // Get the unnammedAccounts (which are basically all accounts not named in the config,
  // This is useful for tests as you can be sure they have noy been given tokens for example)
  // We then use the utilities function to generate user objects
  // These object allow you to write things like `users[0].Token.transfer(....)`
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  // finally we return the whole object (including the tokenOwner setup as a User object)
  return {
    ...contracts,
    users,
    tokenOwner: await setupUser(tokenOwner, contracts),
  };
}
// ##########################################################

console.log("start MyToken.test.ts");

describe("Movie Ticket Smart Contract Test.", function() {
  describe("Initial game status check.", function() {
    it("Initial game status should be stopped.", async function() {
      //###await deployments.fixture(["EECE571G2022W2"]);
      //###const {tokenOwner} = await getNamedAccounts();
      //###const users = await getUnnamedAccounts();
      //###const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
      //###//const options = {value: ethers.utils.parseEther("0.0001")}
      //###//await expect(TokenAsOwner.buyTicket('Avatar', 18, options)).to.be.revertedWith("Incorrect paid Ethers, it should be 1 Ethers.");
       
      //###console.log("TokenAsOwner: %s", TokenAsOwner);
      //###const initialGameStatus = await TokenAsOwner.gameOngoing;
      //###console.log("initial status: %s", initialGameStatus);
      //###await expect(initialGameStatus).to.equal(false);

      const {Token, users, tokenOwner} = await setup();
      //console.log("tokenOnwer %s", tokenOwner);
      //console.log("tokenOnwer.Token %s", tokenOwner.Token );
      const initialGameStatus = await tokenOwner.Token.gameOngoing();
      console.log("initial status: %s", initialGameStatus);
      await expect(initialGameStatus).to.equal(false);
      //await tokenOwner.Token.enableGame();
      await Token.enableGame();
      const newGameStatus = await tokenOwner.Token.gameOngoing();
      console.log("new status after admin enabling game: %s", newGameStatus);
      await expect(newGameStatus).to.equal(true);
    });
  

    it("Player buy and cancel a ticket.", async function() {
      //###await deployments.fixture(["EECE571G2022W2"]);
      //###const {tokenOwner} = await getNamedAccounts();
      //###const users = await getUnnamedAccounts();
      //###const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
      //###//const options = {value: ethers.utils.parseEther("0.0001")}
      //###//await expect(TokenAsOwner.buyTicket('Avatar', 18, options)).to.be.revertedWith("Incorrect paid Ethers, it should be 1 Ethers.");
       
      //###console.log("TokenAsOwner: %s", TokenAsOwner);
      //###const initialGameStatus = await TokenAsOwner.gameOngoing;
      //###console.log("initial status: %s", initialGameStatus)buyTicket;
      //###await expect(initialGameStatus).to.equal(false);

      const {Token, users, tokenOwner} = await setup();
      //console.log("tokenOnwer %s", tokenOwner);
      //console.log("tokenOnwer.Token %s", tokenOwner.Token );
      const initialGameStatus = await tokenOwner.Token.gameOngoing();
      console.log("initial status: %s", initialGameStatus);
      await expect(initialGameStatus).to.equal(false);
      //await tokenOwner.Token.enableGame();
      await Token.enableGame();
      //await Token.pauseGame(); // todo: remove
      const ticketPrice = await tokenOwner.Token.getTicketPrice();
      console.log("The ticket price is : %s", ticketPrice);

      const poolBalance = await tokenOwner.Token.getPoolBalance();
      console.log("Pool balance before a player buys a ticket: %s", poolBalance);
      const payInWei = ethers.utils.formatEther(500000)
      const options = {value: ethers.utils.parseEther(payInWei)}
      const playerNumsArray = [1,2,3,4,5,6];
      await tokenOwner.Token.buyTicket(playerNumsArray, options)
      const newPoolBalance = await tokenOwner.Token.getPoolBalance();
      console.log("Pool balance after a player buys a ticket: %s", newPoolBalance);
      //console.log("Player number: %s", tokenOwner.Token.ticketOrders(tokenOwner.address).playerLotteryNums());

      const playerNum = await tokenOwner.Token.getPlayerNumber();
      console.log("Player number: %s", playerNum);
      console.log("Round number: %s", playerNum[0]);
      console.log("Player number: %s", playerNum[1]);
      //await expect(newGameStatus).to.equal(true);
    });

    it("Player can only buy one ticket.", async function() {
      //###await deployments.fixture(["EECE571G2022W2"]);
      //###const {tokenOwner} = await getNamedAccounts();
      //###const users = await getUnnamedAccounts();
      //###const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
      //###//const options = {value: ethers.utils.parseEther("0.0001")}
      //###//await expect(TokenAsOwner.buyTicket('Avatar', 18, options)).to.be.revertedWith("Incorrect paid Ethers, it should be 1 Ethers.");
       
      //###console.log("TokenAsOwner: %s", TokenAsOwner);
      //###const initialGameStatus = await TokenAsOwner.gameOngoing;
      //###console.log("initial status: %s", initialGameStatus);
      //###await expect(initialGameStatus).to.equal(false);

      const {Token, users, tokenOwner} = await setup();
      //console.log("tokenOnwer %s", tokenOwner);
      //console.log("tokenOnwer.Token %s", tokenOwner.Token );
      //const playerList = await Token.playerList();
      //console.log("initial player list: %s", playerList);

      const initialGameStatus = await tokenOwner.Token.gameOngoing();
      console.log("initial status: %s", initialGameStatus);
      await expect(initialGameStatus).to.equal(false);
      //await tokenOwner.Token.enableGame();
      await Token.enableGame();
      //await Token.pauseGame(); // todo: remove
      const ticketPrice = await tokenOwner.Token.getTicketPrice();
      console.log("The ticket price is : %s", ticketPrice);

      const poolBalance = await tokenOwner.Token.getPoolBalance();
      console.log("Pool balance before a player buys a ticket: %s", poolBalance);
      const payInWei = ethers.utils.formatEther(500000)
      const options = {value: ethers.utils.parseEther(payInWei)}
      const playerNumsArray = [1,2,3,4,5,6];
      await tokenOwner.Token.buyTicket(playerNumsArray, options)
      const newPoolBalance = await tokenOwner.Token.getPoolBalance();
      console.log("Pool balance after a player buys a ticket: %s", newPoolBalance);
      //console.log("Player number: %s", tokenOwner.Token.ticketOrders(tokenOwner.address).playerLotteryNums());

      const playerNum = await tokenOwner.Token.getPlayerNumber();
      console.log("Player number: %s", playerNum);
      console.log("Round number: %s", playerNum[0]);
      console.log("Player number: %s", playerNum[1]);
      //await expect(newGameStatus).to.equal(true);

      await expect(tokenOwner.Token.buyTicket(playerNumsArray, options)).to.be.revertedWith("Only one ticket at most in a game round.");

      console.log("Token: %s", Token);
      const newTicketPrice = await Token.ticketPrice();
      console.log("newTicketPrice: %s", newTicketPrice);
      const newPlayerList = await Token.playerList(0);
      //const newPlayerList = await tokenOwner.Token.playerList();
      ////console.log("updated player list: %s", newPlayerList[0]);
      console.log("updated player list: %s", newPlayerList);
      console.log("tokenOwner addr: %s", tokenOwner.address);
      const newPlayerNum = await Token.playerNum();
      console.log("player number: %s", newPlayerNum);


      console.log("users[0]: %s", users[0]);
      const user0PlayerNumsArray = [10,20,30,40,48,49];
      await users[0].Token.buyTicket(user0PlayerNumsArray, options);
      const newPlayerNum_02 = await Token.playerNum();
      console.log("player number: %s", newPlayerNum_02);

      const newPlayerList_02 = await Token.playerList(1);
      //const newPlayerList = await tokenOwner.Token.playerList();
      ////console.log("updated player list: %s", newPlayerList[0]);
      console.log("users[0] addr: %s", users[0].address);
      console.log("updated player list: %s", newPlayerList_02);

      //const totalPlayer = await Token.playerList.length();
      //console.log("totalPlayer via length: %s", totalPlayer);
    });

    /*
    it("Movie Name Cannot Be Empty.", async function() {
      await deployments.fixture(["EECE571G2022W2"]);
      const {tokenOwner} = await getNamedAccounts();
      const users = await getUnnamedAccounts();
      const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
      const options = {value: ethers.utils.parseEther("1")}
      await expect(TokenAsOwner.buyTicket('', 20, options)).to.be.revertedWith("The movie name cannot be empty.");
    });
  
    it("Customer Age Should Be No Less Than 18.", async function() {
      await deployments.fixture(["EECE571G2022W2"]);
      const {tokenOwner} = await getNamedAccounts();
      const users = await getUnnamedAccounts();
      const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
      const options = {value: ethers.utils.parseEther("1")}
      await expect(TokenAsOwner.buyTicket('Avatar', 15, options)).to.be.revertedWith("A customer should be no younger than 18.");
    });

    it("Cannot buy another ticket before cancelling/checking-in an existing ticket.", async function() {
      await deployments.fixture(["EECE571G2022W2"]);
      const {tokenOwner} = await getNamedAccounts();
      const users = await getUnnamedAccounts();
      const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
      const options = {value: ethers.utils.parseEther("1")}
      await TokenAsOwner.buyTicket('Avatar', 18, options);
      await expect(TokenAsOwner.buyTicket('Avatar', 18, options)).to.be.revertedWith("Cannot make another reservation unless you confirm or cancel the existing reservation.");
    });
    */

    /* TODO
    it("Successfully booked a ticket.", async function() {
      await deployments.fixture(["EECE571G2022W2"]);
      const {Token} = await setup();
      const {tokenOwner} = await getNamedAccounts();
      const users = await getUnnamedAccounts();
      const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
      const options = {value: ethers.utils.parseEther("1")}
      TokenAsOwner.buyTicket('Avatar', 18, options);
      expect(Token.orders[tokenOwner].isValidTicket).to.equal(true);
    });
    */
  });

  // Check-In Check.
  //describe("Check In a Ticket.", function() {
  //  it("Ticket Price Should Be 1 Ethers.", async function() {
  //    await deployments.fixture(["EECE571G2022W2"]);
  //    const {tokenOwner} = await getNamedAccounts();
  //    const users = await getUnnamedAccounts();
  //    const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
  //    //TokenAsOwner.buyTicket('Avatar', 18, options);
  //    await expect(TokenAsOwner.checkIn()).to.be.revertedWith("The customer should have a valid ticket before proceeding.");
  //  });
  
  //  /*
  //  it("Movie Name Cannot Be Empty.", async function() {
  //    await deployments.fixture(["EECE571G2022W2"]);
  //    const {tokenOwner} = await getNamedAccounts();
  //    const users = await getUnnamedAccounts();
  //    const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
  //    const options = {value: ethers.utils.parseEther("1")}
  //    await expect(TokenAsOwner.buyTicket('', 20, options)).to.be.revertedWith("The movie name cannot be empty.");
  //  });
  
  //  it("Customer Age Should Be No Less Than 18.", async function() {
  //    await deployments.fixture(["EECE571G2022W2"]);
  //    const {tokenOwner} = await getNamedAccounts();
  //    const users = await getUnnamedAccounts();
  //    const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
  //    const options = {value: ethers.utils.parseEther("1")}
  //    await expect(TokenAsOwner.buyTicket('Avatar', 15, options)).to.be.revertedWith("A customer should be no younger than 18.");
  //  });
  //  */
  //});

  //describe("Cancel/Refund a Ticket.", function() {
  //  it("Cannot cancel/refund a ticket after checking in.", async function() {
  //    await deployments.fixture(["EECE571G2022W2"]);
  //    const {tokenOwner} = await getNamedAccounts();
  //    const users = await getUnnamedAccounts();
  //    const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
  //    const options = {value: ethers.utils.parseEther("1")}
  //    TokenAsOwner.buyTicket('Avatar', 18, options);
  //    TokenAsOwner.checkIn();
  //    await expect(TokenAsOwner.cancelTicket()).to.be.revertedWith("The customer should NOT have already checked in.");
  //  });
  
  //  it("Cannot cancel/refund a ticket before having a ticket.", async function() {
  //    await deployments.fixture(["EECE571G2022W2"]);
  //    const {tokenOwner} = await getNamedAccounts();
  //    const users = await getUnnamedAccounts();
  //    const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
  //    const options = {value: ethers.utils.parseEther("1")}
  //    await expect(TokenAsOwner.cancelTicket()).to.be.revertedWith("The customer should have a valid ticket before proceeding.");
  //  });
  //});

  //describe("Balance Check.", function() {
  //  it("Smart contract should have correct balance afer a booking is made.", async function() {
  //    await deployments.fixture(["EECE571G2022W2"]);
  //    const {tokenOwner} = await getNamedAccounts();
  //    const users = await getUnnamedAccounts();
  //    const TokenAsOwner = await ethers.getContract("MyToken", tokenOwner);
  //    const options = {value: ethers.utils.parseEther("1")}
  //    await TokenAsOwner.buyTicket('Avatar', 18, options);
  //    const newBalance = await TokenAsOwner.getContractBalance(TokenAsOwner.owner());
  //    expect(newBalance).to.equal(1);
  //  });
  //});

} 
);