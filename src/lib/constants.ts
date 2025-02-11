import { mainnet } from 'viem/chains'

export const DEFAULT_CHAIN_ID = mainnet.id

export const STEM_COLORS: Record<string, string> = {
	vocals: '7E0017',
	drums: '#C9184A',
	percussion: '#E74B7A',
	bass: '#FFD6D8',
	chords: '#20163B',
	melody: '#5E548E',
	combo: '#9F86C0',
	other: '#D8C5F2',
}
