import React from 'react'
import type { NodeProps } from 'reactflow'
import { AnchorProps } from './types'

const WIDTH = 200
const LINE_HEIGHT = 20

export const Anchor: React.FC<NodeProps<AnchorProps>> = React.memo(props => {
  const { value } = props.data
  const values = value.filter(item => item.type === 'value')
  const style: any = {
    '--anchor-width': `${WIDTH}px`,
    '--anchor-line-height': `${LINE_HEIGHT}px`
  }
  return (
    <div className='anchor' style={style}>
      <div className='anchor-block-title'>普通属性</div>
      {values.map(val => (
        <div className='anchor-item' key={val.id}>
          <div className='anchor-label' key={val.id}>
            {val.name}
          </div>
          <div className='anchor-value'>{JSON.stringify(val.value)}</div>
        </div>
      ))}
      <div className='anchor-block-title'>引用属性</div>
    </div>
  )
})
