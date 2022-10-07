import styled from '@emotion/styled';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { FunctionComponent } from 'react';

const StyledCheckbox = styled(RadixCheckbox.Root)`
  --size: var(--16px);

  background-color: var(--background-secondary);
  padding: 0;
  width: var(--size);
  height: var(--size);
  border: 1px solid var(--divider);
  border-radius: var(--3px);
  transition: all 0.15s ease-in-out;
  outline: none;

  &:focus {
    box-shadow: var(--highlight-shadow);
  }

  &:active {
    transform: scale(1.3);
  }

  &[data-state='checked'] {
    background-color: var(--button-primary);
    border: none;

    &:focus {
      box-shadow: var(--highlight-shadow);
    }
  }
`;

const StyledIndicator = styled(RadixCheckbox.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  color: var(--button-label);
`;

export const Checkbox: FunctionComponent<RadixCheckbox.CheckboxProps> = (
  props,
) => (
  <StyledCheckbox {...props}>
    <StyledIndicator>
      <CheckIcon width={10} height={10} />
    </StyledIndicator>
  </StyledCheckbox>
);
