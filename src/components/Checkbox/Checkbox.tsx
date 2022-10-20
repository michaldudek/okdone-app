import styled from '@emotion/styled';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { FunctionComponent } from 'react';

const StyledCheckbox = styled(RadixCheckbox.Root)`
  --size: var(--16px);

  font-size: inherit;
  display: inline-block;
  background-color: var(--background-subtle);
  padding: 0;
  width: var(--size);
  height: var(--size);
  border: 1px solid var(--border-subtle);
  border-radius: var(--border-radius-small);
  transition: all 0.15s ease-in-out;
  outline: none;

  &[data-state='checked'] {
    background-color: var(--button-primary);
    border-color: var(--button-primary);
  }
`;

const StyledIndicator = styled(RadixCheckbox.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--size) - 2px);
  height: calc(var(--size) - 2px);
  color: var(--button-primary-label);
`;

export const Checkbox: FunctionComponent<RadixCheckbox.CheckboxProps> = (
  props,
) => (
  <StyledCheckbox {...props}>
    <StyledIndicator>
      <Check size={12} color="white" weight="regular" />
    </StyledIndicator>
  </StyledCheckbox>
);
