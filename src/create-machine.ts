import type { Machine } from './types/machine.js'

import { transpile } from './transpile.js'

export const createMachine = (
  { code = '', input, output }: {
    code: string
    input: Machine['input']
    output: Machine['output']
  }
): Machine => ({
  instructions: transpile(code),
  instructionPointer: 0,

  memory: new Uint8Array(30000),
  dataPointer: 0,

  input,
  output
})
