import { ReactNode } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

export enum HeaderType {
  h1 = 'h1',
  h2 = 'h2',
}

interface HeaderProps {
  title: ReactNode;
  subTitle?: ReactNode;
  headerType?: HeaderType;
  className?: string;
  withMargin?: boolean;
}

export const Header = ({
  title,
  subTitle,
  headerType,
  className,
  withMargin,
}: HeaderProps) => (
  <header
    className={classNames(
      styles.header,
      { [styles.paddingTop]: withMargin },
      className
    )}
  >
    {headerType === HeaderType.h1 && <h1>{title}</h1>}
    {headerType === HeaderType.h2 && <h2>{title}</h2>}
    {subTitle && <p>{subTitle}</p>}
  </header>
);
