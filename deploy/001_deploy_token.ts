import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, tokenOwner} = await getNamedAccounts();

  await deploy('MyToken', {  // name of the deployed smart contract, this can be changed to deploy multiple times of a contract if the field' 'contract' in the next line is used.
    // contract: 'MyToken', // name of the token source.
    //from: deployer,
    from: '0x160444d4EbC1fb08A7935787886F319e2cd7127A',
    //args: [tokenOwner],
    //args: ['0x4070C76A1635eCd0538388F8948806420814e1d0'],
    //args: [0x4070C76A1635eCd0538388F8948806420814e1d0],
    log: true,
  });
};
export default func;
func.tags = ['EECE571G2022W2'];

//// Version with comments
//import {HardhatRuntimeEnvironment} from 'hardhat/types'; // This adds the type from hardhat runtime environment.
//import {DeployFunction} from 'hardhat-deploy/types'; // This adds the type that a deploy function is expected to fulfill.
//
//const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) { // the deploy function receives the hardhat runtime env as an argument
//  const {deployments, getNamedAccounts} = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
//  const {deploy} = deployments; // The deployments field itself contains the deploy function.
//
//  const {deployer, tokenOwner} = await getNamedAccounts(); // Fetch the accounts. These can be configured in hardhat.config.ts as explained above.
//
//  await deploy('MyToken', { // This will create a deployment called 'MyToken'. By default it will look for an artifact with the same name. The 'contract' option allows you to use a different artifact.
//    from: deployer, // Deployer will be performing the deployment transaction.
//    args: [tokenOwner], // tokenOwner is the address used as the first argument to the Token contract's constructor.
//    log: true, // Display the address and gas used in the console (not when run in test though).
//  });
//};
//export default func;
//func.tags = ['EECE571G2022W2']; // This sets up a tag so you can execute the script on its own (and its dependencies).