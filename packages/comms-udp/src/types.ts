import { z } from 'zod';

export type UDPEventTypes = 'STATE_CHANGE' | 'KILL' | 'UPDATE_CONTROL';

export type UDPEvent = {
  type: UDPEventTypes;
  payload: StateChangePayload | null | UpdateControlPayload;
};

export type StateChangePayload = {
  state: DroneStates;
};

export type DroneStates = 'FLY' | 'STANDBY';

export type UpdateControlPayload = {
  gyroX: number;
  gyroY: number;
  gyroZ: number;
  Z: number;
};

export interface CommsServiceInterface {
  verifyConnection(): Promise<boolean>;
  sendKill(): Promise<void>;
  sendUpdateControl(controlParams: UpdateControlPayload): Promise<void>;
  sendStateChange(input: DroneStates): Promise<void>;
}

export type CommsServiceInterfacePayload = {
  address?: string;
  port?: number;
};