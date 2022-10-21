import styled from '@emotion/styled';
import { Checkbox } from 'components/Checkbox';

export const TaskRowCheckbox = styled(Checkbox)`
  flex-shrink: 0;
  --size: var(--16px);
  width: var(--size);
  height: var(--size);
  margin-right: var(--6px);
`;
