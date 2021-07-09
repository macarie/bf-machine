
import type { Instruction } from '../types/instruction.js'
import type { Machine } from '../types/machine.js'

import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { InstructionSet } from '../types/instruction-set.js'

import { createMachine } from '../create-machine.js'

const helloWorldCode = `++++++++[>++++[>++>+++>+++>+<<
<<-]>+>+>->>+[<]<-]>>.>---.+++
++++..+++.>>.<-.<.+++.------.-
-------.>>+.>++.`

const test = suite('create-machine')

test('should convert a brainfuck program into a brainfuck machine', () => {
  const input = async (): Promise<Uint8Array> => new Uint8Array(1)
  const output = (): void => {}

  const machine = createMachine({
    code: helloWorldCode,
    input,
    output
  })

  const expectedMachine: Machine = {
    instructions: [
      { type: InstructionSet.Plus, argument: 8 },
      { type: InstructionSet.JumpIfZero, argument: 30 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Plus, argument: 4 },
      { type: InstructionSet.JumpIfZero, argument: 16 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Plus, argument: 2 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Plus, argument: 3 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Plus, argument: 3 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Plus, argument: 1 },
      { type: InstructionSet.Left, argument: -4 },
      { type: InstructionSet.Minus, argument: -1 },
      { type: InstructionSet.JumpIfNotZero, argument: 5 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Plus, argument: 1 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Plus, argument: 1 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Minus, argument: -1 },
      { type: InstructionSet.Right, argument: 2 },
      { type: InstructionSet.Plus, argument: 1 },
      { type: InstructionSet.JumpIfZero, argument: 27 },
      { type: InstructionSet.Left, argument: -1 },
      { type: InstructionSet.JumpIfNotZero, argument: 25 },
      { type: InstructionSet.Left, argument: -1 },
      { type: InstructionSet.Minus, argument: -1 },
      { type: InstructionSet.JumpIfNotZero, argument: 2 },
      { type: InstructionSet.Right, argument: 2 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Minus, argument: -3 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Plus, argument: 7 },
      { type: InstructionSet.PutChar, argument: 2 },
      { type: InstructionSet.Plus, argument: 3 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Right, argument: 2 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Left, argument: -1 },
      { type: InstructionSet.Minus, argument: -1 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Left, argument: -1 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Plus, argument: 3 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Minus, argument: -6 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Minus, argument: -8 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Right, argument: 2 },
      { type: InstructionSet.Plus, argument: 1 },
      { type: InstructionSet.PutChar, argument: 1 },
      { type: InstructionSet.Right, argument: 1 },
      { type: InstructionSet.Plus, argument: 2 },
      { type: InstructionSet.PutChar, argument: 1 }
    ] as Instruction[],
    instructionPointer: 0,

    memory: new Uint8Array(30000),
    dataPointer: 0,

    input,
    output
  }

  assert.equal(machine, expectedMachine)
})

test.run()
