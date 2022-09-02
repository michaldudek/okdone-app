import styled from '@emotion/styled';
import { MediaQuery, pxToRem } from 'styles';

export const AppContainer = styled.main`
  background-color: var(--bg-primary);
  width: 100%;
  height: 100%;

  ${MediaQuery.Tablet} {
    width: 700px;
    height: 90vh;
    border-radius: ${pxToRem(8)};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`;
