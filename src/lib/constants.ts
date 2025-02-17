import { mainnet } from 'viem/chains'

export const DEFAULT_CHAIN_ID = mainnet.id

export const NOTIFICATION_DURATION = 5000

export const STEM_COLORS: Record<string, string> = {
	melody: '#5E548E',
	harmony: '#FB8C92',
	rhythm: '#E74B7A',
	bass: '#D5B6FF',
	drums: '#9F86C0',
	vocals: '#710c29',
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
