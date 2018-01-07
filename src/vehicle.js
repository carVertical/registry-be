'strict';

const Web3 = require('web3');
const contract = require('truffle-contract');
const C = contract(require('../../registry-contracts/build/contracts/OpenVehicle.json'));

const URL = 'http://localhost:9595'

C.setProvider(new Web3.providers.HttpProvider(URL));
if (typeof C.currentProvider.sendAsync !== 'function') {
  C.currentProvider.sendAsync = function () {
    return C.currentProvider.send.apply(
      C.currentProvider, arguments
    );
  };
}

function vehicleAtAddress(_address) {
  return C.at(_address);
}

function fooCar(_address) {

  const vv = constructVehicleFromAddress(_address);
  console.log('===');
  return vv.vin.call();
}

// module.exports = MyObject;

module.exports = {
  vehicleAtAddress: vehicleAtAddress
};
