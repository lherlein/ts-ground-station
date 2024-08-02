// Package B entry point
import { packageAFunc } from 'package-a';
import { InputParameters, InputSchema } from './types';

export function packageB(parameters: InputParameters) {
  const { input1, input2 } = InputSchema.parse(parameters);
  packageAFunc({ input1: 'Inputting 1 into Package A', input2: 1 });
  console.log(`Package B: ${input1} ${input2}`);
}

packageB({ input1: 'Inputting into Package B', input2: 2 });