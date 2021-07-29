/* eslint-disable jsx-a11y/accessible-emoji */
import { useMemo, useState, useCallback, useEffect } from 'react'
import { dequal } from 'dequal'
import { Drawer, Chip, RangeSliderInput, SliderInput } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import { useDrawerFields, useDatabaseDispatch } from 'contexts/useDatabase'
import FilterGroup from './FilterGroup'
import * as S from './styles'
import * as Icon from './icons'
import { FilterDrawerProps } from './types'

import { toggleSet } from './utils'
import {
  buildServerOptions,
  buildRareItemsOptions,
  imbuementOptions,
} from './options'

const defaultFilterState = {
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
}

const FilterDrawer = ({
  open,
  onClose,
  ...props
}: FilterDrawerProps): JSX.Element => {
  const { serverData, rareItemData } = useDrawerFields()
  const serverOptions = useMemo(
    () => buildServerOptions(serverData),
    [serverData],
  )
  const rareItemOptions = useMemo(
    () => buildRareItemsOptions(rareItemData),
    [rareItemData],
  )

  /* @ ToDo: default values come from url parameters */
  const [filters, setFilters] = useState<FilterState>(defaultFilterState)
  const [isFilterReset, setIsFilterReset] = useState<boolean>(() =>
    dequal(filters, defaultFilterState),
  )

  const availableServerOptions = useMemo(
    () => serverOptions.filter(option => !filters.serverSet.has(option.value)),
    [serverOptions, filters.serverSet],
  )

  const availableImbuementOptions = useMemo(
    () =>
      imbuementOptions.filter(
        option => !filters.imbuementsSet.has(option.value),
      ),
    [filters.imbuementsSet],
  )

  const availableRareItemOptions = useMemo(
    () => rareItemOptions.filter(option => !filters.itemSet.has(option.value)),
    [rareItemOptions, filters.itemSet],
  )

  /* @ ToDo: fix this typing */
  const updateFilters = useCallback(
    (key: keyof FilterState, value: typeof filters[keyof FilterState]) =>
      setFilters(currentFilters => {
        if (currentFilters[key] instanceof Set) {
          return {
            ...currentFilters,
            [key]: toggleSet(currentFilters[key] as Set<typeof value>, value),
          }
        } else {
          return { ...currentFilters, [key]: value }
        }
      }),
    [],
  )

  const toggleFilterSet = useCallback(
    (key: keyof FilterState, allOptions: Option[]) => {
      setFilters(currentFilters => {
        if ((currentFilters[key] as Set<string>).size < allOptions.length) {
          return {
            ...currentFilters,
            [key]: new Set([...allOptions.map(option => option.value)]),
          }
        } else {
          return { ...currentFilters, [key]: new Set([]) }
        }
      })
    },
    [],
  )

  const { dispatch } = useDatabaseDispatch()

  useEffect(() => {
    /* @ ToDo: debounced effect */
    const isHistory = window.location.pathname === '/bazaar-history'
    dispatch({ type: 'APPLY_FILTERS', filters, isHistory })

    setIsFilterReset(dequal(filters, defaultFilterState))
    /* @ ToDo: add url parameters */
  }, [dispatch, filters])

  console.log(filters)

  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>
        <S.HeadWrapper>
          Filters
          <S.ResetButton
            disabled={isFilterReset}
            onClick={() => setFilters(defaultFilterState)}
          >
            Reset filters
            <Icon.Reset style={{ marginLeft: 8, marginRight: -4 }} />
          </S.ResetButton>
        </S.HeadWrapper>
      </Drawer.Head>
      <Drawer.Body>
        <FilterGroup
          label="Search nickname"
          htmlFor="search-nickname-input"
          labelSuffix={
            <Tooltip
              offset={[0, 8]}
              placement="top"
              content="Regex is enabled! Example: ['-.,]"
            >
              <Icon.Exclamation />
            </Tooltip>
          }
        >
          <S.Input
            id="search-nickname-input"
            placeholder="Nickname"
            allowClear
            onChange={event =>
              updateFilters('nicknameFilter', event.target.value)
            }
          />
        </FilterGroup>

        <FilterGroup label="Vocation">
          <S.ChipWrapper>
            <Chip
              overrideStatus={filters.vocation.has(0)}
              onClick={() => updateFilters('vocation', 0)}
            >
              <Icon.Rook />
              None
            </Chip>
            <Chip
              overrideStatus={filters.vocation.has(1)}
              onClick={() => updateFilters('vocation', 1)}
            >
              <Icon.Knight />
              Knight
            </Chip>
            <Chip
              overrideStatus={filters.vocation.has(2)}
              onClick={() => updateFilters('vocation', 2)}
            >
              <Icon.Paladin />
              Paladin
            </Chip>
            <Chip
              overrideStatus={filters.vocation.has(3)}
              onClick={() => updateFilters('vocation', 3)}
            >
              <Icon.Sorcerer />
              Sorcerer
            </Chip>
            <Chip
              overrideStatus={filters.vocation.has(4)}
              onClick={() => updateFilters('vocation', 4)}
            >
              <Icon.Druid />
              Druid
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="PvP">
          <S.ChipWrapper>
            <Chip
              overrideStatus={filters.pvp.has(0)}
              onClick={() => updateFilters('pvp', 0)}
            >
              <Icon.Dove />
              Optional
            </Chip>
            <Chip
              overrideStatus={filters.pvp.has(1)}
              onClick={() => updateFilters('pvp', 1)}
            >
              <Icon.WhiteSkull />
              Open
            </Chip>
            <Chip
              overrideStatus={filters.pvp.has(2)}
              onClick={() => updateFilters('pvp', 2)}
            >
              <Icon.OrangeSkull />
              Retro Open
            </Chip>
            <Chip
              overrideStatus={filters.pvp.has(3)}
              onClick={() => updateFilters('pvp', 3)}
            >
              <Icon.RedSkull />
              Hardcore
            </Chip>
            <Chip
              overrideStatus={filters.pvp.has(4)}
              onClick={() => updateFilters('pvp', 4)}
            >
              <Icon.BlackSkull />
              Retro Hardcore
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="BattlEye">
          <S.ChipWrapper>
            <Chip
              overrideStatus={filters.battleye.has(true)}
              onClick={() => updateFilters('battleye', true)}
            >
              <Icon.Status color="battleGreen" />
              Green
            </Chip>
            <Chip
              overrideStatus={filters.battleye.has(false)}
              onClick={() => updateFilters('battleye', false)}
            >
              <Icon.Status color="battleYellow" />
              Yellow
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Server location">
          <S.ChipWrapper>
            <Chip
              overrideStatus={filters.location.has(0)}
              onClick={() => updateFilters('location', 0)}
            >
              <Icon.EuFlag />
              EU
            </Chip>
            <Chip
              overrideStatus={filters.location.has(1)}
              onClick={() => updateFilters('location', 1)}
            >
              <Icon.NaFlag />
              NA
            </Chip>
            <Chip
              overrideStatus={filters.location.has(2)}
              onClick={() => updateFilters('location', 2)}
            >
              <Icon.BrFlag />
              BR
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Server" htmlFor="server-input">
          <S.AutocompleteInput
            id="server-input"
            aria-controls="server-list"
            placeholder="Choose a server"
            style={{ marginBottom: 12 }}
            itemList={availableServerOptions}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('serverSet', option.value),
              [updateFilters],
            )}
          />
          <S.ChipWrapper id="server-list">
            {[...filters.serverSet].map(server => (
              <Chip
                key={server}
                onClose={() => updateFilters('serverSet', server)}
              >
                {server}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Level">
          <RangeSliderInput
            min={8}
            max={2000}
            value={[filters.minLevel, filters.maxLevel]}
            onChange={useCallback(
              (values: [number, number]) => {
                const [newMin, newMax] = values
                updateFilters('minLevel', newMin)
                updateFilters('maxLevel', newMax)
              },
              [updateFilters],
            )}
          />
        </FilterGroup>

        <FilterGroup label="Skill">
          <SliderInput
            aria-label="Minimum skill level"
            min={10}
            max={130}
            value={filters.minSkill}
            onChange={useCallback(
              (event: React.ChangeEvent<HTMLInputElement>) =>
                updateFilters('minSkill', parseInt(event.target.value, 10)),
              [updateFilters],
            )}
            style={{ marginBottom: 16 }}
          />
          <S.ChipWrapper>
            <Chip
              overrideStatus={filters.skillKey.has('magic')}
              onClick={() => updateFilters('skillKey', 'magic')}
            >
              <Icon.Magic />
              Magic
            </Chip>
            <Chip
              overrideStatus={filters.skillKey.has('distance')}
              onClick={() => updateFilters('skillKey', 'distance')}
            >
              <Icon.Distance />
              Distance
            </Chip>
            <Chip
              overrideStatus={filters.skillKey.has('club')}
              onClick={() => updateFilters('skillKey', 'club')}
            >
              <Icon.Club />
              Club
            </Chip>
            <Chip
              overrideStatus={filters.skillKey.has('sword')}
              onClick={() => updateFilters('skillKey', 'sword')}
            >
              <Icon.Sword />
              Sword
            </Chip>
            <Chip
              overrideStatus={filters.skillKey.has('axe')}
              onClick={() => updateFilters('skillKey', 'axe')}
            >
              <Icon.Axe />
              Axe
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Imbuements">
          <S.FlexWrapper>
            <S.AutocompleteInput
              id="imbuements-input"
              aria-controls="imbuements-list"
              placeholder="Select imbuements"
              itemList={availableImbuementOptions}
              onItemSelect={useCallback(
                (option: Option) =>
                  updateFilters('imbuementsSet', option.value),
                [updateFilters],
              )}
            />
            <Chip
              overrideStatus={
                filters.imbuementsSet.size === imbuementOptions.length
              }
              onClick={() => toggleFilterSet('imbuementsSet', imbuementOptions)}
            >
              All imbuements
            </Chip>
          </S.FlexWrapper>
          <S.ChipWrapper id="imbuements-list">
            {[...filters.imbuementsSet].map(imbuement => (
              <Chip
                key={imbuement}
                onClose={() => updateFilters('imbuementsSet', imbuement)}
              >
                {imbuement}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup
          label="Rare items"
          htmlFor="rare-items-input"
          labelSuffix={
            <Tooltip
              offset={[0, 8]}
              placement="top"
              content="If a rare item is not on this list it means that there are no auctions available with it."
            >
              <Icon.Exclamation />
            </Tooltip>
          }
        >
          <S.FlexWrapper>
            <S.AutocompleteInput
              id="rare-items-input"
              aria-controls="rare-items-list"
              placeholder="Choose an item"
              itemList={availableRareItemOptions}
              onItemSelect={useCallback(
                (option: Option) => updateFilters('itemSet', option.value),
                [updateFilters],
              )}
            />
            <Chip
              overrideStatus={filters.itemSet.size === rareItemOptions.length}
              onClick={() => toggleFilterSet('itemSet', rareItemOptions)}
            >
              All items
            </Chip>
          </S.FlexWrapper>
          <S.ChipWrapper id="rare-items-list">
            {[...filters.itemSet].map(item => (
              <Chip key={item} onClose={() => updateFilters('itemSet', item)}>
                {item}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Misc">
          <S.ChipWrapper>
            <Tooltip content="Save your favorite auctions pressing the ❤️ button!">
              <Chip
                overrideStatus={filters.fav}
                onClick={() => updateFilters('fav', !filters.fav)}
              >
                Favorited
                <S.Emoji role="img" aria-label="heart">
                  ❤️
                </S.Emoji>
              </Chip>
            </Tooltip>
            <Tooltip
              style={{ width: 280 }}
              content="Nicknames with special characters (äëïöüÿ'-.,), 2-3 characters length and consecutive uppercase letters (e.g XVI)"
            >
              <Chip
                overrideStatus={filters.rareNick}
                onClick={() => updateFilters('rareNick', !filters.rareNick)}
              >
                Rare nicknames
              </Chip>
            </Tooltip>
            <Tooltip content="Characters level 400+ with Soul War not completed">
              <Chip
                overrideStatus={filters.soulwarFilter}
                onClick={() => {
                  if (filters.soulwarFilter) {
                    /* @ ToDo: add 8 to a constant or get from default values */
                    updateFilters('minLevel', 8)
                    updateFilters('soulwarFilter', false)
                  } else {
                    updateFilters('minLevel', 400)
                    updateFilters('maxLevel', 2000)
                    updateFilters('soulwarFilter', true)
                  }
                }}
              >
                Soulwar available
                <S.Emoji role="img" aria-label="heart">
                  💀
                </S.Emoji>
              </Chip>
            </Tooltip>
          </S.ChipWrapper>
        </FilterGroup>
      </Drawer.Body>
      <S.DrawerFooter />
    </Drawer>
  )
}

export default FilterDrawer
