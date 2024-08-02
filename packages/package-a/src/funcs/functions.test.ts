import { describe, expect, it } from '@jest/globals';
import { expectTypeOf } from 'expect-type';
import { packageAFunc } from './functions';
import { InputParameters, OutputParameters } from '../types';

describe('packageAFunc', () => {
  it('should return success message', () => {
    const parameters = { input1: 'Input 1', input2: 1 };
    const result = packageAFunc(parameters);
    expect(result).toEqual({ success: true, message: 'Success' });
    expectTypeOf(result).toEqualTypeOf<OutputParameters>();
  });

  it('should return error message', () => {
    const invalidParameters = { input1: 'Input 1', input2: undefined } as unknown as InputParameters;
    const result = packageAFunc(invalidParameters);
    expect(result).toEqual({ success: false, message: 'Error' });
    expectTypeOf(result).toEqualTypeOf<OutputParameters>();
  });
});