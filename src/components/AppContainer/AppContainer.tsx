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
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
`;
