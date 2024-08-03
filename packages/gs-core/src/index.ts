import { commsService } from 'comms-udp';
import express from 'express';
import { Logger } from 'tslog';

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

app.use(express.json());
app.use((req,res,next) => {
  logger.info(`${req.method} request from ${req.ip} to ${req.url}`);
  next();
}); // Middleware to log requests

app.get('/', (req, res) => {
  res.status(200).send('Hello World!'); // will be replaced with a UI
});

app.post('/kill', async (req, res) => {
  await comms.sendKill();
  res.status(200).send('Killed drone');
});

app.post('/updateControl', async (req, res) => {
  const controlParams = {
    gyroX: 0,
    gyroY: 0,
    gyroZ: 0,
    Z: 0,
  };

  const newParams = req.body;

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

// Start the server
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});