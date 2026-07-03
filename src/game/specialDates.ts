export interface SpecialSlot {
	itemId: string
}

export const SPECIAL_DATES: Record<string, SpecialSlot[]> = {
	'07-07': [{ itemId: 'cake' }],
}

export function getTodaysSpecialSlots(): SpecialSlot[] {
	const now = new Date()
	const key = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
	return SPECIAL_DATES[key] ?? []
}
