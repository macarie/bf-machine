import type { Instruction } from '../types/instruction.js'

import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { VMInstructionSet } from '../types/vm-instruction-set.js'

import { transpile } from '../transpile.js'

const helloWorldCode = `++++++++[>++++[>++>+++>+++>+<<
<<-]>+>+>->>+[<]<-]>>.>---.+++
++++..+++.>>.<-.<.+++.------.-
-------.>>+.>++.`

const readCharCode = ',>,,'

const test = suite('transpile')

test('should convert a brainfuck program into an array of instructions', () => {
  const transpiledCode = transpile(helloWorldCode)

  assert.equal(transpiledCode, [
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
  ] as Instruction[])

  assert.equal(transpile(readCharCode), [
    { type: VMInstructionSet.ReadChar, argument: 1 },
    { type: VMInstructionSet.Shift, argument: 1 },
    { type: VMInstructionSet.ReadChar, argument: 2 }
  ] as Instruction[])
})

test('should throw when brackets are mismatched', () => {
  assert.throws(() => transpile('[[]'))
  assert.throws(() => transpile('[]]['))
})

test.run()
