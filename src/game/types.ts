export type ItemCategory = 'edible' | 'cuddly' | 'instrument' | 'inert'

export interface ItemConfig {
  id: string
  label: string
  category: ItemCategory
  consumed: boolean
}

export const ITEM_CONFIGS: ItemConfig[] = [
  { id: 'chocolate', label: 'Chocolate', category: 'edible', consumed: true },
  { id: 'apple', label: 'Apple', category: 'edible', consumed: true },
  { id: 'cat', label: 'Cat', category: 'cuddly', consumed: false },
  { id: 'rabbit', label: 'Rabbit', category: 'cuddly', consumed: false },
  { id: 'guitar', label: 'Guitar', category: 'instrument', consumed: false },
]
