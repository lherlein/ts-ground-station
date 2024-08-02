import { z } from 'zod';

export const InputSchema = z.object({
  input1: z.string(),
  input2: z.number(),
});

export type InputParameters = z.infer<typeof InputSchema>;