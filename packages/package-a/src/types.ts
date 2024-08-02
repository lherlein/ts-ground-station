import { z } from 'zod';

export const InputSchema = z.object({
  input1: z.string(),
  input2: z.number(),
});

export type InputParameters = z.infer<typeof InputSchema>;

export const OutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type OutputParameters = z.infer<typeof OutputSchema>;