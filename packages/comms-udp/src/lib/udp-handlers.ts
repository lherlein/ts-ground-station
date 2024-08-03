// Package A entry point
import {
  UDPEvent,
  UDPEventTypes,
  StateChangePayload,
  UpdateControlPayload,
} from '../types';

import * as dgram from 'dgram';

// UDP Handlers -> sendUDPMessage, listenUDPMessage

export async function sendUDPMessage(ipAddress: string, port: number, type: UDPEventTypes, payload: StateChangePayload | UpdateControlPayload | null): Promise<void> {
  const client = dgram.createSocket('udp4');
  const payloadString = JSON.stringify({ type, payload });
  const message = Buffer.from(payloadString);
  client.send(message, port, ipAddress, (err) => {
    if (err) {
      console.error(err);
    }
    client.close();
  });
}

export async function listenUDPMessage(ipAddress: string, port: number): Promise<string> {
  const client = dgram.createSocket('udp4');

  return new Promise((resolve, reject) => {
    client.on('message', (msg, rinfo) => {
      resolve(msg.toString());
      client.close();
    });

    client.on('error', (err) => {
      reject(err);
      client.close();
    });

    client.bind(port, ipAddress);
  });
}