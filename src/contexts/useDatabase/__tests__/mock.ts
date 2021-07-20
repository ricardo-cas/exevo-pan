import { randomDataset } from 'utils/test'

const {
  partialCharacterData,
  serverData: generatedServerData,
  itemData: generatedItemData,
  characterData,
} = randomDataset()
/* import { buildCharacterData } from '../utils' */

export const charBuildedData = partialCharacterData

export const serverData = generatedServerData

export const itemData = generatedItemData

export const completeCharData = characterData

export const initialFilter = {
  nicknameFilter: '',
  vocation: new Set([]),
  pvp: new Set([]),
  battleye: new Set([]),
  location: new Set([]),
  serverSet: new Set([]),
  minLevel: 8,
  maxLevel: 2000,
  minSkill: 10,
  skillKey: new Set([]),
  itemSet: new Set([]),
  fav: false,
  rareNick: false,
  soulwarFilter: false,
  imbuementsSet: new Set([]),
} as FilterState

const favEK: CharacterObject = { ...characterData[0], vocationId: 1 }
const favED: CharacterObject = { ...characterData[1], vocationId: 4 }
export const mockFavArray = [favEK, favED] as CharacterObject[]

export const filteredFavArray = [favEK] as CharacterObject[]
