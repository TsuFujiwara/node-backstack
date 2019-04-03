const bacnet = require("@biancoroyal/bacstack");

module.exports = () => {
  var thisAddress = "192.168.0.200";
  var broadcastAddress = "192.168.0.255";
  var pollingTime = 1; // Second
  var targetAddress = "192.168.0.254";

  const client = new bacnet({
    port: 47808, // Use BAC0 as communication port
    interface: thisAddress, // Listen on a specific interface
    broadcastAddress: broadcastAddress, // Use the subnet broadcast address
    adpuTimeout: 6000 // Wait twice as long for response
  });

  client.whoIs();
  // Discover Devices
  client.on("iAm", function(device) {
    console.log("address: ", device.address);
    console.log("deviceId: ", device.deviceId);
    console.log("maxApdu: ", device.maxApdu);
    console.log("segmentation: ", device.segmentation);
    console.log("vendorId: ", device.vendorId);
  });

  // ReadPropertyMultiple
  // 起動時1発
  var dt = new Date();
  dt.setMonth(dt.getMonth() + 1);
  client.timeSync(targetAddress, dt);

  var requestArray_all = [
    {
      objectId: { type: 3, instance: 0 },
      properties: [{ id: 8 }]
    },
    {
      objectId: { type: 4, instance: 0 },
      properties: [{ id: 8 }]
    },
    {
      objectId: { type: 5, instance: 0 },
      properties: [{ id: 8 }]
    }
  ];

  client.readPropertyMultiple(targetAddress, requestArray_all, (err, value) => {
    for (var i in value.values) {
      for (var j in value.values[i].values) {
        console.log(
          `${value.values[i].values[j].id} : ${
            value.values[i].values[j].value[0].value
          }`
        );
      }
    }
  });

  // 起動処理終了後;
  var requestArray = [
    {
      objectId: { type: 3, instance: 0 },
      properties: [{ id: 77 }, { id: 85 }, { id: 111 }]
    },
    {
      objectId: { type: 4, instance: 0 },
      properties: [{ id: 77 }, { id: 85 }, { id: 111 }]
    },
    {
      objectId: { type: 5, instance: 0 },
      properties: [{ id: 77 }, { id: 85 }, { id: 111 }]
    }
  ];

  var tmp = new Object();
  var sf = new Object();
  var sf_str = "";

  // setInterval(() => {
  //   client.readPropertyMultiple(targetAddress, requestArray, (err, value) => {
  //     for (var i in value.values) {
  //       tmp = value.values[i];
  //       sf = tmp.values[2].value[0].value.value[0];
  //       sf === 2 || sf === 3
  //         ? (sf_str = String(sf) + "  unreliable !!")
  //         : (sf_str = String(sf));
  //       console.log(
  //         `${tmp.values[0].value[0].value.substr(2)}  PV:${
  //           tmp.values[1].value[0].value
  //         }  SF:${sf_str}`
  //       );
  //     }
  //     if (err) {
  //       clearInterval();
  //       console.log("clearInterval");
  //     }
  //   });
  // }, pollingTime * 1000);
};

// WritePropertyMultiple
// const writeArray = [
//   {
//     objectId: { type: 1, instance: 0 },
//     values: [
//       {
//         property: { id: 85 },
//         value: [
//           {
//             type: bacnet.enum.ApplicationTags.BACNET_APPLICATION_TAG_REAL,
//             value: 20
//           }
//         ],
//         priority: 8
//       }
//     ]
//   },
//   {
//     objectId: { type: 1, instance: 0 },
//     values: [
//       {
//         property: { id: 85 },
//         value: [
//           {
//             type: bacnet.enum.ApplicationTags.BACNET_APPLICATION_TAG_REAL,
//             value: 20
//           }
//         ],
//         priority: 8
//       }
//     ]
//   }
// ];

// client.writePropertyMultiple(targetAddress, writeArray, (err, value) => {
//   console.log("value", value);
// });

// client.writeProperty(
//   targetAddress,
//   { type: 1, instance: 0 },
//   85,
//   [
//     {
//       type: bacnet.enum.ApplicationTags.BACNET_APPLICATION_TAG_REAL,
//       value: 100
//     }
//   ],
//   { priority: 8 },
//   function(err, value) {
//     console.log("value: ", value);
//   }
// );

// ReadPropertyMultiple
