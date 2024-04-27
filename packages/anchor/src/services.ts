import { NODE_TYPE_ANCHOR } from './constants'
import type { AnchorItem } from './types'
import { sha1 } from 'object-hash'

interface RecursiveContext {
  curKey?: string | number
}

const recursive = (value: object, ctx: RecursiveContext) => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      recursive(value[i], { ...ctx, curKey: i })
    }
  } else {
    for (const key of Object.keys(value)) {
      recursive(value[key], { ...ctx, curKey: key })
    }
  }
}

export const generateAnchor = (props: object | object[]) => {
  if (!Array.isArray(props)) {
    return generateAnchor([props])
  }
  const nodes = props.map(prop => {
    const rootID = sha1(prop)
    const items: AnchorItem[] = Object.keys(prop).map(key => {
      return {
        id: key,
        name: key,
        value: prop[key],
        type: 'value'
      }
    })
    return {
      id: rootID,
      position: { x: 0, y: 0 },
      type: NODE_TYPE_ANCHOR,
      data: {
        value: items
      }
    }
  })

  return { nodes }
}
