import type { Instruction } from './types/instruction.js'

import { BFInstructionSet } from './types/bf-instruction-set.js'
import { VMInstructionSet } from './types/vm-instruction-set.js'

export const transpile = (code: string): Instruction[] => {
  const characters = [...code]

  let lastInstructionIndex = -1
  const jumpIfZeroIndexes: Set<number> = new Set()
  const jumpIfNotZeroIndexes: Set<number> = new Set()

  const instructions: Instruction[] = []

  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index]
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const lastInstruction = instructions[lastInstructionIndex] || {}

    switch (character) {
      case BFInstructionSet.Plus: {
        if (lastInstruction.type === VMInstructionSet.Add) {
          lastInstruction.argument += 1
        } else {
          instructions.push({
            type: VMInstructionSet.Add,
            argument: 1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case BFInstructionSet.Minus: {
        if (lastInstruction.type === VMInstructionSet.Add) {
          lastInstruction.argument -= 1
        } else {
          instructions.push({
            type: VMInstructionSet.Add,
            argument: -1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case BFInstructionSet.Right: {
        if (lastInstruction.type === VMInstructionSet.Shift) {
          lastInstruction.argument += 1
        } else {
          instructions.push({
            type: VMInstructionSet.Shift,
            argument: 1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case BFInstructionSet.Left: {
        if (lastInstruction.type === VMInstructionSet.Shift) {
          lastInstruction.argument -= 1
        } else {
          instructions.push({
            type: VMInstructionSet.Shift,
            argument: -1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case BFInstructionSet.PutChar: {
        if (lastInstruction.type === VMInstructionSet.PutChar) {
          lastInstruction.argument += 1
        } else {
          instructions.push({
            type: VMInstructionSet.PutChar,
            argument: 1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case BFInstructionSet.ReadChar: {
        if (lastInstruction.type === VMInstructionSet.ReadChar) {
          lastInstruction.argument += 1
        } else {
          instructions.push({
            type: VMInstructionSet.ReadChar,
            argument: 1
          })

          lastInstructionIndex += 1
        }

        break
      }

      case BFInstructionSet.JumpIfZero: {
        lastInstructionIndex += 1

        instructions.push({
          type: VMInstructionSet.JumpIfZero,
          argument: lastInstructionIndex
        })
        jumpIfZeroIndexes.add(lastInstructionIndex)

        break
      }

      case BFInstructionSet.JumpIfNotZero: {
        lastInstructionIndex += 1

        instructions.push({
          type: VMInstructionSet.JumpIfNotZero,
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
