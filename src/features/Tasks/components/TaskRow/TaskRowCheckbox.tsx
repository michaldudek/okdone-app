import styled from '@emotion/styled';
import { Checkbox } from 'components/Checkbox';
import { MediaQuery } from 'styles';

export const TaskRowCheckbox = styled(Checkbox)`
  --size: var(--20px);
  flex-shrink: 0;
  width: var(--size);
  height: var(--size);
  margin-top: var(--2px);
  margin-right: var(--6px);

  ${MediaQuery.Tablet} {
    --size: var(--16px);
    margin-top: var(--3px);
  }
`;
