import { MouseEvent, ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import styles from './SidebarNavigationItem.module.scss';
import classNames from 'classnames';
import Image from 'next/image';

interface SidebarNavigationItemProps extends NavLinkProps {
  children: ReactNode;
  icon: string;
  name: string;
  to: string;
  count?: number;
  onClick?: (event: MouseEvent<any>) => void;
}

const SidebarNavigationItem = ({
  children,
  className,
  count,
  icon,
  to,
  name,
  ...props
}: SidebarNavigationItemProps) => (
  <div className={styles.sidebarNavigationItem}>
    {count && <div className={styles.sidebarItemCount} />}
    <NavLink
      {...props}
      to={to}
      className={classNames(styles.navLink, className as string)}
    >
      <Image className={styles.navIcon} src={icon} alt={name} />
      <span className={styles.content}>{children}</span>
    </NavLink>
  </div>
);

export default SidebarNavigationItem;
