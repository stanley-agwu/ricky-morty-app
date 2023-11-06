'use client';

import {
  Fragment,
  ReactElement,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import Drawer, { DrawerProps } from '@mui/material/Drawer';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export interface SidebarProps {
  visible?: boolean;
  trigger?: JSX.Element;
  children: ReactElement;
  stickyHeader?: boolean;
  hideClose?: boolean;
  clickOutsideEnabled?: boolean;
  drawerOptions?: DrawerProps;
  title?: string;
  onClose?: () => void;
}

export const Sidebar = ({
  visible,
  trigger,
  children,
  stickyHeader,
  hideClose,
  clickOutsideEnabled,
  drawerOptions,
  title,
  onClose,
}: SidebarProps): JSX.Element => {
  const [visibility, setVisibility] = useState(visible);
  const ref = useRef();

  const onCloseFn = debounce(() => {
    if (onClose) {
      onClose();
    }
    setVisibility(false);
  }, 150);

  useOnClickOutside(
    ref,
    () => clickOutsideEnabled && visibility && onCloseFn()
  );

  useEffect(() => {
    setVisibility(visible);
  }, [visible]);

  return (
    <Fragment>
      {trigger &&
        cloneElement(trigger, { onClick: setVisibility(!visibility) })}
      <Drawer {...drawerOptions} anchor='right' open={visibility}>
        <div
          className={classNames(styles.header, stickyHeader && styles.sticky)}
        >
          <div className={classNames(styles.headerContent)}>
            {title && <h3>{title}</h3>}
            {!hideClose && <button onClick={onCloseFn}>Close</button>}
          </div>
          <div>{children}</div>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;
