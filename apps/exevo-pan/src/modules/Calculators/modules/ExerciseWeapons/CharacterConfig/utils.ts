import * as CONSTANTS from './constants'
import { PointsCalcArgs, SkillCalcArgs } from './types'

const totalPoints = ({
  skillValue,
  vocation,
  skill,
}: PointsCalcArgs): number => {
  const vocationConstant = CONSTANTS.VOCATION[vocation][skill]

  const numerator = vocationConstant ** skillValue - 1
  const denominator = vocationConstant - 1

  return CONSTANTS.SKILL * (numerator / denominator)
}

const pointsToAdvance = ({
  skillValue,
  vocation,
  skill,
}: PointsCalcArgs): number => {
  const vocationConstant = CONSTANTS.VOCATION[vocation][skill]
  return CONSTANTS.SKILL * vocationConstant ** skillValue
}

export const calculateRequiredPoints = ({
  currentSkill,
  targetSkill,
  percentageLeft,
  loyaltyBonus,
  ...args
}: SkillCalcArgs): number => {
  const currentPoints = totalPoints({ skillValue: currentSkill, ...args })
  const targetPoints = totalPoints({ skillValue: targetSkill, ...args })
  const currentCompletedPercentage = percentageLeft / 100

  const requiredPoints = targetPoints - currentPoints

  let totalRequiredPointsPoints = 0
  if (targetSkill - currentSkill === 1) {
    totalRequiredPointsPoints = requiredPoints * currentCompletedPercentage
  } else {
    const pointsToNext = pointsToAdvance({ skillValue: currentSkill, ...args })
    totalRequiredPointsPoints =
      requiredPoints - pointsToNext * (1 - currentCompletedPercentage)
  }

  return totalRequiredPointsPoints / (1 + loyaltyBonus / 100)
}
