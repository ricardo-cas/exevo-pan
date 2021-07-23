import { useState, useMemo } from 'react'
import CharCard, { CardSkeleton } from '../CharCard'
import * as S from './styles'
import { CharacterGridProps } from './types'

export const renderCardSkeleton = (): JSX.Element[] =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => <CardSkeleton key={index} />)

const CharacterGrid = ({
  itemsPerPage = 10,
  characterList,
  isLoading,
  ...props
}: CharacterGridProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const characterPage = useMemo(
    () =>
      characterList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [itemsPerPage, characterList, currentPage],
  )

  return (
    <S.Wrapper {...props}>
      <S.Head>
        <S.FilterIcon />
        <S.SortIcon />

        <S.Paginator
          aria-controls="character-grid"
          pageSize={itemsPerPage}
          totalItems={characterList.length}
          currentPage={currentPage}
          /* @ ToDo: onChange page */
          onChange={newPage => setCurrentPage(newPage)}
          noItemsMessage="No characters found"
        />
      </S.Head>

      <S.Grid id="character-grid">
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <CardSkeleton key={index} />
            ))
          : characterPage.map(item => (
              <CharCard key={item.id} characterData={item} />
            ))}
      </S.Grid>
    </S.Wrapper>
  )
}

export default CharacterGrid
