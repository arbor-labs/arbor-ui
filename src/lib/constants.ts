import { mainnet } from 'viem/chains'

export const DEFAULT_CHAIN_ID = mainnet.id

export const STEM_COLORS: Record<string, string> = {
	melody: '#5E548E',
	harmony: '#FFD6D8',
	rhythm: '#E74B7A',
	bass: '#20163B',
	drums: '#9F86C0',
	vocals: '#7E0017',
	fx: '#C9184A',
	other: '#87a1ca',
}

export enum EStemType {
	MELODY = 'melody',
	HARMONY = 'harmony',
	RHYTHM = 'rhythm',
	BASS = 'bass',
	DRUMS = 'drums',
	VOCALS = 'vocals',
	FX = 'fx',
	OTHER = 'other',
}

export const PINATA_BASE_URL = 'https://amber-pleased-sloth-337.mypinata.cloud/ipfs/'
