import { ANCHOR_COMPONENT_SIZES } from './SIZES'
import { NODE_TYPE_ANCHOR } from './constants'
import type { AnchorItem, AnchorProps } from './types'
import { sha1 } from 'object-hash'
import type { Node, Edge } from 'reactflow'

const { WIDTH, LINE_HEIGHT, LINE_GAP } = ANCHOR_COMPONENT_SIZES

type AnchorNode = Node<AnchorProps>
interface RecursiveContext {
  curKey?: string | number
  curNode?: AnchorNode
  nodes: Record<string, AnchorNode>
  edges: Record<string, Edge>
}

const recursive = (value: object, ctx: RecursiveContext) => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined
  ) {
    ctx.curNode!.data.value.push({
      id: sha1(value ?? Math.random()),
      name: ctx.curKey!.toString(),
      value: value,
      type: 'value'
    })
    return
  }
  // 创建被引用值
  const items: AnchorItem[] = []
  const curNode: AnchorNode = {
    id: sha1(ctx.curKey ?? Math.random()),
    position: { x: 0, y: 0 },
    type: NODE_TYPE_ANCHOR,
    data: {
      value: items,
      label: ctx.curKey?.toString() ?? '<ROOT>',
      isRoot: ctx.curKey === undefined
    }
  }
  ctx.nodes[curNode.id] = curNode

  if (ctx.curNode) {
    // 添加引用属性
    ctx.curNode.data.value.push({
      id: sha1(ctx.curKey!),
      name: ctx.curKey!.toString(),
      value: ctx.curKey!.toString(),
      type: 'reference'
    })
    // 关联引用属性 & 被引用值
    ctx.edges[[ctx.curNode.id, curNode.id].join('_')] = {
      source: ctx.curNode.id,
      target: curNode.id,
      sourceHandle: ctx.curKey!.toString(),
      targetHandle: curNode.id,
      id: [ctx.curNode.id, curNode.id].join('_')
    }
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      recursive(value[i], { ...ctx, curKey: i, curNode })
    }
    // 计算 node 尺寸
    curNode.width = WIDTH
    curNode.height =
      LINE_HEIGHT * curNode.data.value.length +
      LINE_GAP * (curNode.data.value.length - 1)
  } else {
    for (const key of Object.keys(value)) {
      ctx.curKey = key
      recursive(value[key], { ...ctx, curKey: key, curNode })
    }
    // 计算 node 尺寸
    curNode.width = WIDTH
    curNode.height =
      LINE_HEIGHT * curNode.data.value.length +
      LINE_GAP * (curNode.data.value.length - 1)
  }
}

export const generateAnchor = (
  props: object | object[]
): { nodes: AnchorNode[]; edges: Edge[] } => {
  if (!Array.isArray(props)) {
    return generateAnchor([props])
  }
  const nodes: AnchorNode[] = []
  const edges: Edge[] = []
  for (const prop of props) {
    const ctx: RecursiveContext = {
      nodes: {},
      edges: {}
    }
    recursive(prop, ctx)
    nodes.push(...Object.values(ctx.nodes))
    edges.push(...Object.values(ctx.edges))
  }

  return {
    nodes,
    edges
  }
}
