import type { Instruction } from './instruction.js'

export interface Machine {
  instructions: Instruction[]
  instructionPointer: number

  memory: Uint8Array
  dataPointer: number

  input: () => Promise<Uint8Array>
  output: (data: string) => void
}
