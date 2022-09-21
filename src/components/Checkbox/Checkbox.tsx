import styled from '@emotion/styled';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { FunctionComponent } from 'react';

const StyledCheckbox = styled(RadixCheckbox.Root)`
  --size: var(--12px);

  background-color: var(--bg-content);
  padding: 0;
  width: var(--size);
  height: var(--size);
  border: 1px solid var(--border-subtle);
  border-radius: var(--3px);
  transition: all 0.15s ease-in-out;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px var(--border-focus);
  }

  &:active {
    transform: scale(1.3);
  }

  &[data-state='checked'] {
    background-color: var(--bg-done);
    border: none;

    &:focus {
      box-shadow: var(--shadow-focus-alt);
    }
  }
`;

const StyledIndicator = styled(RadixCheckbox.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--12px);
  height: var(--12px);
  color: var(--text-inverse);
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
