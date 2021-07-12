// import { buildTreeByPath, SourcePathItem } from './index'

// const input: Array<SourcePathItem> = [
//   {
//     key: 'c',
//     path: 'a.b',
//   },
//   {
//     key: 'child',
//     path: 'parent.fad.sad'
//   },
//   {
//     key: 'd',
//     path: 'a.c.d'
//   }
// ]

// const output = buildTreeByPath(input)

// console.log('output', JSON.stringify(output))

import { buildTreeByParentNode } from './index'
import fs from 'fs'
import path from 'path'

const input = [
  {
    key: 'c',
    parent: {
      key: 'b',
      parent: {
        key: 'a',
        parent: null
      }
    }
  }
]

const output = buildTreeByParentNode(input)

fs.writeFile(path.resolve(__dirname, './test.json'), JSON.stringify(output, null, '\t'), {
  encoding: 'utf-8'
}, () => {
  console.log('\x1b[36m%s\x1b[0m', 'DONE')
  process.exit()
})