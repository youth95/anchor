import React, { useCallback, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges
} from 'reactflow'
import dagre from 'dagre'
import { nodeTypes } from 'anchor'
import { generateAnchor } from 'anchor'
import 'reactflow/dist/style.css'
import 'anchor/src/index.css'

const { nodes: initialNodes, edges: initialEdges } = generateAnchor([
  {
    a: '',
    b: 1,
    c: false,
    d: null,
    e: undefined
  },
  {
    a: '',
    b: {
      c: false,
      d: null,
      e: undefined
    },
    a1: {
      b: true
    }
  },
  {
    a: '',
    b: 1,
    e: [
      { c: false, d: null, e: undefined },
      { c: false, d: null, e: undefined }
    ]
  }
])

console.log(initialNodes, initialEdges)

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))
dagreGraph.setGraph({ rankdir: 'LR' })

initialNodes.forEach(node => {
  dagreGraph.setNode(node.id, { width: node.width, height: node.height })
})

initialEdges.forEach(edge => {
  dagreGraph.setEdge(edge.source, edge.target)
})

dagre.layout(dagreGraph)

initialNodes.forEach(node => {
  const nodeWithPosition = dagreGraph.node(node.id)
  node.position = {
    x: nodeWithPosition.x - node.width! / 2,
    y: nodeWithPosition.y - node.height! / 2
  }
  return node
})

function App () {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const onNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    []
  )
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
