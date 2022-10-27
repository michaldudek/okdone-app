import styled from '@emotion/styled';
import { Logo } from 'components/Logo';
import { FunctionComponent } from 'react';
import { getConfig } from 'services/Config';
import { MediaQuery } from 'styles';

const Banner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: var(--8px);
`;

const StyledLogo = styled(Logo)`
  flex-shrink: 0;
  margin-right: var(--16px);
`;

const Info = styled.div`
  flex: 1;
`;

const AppName = styled.h1`
  color: var(--text-primary);
  font-weight: bold;
  margin-bottom: var(--8px);
`;

const AppVersion = styled.p`
  color: var(--text-tertiary);
`;

const Description = styled.p`
  line-height: 1.2;
  color: var(--text-tertiary);

  ${MediaQuery.Tablet} {
    max-width: var(--220px);
  }
`;

export const AppInfo: FunctionComponent = ({ ...props }) => {
  return (
    <div {...props}>
      <Banner>
        <StyledLogo size={48} />
        <Info>
          <AppName>OK, Done!</AppName>
          <AppVersion>{getConfig('version')}</AppVersion>
        </Info>
      </Banner>
      <Description>
        An experimental TODO app serving as development kitchen sink and
        playground for ideas around modern web/app dev.
      </Description>
    </div>
  );
};
