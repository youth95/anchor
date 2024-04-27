/**
 * 值类型
 */

/**
 * 引用类型
 */

type AnchorType = 'value' | 'reference'

export interface AnchorItem {
  id: string
  name: string
  value: string
  type: AnchorType
}

export interface AnchorProps {
  // 配置值
  value: AnchorItem[]
}
