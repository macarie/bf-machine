import type { InstructionSet } from './instruction-set.js'

export interface Instruction {
  type: InstructionSet
  argument: number
}
