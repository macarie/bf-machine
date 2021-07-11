import type { Machine } from './types/machine.js'

import { VMInstructionSet } from './types/vm-instruction-set.js'

export const execute = async ({
  instructions,
  instructionPointer,
  memory,
  dataPointer,
  input,
  output
}: Machine): Promise<Machine['memory']> => {
  const { length: instructionsLength } = instructions

  while (instructionPointer < instructionsLength) {
    const instruction = instructions[instructionPointer]

    switch (instruction.type) {
      case VMInstructionSet.Add: {
        memory[dataPointer] += instruction.argument
        instructionPointer += 1

        break
      }

      case VMInstructionSet.Shift: {
        dataPointer += instruction.argument
        instructionPointer += 1

        break
      }

      case VMInstructionSet.PutChar: {
        output(String.fromCharCode(memory[dataPointer]).repeat(instruction.argument))
        instructionPointer += 1

        break
      }

      case VMInstructionSet.ReadChar: {
        const repeat = instruction.argument - 1
        for (let index = 0; index < repeat; index += 1) {
          await input()
        }

        memory[dataPointer] = (await input())[0]
        instructionPointer += 1

        break
      }

      case VMInstructionSet.JumpIfZero: {
        if (memory[dataPointer] === 0) {
          instructionPointer = instruction.argument
        } else {
          instructionPointer += 1
        }

        break
      }

      case VMInstructionSet.JumpIfNotZero: {
        if (memory[dataPointer] !== 0) {
          instructionPointer = instruction.argument
        } else {
          instructionPointer += 1
        }

        break
      }
    }
  }

  return memory
}
