'use client';

import {
  Children,
  PropsWithChildren,
  cloneElement,
  useRef,
  useState,
} from 'react';

import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';
import { Cell } from '../Cell/Cell';
import MenuIcon from './menu-icon.svg';
import styles from './MenuCell.module.scss';
import Image from 'next/image';

export const MenuCell = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useOnClickOutside(ref, () => setIsMenuOpen(false));

  return (
    <Cell>
      <div className={styles.menu}>
        <button
          className={styles.menuToggle}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label='Menu cell button'
        >
          <Image src={MenuIcon} alt='Menu Icon' className={styles.menuIcon} />
        </button>
        {isMenuOpen && (
          <div className={styles.menuItems} ref={ref}>
            {Children.map(children, (child) =>
              cloneElement(child as any, {
                className: styles.menuItem,
                onClick(...args: any[]) {
                  (child as any)?.onClick?.(...args);
                  setIsMenuOpen(false);
                },
              })
            )}
          </div>
        )}
      </div>
    </Cell>
  );
};
