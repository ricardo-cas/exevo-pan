import styled from 'styled-components'
import { MaterialCard } from 'styles'

export const Wrapper = styled.div`
  ${MaterialCard}
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 72;
  transform: translate(-50%, -50%);
`
