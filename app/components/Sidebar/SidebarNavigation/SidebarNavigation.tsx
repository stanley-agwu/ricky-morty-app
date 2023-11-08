'use client';

import { MouseEvent } from 'react';
import SidebarNavigationItem from '../SidebarNavigationItem/SidebarNavigationItem';
import styles from './SidebarNavigation.module.scss';
import classNames from 'classnames';

import icon from '../../../logo.svg';

interface SidebarItemProps {
  className?: string;
  onSelectItem?: (event: MouseEvent) => void;
  title: string;
}

const Characters = ({ className, onSelectItem, title }: SidebarItemProps) => (
  <SidebarNavigationItem
    icon={icon}
    className={className ?? ''}
    to='/'
    name={title}
    onClick={onSelectItem}
  >
    {title}
  </SidebarNavigationItem>
);

interface SidebarNavigationProps {
  isMobile?: boolean;
  onSelectItem?: (event: MouseEvent) => void;
}

const SidebarNavigation = ({
  isMobile,
  onSelectItem,
}: SidebarNavigationProps) => {
  return (
    <div
      className={classNames(styles.sidebarNavigation, {
        [styles.mobile]: isMobile,
      })}
    >
      <Characters title='Characters' onSelectItem={onSelectItem} />
    </div>
  );
};

export default SidebarNavigation;
