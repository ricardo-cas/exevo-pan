import styled, { css } from 'styled-components'
import {
  LabeledTextBox as BaseLabeledTextBox,
  AuctionTimer as BaseAuctionTimer,
  Checkbox as BaseCheckbox,
} from 'components/Atoms'
import Image from 'next/image'
import { MaterialCard } from 'styles'
import TibiaCoinImage from 'assets/tibiacoin.png'
import { BattleyeStatusStyleProps } from './types'

export const AlignedFlex = styled.div`
  display: flex;
  align-items: center;
`

export const Wrapper = styled.article<{ highlighted: boolean }>`
  ${MaterialCard}
  padding: 16px;

  &:hover {
    position: relative;
    z-index: 5;
  }

  ${({ highlighted }) =>
    highlighted &&
    css`
      --surface: var(--kwaiSurface);
      --primary: var(--kwai);
      --primaryVariant: var(--kwaiVariant);

      z-index: 2;

      @media (min-width: 768px) {
        animation: zoom 0.6s ease-out forwards;
        animation-delay: 1s;

        @keyframes zoom {
          0% {
            transform: scale(1);
          }
          20% {
            transform: scale(1.02);
            box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.1);
          }
          80% {
            transform: scale(1.02);
            box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.1);
          }
          100% {
            transform: scale(1);
          }
        }
      }
    `}
`

export const Head = styled(AlignedFlex)<{ highlighted: boolean }>`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;

  ${({ highlighted }) =>
    highlighted &&
    css`
      p {
        color: var(--green) !important;
      }
    `};
`

export const InfoGrid = styled.div`
  margin-bottom: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 12px;
`

export const LabeledTextBox = styled(BaseLabeledTextBox)`
  font-size: 14px;

  > div {
    margin-right: 4px !important;
  }
`

export const BattleyeStatus = styled.div<BattleyeStatusStyleProps>`
  margin-right: 4px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: solid 1px #00000020;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
  background-color: ${({ active }) =>
    active ? 'var(--battleGreen)' : 'var(--battleYellow)'};
`

export const AuctionTimer = styled(BaseAuctionTimer)`
  font-size: 14px;
  *,
  + span {
    font-size: 14px;
  }
`

export const TibiaCoinIcon = styled(Image).attrs({
  src: TibiaCoinImage,
  alt: 'Tibia Coin',
})`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translateY(1px);
`

export const FlexWrapper = styled.div`
  padding-top: 12px;
  border-top: solid 1px var(--separator);
  display: flex;
  justify-content: space-between;
`

export const FlexColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;

  > * {
    width: fit-content;
  }
`

export const Checkbox = styled(BaseCheckbox)`
  &:checked {
    background-color: var(--primary);
    border-color: var(--primary);
  }
`

export const Body = styled.div`
  margin-bottom: 12px;
`
