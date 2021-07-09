import type { Instruction } from '../types/instruction.js'

import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { InstructionSet } from '../types/instruction-set.js'

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
  ] as Instruction[])

  assert.equal(transpile(readCharCode), [
    { type: InstructionSet.ReadChar, argument: 1 },
    { type: InstructionSet.Right, argument: 1 },
    { type: InstructionSet.ReadChar, argument: 2 }
  ] as Instruction[])
})

test('should throw when brackets are mismatched', () => {
  assert.throws(() => transpile('[[]'))
  assert.throws(() => transpile('[]]['))
})

test.run()
