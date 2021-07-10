import type { Machine } from './types/machine.js'

import { InstructionSet } from './types/instruction-set.js'

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
      case InstructionSet.Plus:
      case InstructionSet.Minus: {
        memory[dataPointer] += instruction.argument
        instructionPointer += 1

        break
      }

      case InstructionSet.Right:
      case InstructionSet.Left: {
        dataPointer += instruction.argument
        instructionPointer += 1

        break
      }

      case InstructionSet.PutChar: {
        output(String.fromCharCode(memory[dataPointer]).repeat(instruction.argument))
        instructionPointer += 1

        break
      }

      case InstructionSet.ReadChar: {
        const repeat = instruction.argument - 1
        for (let index = 0; index < repeat; index += 1) {
          await input()
        }

        memory[dataPointer] = (await input())[0]
        instructionPointer += 1

        break
      }

      case InstructionSet.JumpIfZero: {
        if (memory[dataPointer] === 0) {
          instructionPointer = instruction.argument
        } else {
          instructionPointer += 1
        }

        break
      }

      case InstructionSet.JumpIfNotZero: {
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
