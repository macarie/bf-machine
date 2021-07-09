import type { Machine } from './types/machine.js'

import { createMachine } from './create-machine.js'
import { execute } from './execute.js'

export const run = async ({ code = '', input, output }: {
  code: string
  input: Machine['input']
  output: Machine['output']
}): Promise<Machine['memory']> => {
  const machine = createMachine({ code, input, output })

  return await execute(machine)
}
