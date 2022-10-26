import styled from '@emotion/styled';
import { Arrow, Content, Portal } from '@radix-ui/react-dropdown-menu';
import { ComponentProps, FunctionComponent } from 'react';
import { contentStyle } from './styles';

type Props = ComponentProps<typeof Content> & {
  showArrow?: boolean;
};

const StyledContent = styled(Content)`
  ${contentStyle}
`;

const StyledArrow = styled(Arrow)`
  fill: var(--background-active);
`;

export const DropdownMenu: FunctionComponent<Props> = ({
  children,
  showArrow = false,
  collisionPadding = 16,
  ...props
}) => {
  return (
    <Portal>
      <StyledContent collisionPadding={collisionPadding} {...props}>
        {children}
        {showArrow && <StyledArrow />}
      </StyledContent>
    </Portal>
  );
};
