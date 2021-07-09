import type { Instruction } from './types/instruction.js'

import { InstructionSet } from './types/instruction-set.js'

export const transpile = (code: string): Instruction[] => {
  const characters = [...code]

  let lastInstructionIndex = -1
  const jumpIfZeroIndexes: Set<number> = new Set()
  const jumpIfNotZeroIndexes: Set<number> = new Set()

  const instructions: Instruction[] = []

  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index]
    const lastInstruction = instructions[lastInstructionIndex] ?? {}

    switch (character) {
      case InstructionSet.Plus: {
        if (lastInstruction.type === InstructionSet.Plus) {
          lastInstruction.argument += 1
        } else {
          instructions.push({
            type: InstructionSet.Plus,
            argument: 1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case InstructionSet.Minus: {
        if (lastInstruction.type === InstructionSet.Minus) {
          lastInstruction.argument -= 1
        } else {
          instructions.push({
            type: InstructionSet.Minus,
            argument: -1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case InstructionSet.Right: {
        if (lastInstruction.type === InstructionSet.Right) {
          lastInstruction.argument += 1
        } else {
          instructions.push({
            type: InstructionSet.Right,
            argument: 1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case InstructionSet.Left: {
        if (lastInstruction.type === InstructionSet.Left) {
          lastInstruction.argument -= 1
        } else {
          instructions.push({
            type: InstructionSet.Left,
            argument: -1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case InstructionSet.PutChar: {
        if (lastInstruction.type === InstructionSet.PutChar) {
          lastInstruction.argument += 1
        } else {
          instructions.push({
            type: InstructionSet.PutChar,
            argument: 1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case InstructionSet.ReadChar: {
        if (lastInstruction.type === InstructionSet.ReadChar) {
          lastInstruction.argument += 1
        } else {
          instructions.push({
            type: InstructionSet.ReadChar,
            argument: 1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case InstructionSet.JumpIfZero: {
        lastInstructionIndex += 1

        instructions.push({
          type: InstructionSet.JumpIfZero,
          argument: lastInstructionIndex
        })
        jumpIfZeroIndexes.add(lastInstructionIndex)

        break
      }

      case InstructionSet.JumpIfNotZero: {
        lastInstructionIndex += 1

        instructions.push({
          type: InstructionSet.JumpIfNotZero,
          argument: lastInstructionIndex
        })
        jumpIfNotZeroIndexes.add(lastInstructionIndex)

        break
      }
    }
  }

  if (jumpIfZeroIndexes.size !== jumpIfNotZeroIndexes.size) {
    throw new TypeError('The [ and ] are mismatched!')
  }

  for (const jumpIfZeroIndex of [...jumpIfZeroIndexes].reverse()) {
    const jumpIfNotZeroIndex = [...jumpIfNotZeroIndexes].filter(jumpIfNotZeroIndex => jumpIfNotZeroIndex >= jumpIfZeroIndex)[0]

    if (jumpIfNotZeroIndex === undefined) {
      throw new TypeError('The [ and ] are mismatched!')
    }

    jumpIfNotZeroIndexes.delete(jumpIfNotZeroIndex)

    instructions[jumpIfZeroIndex].argument = jumpIfNotZeroIndex + 1
    instructions[jumpIfNotZeroIndex].argument = jumpIfZeroIndex + 1
  }

  return instructions
}
