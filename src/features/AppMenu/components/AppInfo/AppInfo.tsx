import { Label } from 'components/Label';
import { Logo } from 'components/Logo';
import { ComponentProps, FunctionComponent } from 'react';
import { getConfig } from 'services/Config';
import styles from './AppInfo.module.scss';

type Props = ComponentProps<'div'>;

export const AppInfo: FunctionComponent<Props> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className={styles.banner}>
        <Logo size={48} className={styles.logo} />
        <div className={styles.info}>
          <h1 className={styles.appName}>OK, Done!</h1>
          <p className={styles.appVersion}>
            {getConfig('version')} <Label variant="danger">Alpha</Label>
          </p>
        </div>
      </div>
      <p className={styles.description}>
        An experimental TODO app serving as development kitchen sink and
        playground for ideas around modern web/app dev.
      </p>
    </div>
  );
};
