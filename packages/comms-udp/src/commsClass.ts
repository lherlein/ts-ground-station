import {
  sendUDPMessage,
  listenUDPMessage
} from './lib'

import {
  CommsServiceInterface,
  CommsServiceInterfacePayload,
  StateChangePayload,
  UpdateControlPayload,
  UDPEventTypes,
  DroneStates,
} from './types'

export class commsService implements CommsServiceInterface {
  opts: {
    address: string;
    port: number;
  }

  constructor(options?: CommsServiceInterfacePayload) {
    this.opts = {
      address: options?.address || 'localhost',
      port: options?.port || 3000,
    }
  }

  async verifyConnection(): Promise<boolean> {
    // Ping IP address, return true if any response

    return true;
  }

  async sendKill(): Promise<void> {
    const connected = await this.verifyConnection();
    if (connected) {
      await sendUDPMessage(this.opts.address, this.opts.port, 'KILL', null);
    } else {
      throw new Error('CANNOT ESTABLISH CONNECTION');
    }
  }

  async sendUpdateControl(controlParams: UpdateControlPayload): Promise<void> {
    const connected = await this.verifyConnection();
    if (connected) {
      await sendUDPMessage(this.opts.address, this.opts.port, 'UPDATE_CONTROL', controlParams);
    } else {
      throw new Error('CANNOT ESTABLISH CONNECTION');
    }
  }

  async sendStateChange(input: DroneStates): Promise<void> {
    if (!['FLY', 'STANDBY'].includes(input)) {
      throw new Error('Invalid state');
    }
    
    const connected = await this.verifyConnection();
    if (connected) {
      const payload: StateChangePayload = {
        state: input,
      };

      await sendUDPMessage(this.opts.address, this.opts.port, 'STATE_CHANGE', payload);
    } else {
      throw new Error('CANNOT ESTABLISH CONNECTION');
    }
  }
}