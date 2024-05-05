import React from 'react'
import { NodeProps, Position } from 'reactflow'
import { Handle } from 'reactflow'
import { AnchorProps } from './types'
import { ANCHOR_COMPONENT_SIZES } from './SIZES'

const { WIDTH, LINE_HEIGHT, LINE_GAP } = ANCHOR_COMPONENT_SIZES

export const Anchor: React.FC<NodeProps<AnchorProps>> = React.memo(props => {
  const { value, label, isRoot } = props.data
  const values = value.filter(item => item.type === 'value')
  const references = value.filter(item => item.type === 'reference')
  const style: any = {
    '--anchor-width': `${WIDTH}px`,
    '--anchor-line-height': `${LINE_HEIGHT}px`,
    '--anchor-line-gap': `${LINE_GAP}px`
  }
  return (
    <div className='anchor' style={style}>
      <div className='anchor-block-title'>
        <span>{label}</span>
        {isRoot ? null : (
          <Handle type='target' position={Position.Left} id={props.id} />
        )}
      </div>
      {/* {values.length ? (
        <div className='anchor-block-title'>
          <span>普通属性</span>
        </div>
      ) : null} */}
      {values.map(val => (
        <div className='anchor-item anchor-value-item' key={val.id}>
          <div className='anchor-label' key={val.id}>
            {val.name}
          </div>
          <div className='anchor-value'>{JSON.stringify(val.value)}</div>
        </div>
      ))}
      {/* {references.length ? (
        <div className='anchor-block-title'>引用属性</div>
      ) : null} */}
      {references.map(val => (
        <div className='anchor-item anchor-ref-item' key={val.id}>
          <div className='anchor-label' key={val.id}>
            <span>{val.name}</span>
            <Handle type='source' position={Position.Right} id={val.name} />
          </div>
          <div className='anchor-value'></div>
        </div>
      ))}
    </div>
  )
})
