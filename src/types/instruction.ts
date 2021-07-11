import type { VMInstructionSet } from './vm-instruction-set.js'

export interface Instruction {
  type: VMInstructionSet
  argument: number
}
