// Package A entry point
import {
  InputParameters,
  InputSchema,
  OutputParameters,
  OutputSchema,
} from '../types';

export function packageAFunc(parameters: InputParameters): OutputParameters {
  try {
    const { input1, input2 } = InputSchema.parse(parameters);
    console.log(`Package A: ${input1} ${input2}`);
    return OutputSchema.parse({ success: true, message: 'Success' });
  } catch (error) {
    console.error(error);
    return OutputSchema.parse({ success: false, message: 'Error' });
  }
}