# 根据节点信息逆向生成树结构

调用示例

1. 根据子节点的路径构建

```javascript
import { buildTreeByPath } from 'path-tree-builder'

const input = [
  {
    key: 'c',
    path: 'a.b',
  },
  {
    key: 'child',
    path: 'parent.fad.sad'
  },
  {
    key: 'd',
    path: 'a.c.d'
  }
]

const output = buildTreeByPath(input)
// {
//   "key": "root",
//   "children": {
//     "a": {
//       "key": "a",
//       "children": {
//         "b": {
//           "key": "b",
//           "children": {}
//         },
//         "c": {
//           "key": "c",
//           "children": {
//             "d": {
//               "key": "d",
//               "children": {}
//             }
//           }
//         }
//       }
//     },
//     "parent": {
//       "key": "parent",
//       "children": {
//         "fad": {
//           "key": "fad",
//           "children": {
//             "sad": {
//               "key": "sad",
//               "children": {}
//             }
//           }
//         }
//       }
//     }
//   }
// }
```

2. 根据追溯parent对象构建

```javascript
import { buildTreeByParentNode } from 'path-tree-builder'

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
// {
//   "key": "root",
//   "children": {
//     "a": {
//       "key": "a",
//       "children": {
//         "b": {
//           "key": "b",
//           "children": {}
//         }
//       }
//     }
//   }
// }
```