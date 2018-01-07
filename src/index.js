'strict';

const R = require('./registry.js');
const V = require('./vehicle.js');

const testData = require('./test_records.json');


function registerVehicle(_vin) {
  return R.registerVehicle(
    _vin,
    '0x96e1153cd46a2cf941b4652c3b09f37da388ad51'
  )
  .then((result) => {
    return R.getVehicleAddress(_vin);
  });
};

function addOdometerRecords(address) {
  return V.vehicleAtAddress(address)
  .then((vehicle) => {
    let promises = [];

    testData.forEach((r) => {
      const p = vehicle.addOdometerRecord(
        r.value.toString(),
        r.timestamp,
        {from: '0xffe6c85d150b70a45a1d587a74ba9a0e773a9768', gas: 2000000}
      );
      promises.push(p);
    });

    return {
      addr: address,
      promise: Promise.all(promises)
    };
  });
};

function showAllOdometerEvents(address) {
  return V.vehicleAtAddress(address)
  .then((vehicle) => {
    var event = vehicle.OdometerRecord(
      {},
      {fromBlock: 0, toBlock: 'latest'}
    );

    event.get((error, result) => {
      console.log(error, result);
    });
  });
};

registerVehicle('SALLAAA146A396077')
.then(addOdometerRecords)
.then(({ addr, promise }) => {
  console.log(addr);
  return showAllOdometerEvents(addr);
})
.then(console.log);

// registerVehicle('SALLAAA146A396077');
// addOdometerRecords();
// showAllOdometerEvents();
