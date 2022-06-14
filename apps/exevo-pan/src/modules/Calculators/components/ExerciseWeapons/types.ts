export type TypedOption<T> = {
  value: T
} & Pick<Option, 'name'>

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer'

export type Skill = 'magic' | 'melee' | 'distance'

type BaseCalcArgs = {
  vocation: Vocation
  skill: Skill
}

export type SkillCalcArgs = {
  currentSkill: number
  targetSkill: number
  percentageLeft: number
} & BaseCalcArgs

export type PointsCalcArgs = {
  skillValue: number
} & BaseCalcArgs
