import { z } from 'zod';

export type DroneStates = 'FLY' | 'STANDBY' | 'DEAD';

export type DroneStateVector = {
  x: number;
  y: number;
  z: number;
  phi: number;
  theta: number;
  psi: number;
  u: number;
  v: number;
  w: number;
  p: number;
  q: number;
  r: number;
};

export type DroneInfo = {
  u_dot: number;
  v_dot: number;
  w_dot: number;
  p: number;
  q: number;
  r: number;
};