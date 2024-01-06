import { MouseEvent, ReactNode, SyntheticEvent, useState } from 'react';
import classNames from 'classnames';
import { BreakPointContext, useBreakPoints } from '@/app/hooks/useBreakPoints';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import Image from 'next/image';
import MenuIcon from './menu-icon.svg';
import styles from './NavigationHeader.module.scss';

interface NavigationHeaderProps {
  children: ReactNode;
  className?: string;
}

export const NavigationHeader = ({
  children,
  className,
}: NavigationHeaderProps) => {
  const { isMobile, isTablet } = useBreakPoints();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (event: KeyboardEvent | SyntheticEvent<{}, Event>) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(true);
  };

  const onClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  return (
    <BreakPointContext.Provider value={{ isMobile, isTablet }}>
      <div className={classNames(styles.navigationHeader, className)}>
        {isMobile ? (
          <MenuDrawer
            isOpen={isOpen}
            onClose={onClose}
            toggleDrawer={toggleDrawer}
          >
            <button
              onClick={toggleDrawer}
              className={classNames(styles.button)}
            >
              <Image src={MenuIcon} alt='Menu' />
            </button>
          </MenuDrawer>
        ) : null}
        {children}
      </div>
    </BreakPointContext.Provider>
  );
};
