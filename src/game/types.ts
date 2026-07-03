export type ItemCategory = 'edible' | 'cuddly' | 'instrument' | 'inert'

export interface ItemConfig {
  id: string
  label: string
  sprite: string
  category: ItemCategory
  consumed: boolean
}

export const ITEM_CONFIGS: ItemConfig[] = [
  { id: 'chocolate', label: 'Chocolate', sprite: '/chocolate.png', category: 'edible', consumed: true },
  { id: 'apple', label: 'Apple', sprite: '/apple.png', category: 'edible', consumed: true },
  { id: 'cat', label: 'Cat', sprite: '/vasya.png', category: 'cuddly', consumed: false },
  { id: 'rabbit', label: 'Rabbit', sprite: '/zayatz.png', category: 'cuddly', consumed: false },
  { id: 'guitar', label: 'Guitar', sprite: '/guitar.png', category: 'instrument', consumed: false },
  { id: 'cake', label: 'Cake', sprite: '/cake.png', category: 'edible', consumed: true },
]
