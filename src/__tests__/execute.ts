import type { Instruction } from '../types/instruction.js'
import type { Machine } from '../types/machine.js'

import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { VMInstructionSet } from '../types/vm-instruction-set.js'

import { execute } from '../execute.js'

const test = suite('execute')

test('should execute a brainfuck machine and return the memory\'s last known state', async () => {
  let timesOutputWasCalled = 0

  const input = async (): Promise<Uint8Array> => new Uint8Array(1)
  const output = (): void => {
    timesOutputWasCalled += 1
  }

  const machine: Machine = {
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

  const expectedMemory = new Uint8Array(30000)
  expectedMemory.set([72, 100, 87, 33, 10], 2)

  const expectedMachine: Machine = {
    instructions: machine.instructions,
    instructionPointer: 0,

    memory: expectedMemory,
    dataPointer: 0,

    input,
    output
  }

  const actualMemory = await execute(machine)

  assert.equal(machine, expectedMachine)
  assert.equal(actualMemory, expectedMemory)
  assert.equal(timesOutputWasCalled, 12)
})

test.run()
