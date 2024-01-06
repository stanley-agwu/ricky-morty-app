'use client';

import classNames from 'classnames';
import { Cell, type CellProps } from '../Cell/Cell';
import { EtableSizes } from '../Table/Table';
import { useTableContext } from '../Table/TableContext';

import styles from './HeaderCell.module.scss';

interface HeaderCellProps extends CellProps {
  isMinimum?: boolean;
  colSpan?: number;
}

export const HeaderCell = ({
  className = '',
  colSpan,
  isMinimum,
  children,
  ...props
}: HeaderCellProps) => {
  const { size } = useTableContext();
  return (
    <Cell
      variant='head'
      className={classNames(
        styles.headerCell,
        { [styles.isMinimum]: isMinimum },
        { [styles.tight]: size === EtableSizes.tight },
        className
      )}
      isMinimum={isMinimum}
      sx={{
        ...(typeof colSpan !== 'undefined'
          ? { columnSpan: colSpan as any }
          : {}),
        ...(props?.sx ?? {}),
      }}
    >
      {children}
    </Cell>
  );
};
