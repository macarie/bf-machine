
import type { Instruction } from '../types/instruction.js'
import type { Machine } from '../types/machine.js'

import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { VMInstructionSet } from '../types/vm-instruction-set.js'

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
      { type: VMInstructionSet.Add, argument: 8 },
      { type: VMInstructionSet.JumpIfZero, argument: 30 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: 4 },
      { type: VMInstructionSet.JumpIfZero, argument: 16 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: 2 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: 3 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: 3 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: 1 },
      { type: VMInstructionSet.Shift, argument: -4 },
      { type: VMInstructionSet.Add, argument: -1 },
      { type: VMInstructionSet.JumpIfNotZero, argument: 5 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: 1 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: 1 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: -1 },
      { type: VMInstructionSet.Shift, argument: 2 },
      { type: VMInstructionSet.Add, argument: 1 },
      { type: VMInstructionSet.JumpIfZero, argument: 27 },
      { type: VMInstructionSet.Shift, argument: -1 },
      { type: VMInstructionSet.JumpIfNotZero, argument: 25 },
      { type: VMInstructionSet.Shift, argument: -1 },
      { type: VMInstructionSet.Add, argument: -1 },
      { type: VMInstructionSet.JumpIfNotZero, argument: 2 },
      { type: VMInstructionSet.Shift, argument: 2 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: -3 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Add, argument: 7 },
      { type: VMInstructionSet.PutChar, argument: 2 },
      { type: VMInstructionSet.Add, argument: 3 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Shift, argument: 2 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Shift, argument: -1 },
      { type: VMInstructionSet.Add, argument: -1 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Shift, argument: -1 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Add, argument: 3 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Add, argument: -6 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Add, argument: -8 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Shift, argument: 2 },
      { type: VMInstructionSet.Add, argument: 1 },
      { type: VMInstructionSet.PutChar, argument: 1 },
      { type: VMInstructionSet.Shift, argument: 1 },
      { type: VMInstructionSet.Add, argument: 2 },
      { type: VMInstructionSet.PutChar, argument: 1 }
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
