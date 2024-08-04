import { commsService } from 'comms-udp';
import express from 'express';
import { Logger } from 'tslog';
import { DroneInfo, DroneStateVector } from '../../udp-service/src/types';

// Core server, exposing APIs that use the comms-udp package

const logger = new Logger();

const app = express();
const port = 3000;

const droneIp = `192.168.2.124`; // IP address of the drone
const UDPport = 5005; // Port to send UDP messages

const comms = new commsService({
  address: droneIp,
  port: UDPport,
});

let controlParams = {
  gyroX: 0,
  gyroY: 0,
  gyroZ: 0,
  Z: 0,
};

let droneStateArrayEst: DroneStateVector = {
  x: 0,
  y: 0,
  z: 0,
  phi: 0,
  theta: 0,
  psi: 0,
  u: 0,
  v: 0,
  w: 0,
  p: 0,
  q: 0,
  r: 0,
}; //Initialize, will deal with later

let droneStateArray: DroneInfo = {
  u_dot: 0,
  v_dot: 0,
  w_dot: 0,
  p: 0,
  q: 0,
  r: 0,
};

app.use(express.json());
app.use((req,res,next) => {
  logger.info(`${req.method} request from ${req.ip} to ${req.url}`);
  next();
}); // Middleware to log requests

app.get('/', (req, res) => {
  res.status(200).send('Hello World!'); // will be replaced with a UI
});

app.post('/kill', async (req, res) => {
  // Send kill UDP command 10 times over 2 seconds
  for (let i = 0; i < 10; i++) {
    await comms.sendKill();
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  res.status(200).send('Killed drone');
});

app.post('/updateControl', async (req, res) => {
  const newParams = req.body;
  controlParams = {
    gyroX: newParams.gyroX || controlParams.gyroX,
    gyroY: newParams.gyroY || controlParams.gyroY,
    gyroZ: newParams.gyroZ || controlParams.gyroZ,
    Z: newParams.Z || controlParams.Z,
  };

  await comms.sendUpdateControl(controlParams);
  res.status(200).send('Updated control');
});

app.post('/stateChange', async (req, res, next) => {
  const state = req.body;
  try {
    await comms.sendStateChange(state.state);
    res.status(200).send('State changed');
  } catch (e) {
    next(e);
  }
});

app.get('/control', (req, res) => {
  res.status(200).send(controlParams);
});

app.get('/statevec', (req, res) => {
  res.status(200).send(droneStateArray);
});

app.post('/statevec', (req, res) => {
  if (req.body) {
    // Check type of req.body
    let tempStateArray = JSON.parse(req.body);
    if (tempStateArray.u_dot && tempStateArray.v_dot && tempStateArray.w_dot && tempStateArray.p && tempStateArray.q && tempStateArray.r) {
      droneStateArray = tempStateArray;
      res.status(200).send('State vector updated');
    } else {
      res.status(400).send('Invalid state vector');
    }
  } else {
    res.status(400).send('No state vector provided');
  }
}); // THIS SHOULD ONLY EVER BE CALLED BY THE UDP SERVICE

// Start the server
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});