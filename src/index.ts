import type { Machine } from './types/machine.js'

import { createMachine } from './create-machine.js'
import { execute } from './execute.js'

export const run = async ({ code = '', input, output }: {
  code: string
  input: Machine['input']
  output: Machine['output']
}): Promise<void> => {
  const machine = createMachine({ code, input, output })

  await execute(machine)
}
