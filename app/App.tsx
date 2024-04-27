import React from 'react'
import ReactFlow, { Background, Controls } from 'reactflow'
import { nodeTypes } from 'anchor'
import { generateAnchor } from 'anchor'
import 'reactflow/dist/style.css'
import 'anchor/src/index.css'

const { nodes } = generateAnchor([
  {
    a: '',
    b: 1,
    c: false,
    d: null,
    e: undefined
  }
  // {
  //   value: {
  //     a: '',
  //     b: {
  //       c: false,
  //       d: null,
  //       e: undefined
  //     }
  //   }
  // },
  // {
  //   value: {
  //     a: '',
  //     b: 1,
  //     e: [
  //       { c: false, d: null, e: undefined },
  //       { c: false, d: null, e: undefined }
  //     ]
  //   }
  // }
])

console.log(nodes)

function App () {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow fitView nodes={nodes} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
