import { Cell } from '../Cell/Cell';
// import Avatar from '../Avatar/Avatar';
import styles from './UserCell.module.scss';
import classNames from 'classnames';

export interface UserCellProps {
  className?: string;
  photoResourceId?: string;
  name: string;
  userRole?: string;
  hideAvatar?: boolean;
}

const Avatar = (props: any) => <div {...props} />;

export const UserCell = ({
  className,
  name,
  userRole,
  hideAvatar,
  ...props
}: UserCellProps) => (
  <Cell className={className}>
    <div className={styles.userCell}>
      {!hideAvatar && (
        <Avatar className={styles.avatar} name={name} {...props} />
      )}
      <div className={styles.text}>
        <div className={classNames(styles.small, styles.text)}>{userRole}</div>
        {userRole && <div className={styles.subtext}>{userRole}</div>}
      </div>
    </div>
  </Cell>
);
