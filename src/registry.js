'strict';

const Web3 = require('web3');
const contract = require('truffle-contract');
const Registry = contract(require('../../registry-contracts/build/contracts/Registry.json'));
// const Vehicle = contract(require('../../registry-contracts/build/contracts/Vehicle.json'));

const URL = 'http://localhost:9595'

Registry.setProvider(new Web3.providers.HttpProvider(URL));
if (typeof Registry.currentProvider.sendAsync !== 'function') {
  Registry.currentProvider.sendAsync = function () {
    return Registry.currentProvider.send.apply(
      Registry.currentProvider, arguments
    );
  };
}

function registerVehicle(_vin, _registrantAddress) {
  this.web3 = new Web3(
    new Web3.providers.HttpProvider(URL)
  );

  this.web3.eth.getAccounts((err, accs) => {
    if (err != null) {
      alert('There was an error fetching your accounts.');
      return;
    }

    if (accs.length === 0) {
      alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
      return;
    }

    this.accounts = accs;
    this.account = this.accounts[0];
    this.web3.eth.defaultAccount = this.accounts[0];
  });

  return Registry.deployed()
  .then((contract) => {
    return contract.registerVehicle(
      _vin,
      _registrantAddress,
      {from: this.account, gas: 2000000}
    );
  });
};

function getVehicleAddress(_vin) {
  return Registry.deployed()
  .then((contract) => {
    return contract.vehicleAddress(_vin);
  });
};

module.exports = {
  registerVehicle: registerVehicle,
  getVehicleAddress: getVehicleAddress
};
