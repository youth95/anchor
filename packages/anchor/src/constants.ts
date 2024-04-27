import type { NodeTypes } from 'reactflow'
import { Anchor } from './Anchor'

/** 锚点节点 */
export const NODE_TYPE_ANCHOR = 'anchor'

/** 节点集合 */
export const nodeTypes: NodeTypes = {
  [NODE_TYPE_ANCHOR]: Anchor
}
