'use client';

import {
  Fragment,
  MutableRefObject,
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
  titleBorder?: boolean;
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
  titleBorder,
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
        cloneElement(trigger, { onClick: () => setVisibility(!visibility) })}
      <Drawer {...drawerOptions} anchor='left' open={visibility}>
        <div
          ref={ref as MutableRefObject<any>}
          id='sidebar'
          className={styles.sidebar}
        >
          <div
            className={classNames(styles.header, stickyHeader && styles.sticky)}
          >
            <div
              className={classNames(
                styles.headerContent,
                titleBorder && styles.titleBorder
              )}
            >
              {title && <h3 className={styles.title}>{title}</h3>}
              {!hideClose && <button onClick={onCloseFn}>Close</button>}
            </div>
          </div>
          <div className={styles.headerContent}>{children}</div>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;
