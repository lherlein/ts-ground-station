// Handle UDP listening/receive updates from drone, send to the core server
// Core server is for comms with the user - serve fontend, render UI/orientation/map, send user requests to the UDP service
// UDP service is the repeated comms with the drone, send UDP on loop, listen for UDP messages

import { commsService } from 'comms-udp';
import { DroneInfo } from './types';
import axios from 'axios';

const droneIp = `192.168.2.124`; // IP address of the drone
const UDPport = 5005; // Port to send UDP messages

const comms = new commsService({
  address: droneIp,
  port: UDPport,
});

// Listen for UDP messages, parse and send to the core server

async function listener(): Promise<void> {
  try {
    const response = await comms.listenUDPMessage();
    console.log(response);

    // Parse response and send to core server
    // Incoming string: data_package = 
    /*
    {
      "type": "IMU_DATA",
      "payload": {
        "accel": imuData[0],
        "gyro": imuData[1]
      }
    }
    */

    // Parse response
    const data_package = JSON.parse(response);
    const type = data_package.type;
    if (type === 'IMU_DATA') {
      const imuData = data_package.payload;
      let updateCorePayload: DroneInfo = {
        u_dot: imuData.accel[0],
        v_dot: imuData.accel[1],
        w_dot: imuData.accel[2],
        p: imuData.gyro[0],
        q: imuData.gyro[1],
        r: imuData.gyro[2],
      };
      console.log(updateCorePayload);

      // Send to core server
      await axios({
        method: 'post',
        url: 'http://localhost:3000/update',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(updateCorePayload),
      });
    } else {
      console.log('Invalid data package type');
    }
  } catch (error) {
    if (error.code === 'EADDRNOTAVAIL' || error == 'CANNOT ESTABLISH CONNECTION') {
      //pass
    } else {
      console.log(error); //crash
    }
  }

  // Repeat
  listener();
}

listener();