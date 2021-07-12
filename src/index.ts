export type SourcePathItem = {
  key: string,
  path?: string,
  [key: string]: any
}

export type SourceNodeItem = {
  key: string,
  parent?: SourceNodeItem | null,
  [key: string]: any
}

type NodeItem = {
  key: string,
  path?: string,
  children: {
    [key: string]: NodeItem
  },
  [key: string]: any
}

export function buildTreeByPath (list: Array<SourcePathItem>, parentMap?: { [key: string]: SourceNodeItem }): NodeItem {
  let tree: NodeItem = {
    key: 'root',
    children: {}
  }
  list.forEach(item => {
    if (item && item.path) {
      let cur: any = tree
      let arr = item.path.split('.')
      arr.forEach((key, index) => {
        if (!cur.children[key]) {
          let data = {
            ...(parentMap ? (parentMap[key] || {}) : {}),
            key,
            children: {}
          }
          cur.children[key] = data
        }
        cur = cur.children[key]

        if (index === arr.length - 1) {
          cur = tree
        }
      })
    }
  })
  return tree
}

export function buildFlatTree (list: Array<SourceNodeItem>) {
  let parentMap: { [key: string]: SourceNodeItem } = {}
  let res = list.map(item => {
    let pathArr: string[] = []
    let cur = item
    while (cur.parent) {
      const key = cur.parent.key
      const { parent, ...data } = cur.parent
      parentMap[key] = data
      pathArr.push(key)
      cur = cur.parent
    }
    delete item.parent
    item.path = pathArr.reverse().join('.')
    return item
  })
  return {
    parentMap,
    flatList: res
  }
}

export function buildTreeByParentNode (list: Array<SourceNodeItem>): NodeItem {
  const { parentMap, flatList } = buildFlatTree(list)
  return buildTreeByPath(flatList, parentMap)
} 
