'use client';

import classNames from 'classnames';

import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import { EtableSizes } from '../Table/Table';
import { useTableContext } from '../Table/TableContext';

import styles from './Cell.module.scss';

export enum CellType {
  default = 'default',
  metric = 'metric',
  important = 'important',
}

interface CellProps extends TableCellProps {
  isMinimum?: boolean;
  cellType?: CellType;
}

export const Cell = ({
  className = '',
  isMinimum,
  cellType = CellType.default,
  children,
  ...props
}: CellProps) => {
  const { size } = useTableContext();
  return (
    <TableCell
      {...props}
      className={classNames(
        styles.cell,
        { [styles.tight]: size === EtableSizes.tight },
        { [styles.isMinimum]: isMinimum },
        [styles[cellType]],
        className
      )}
    >
      {children}
    </TableCell>
  );
};

export { TableCellProps as CellProps };
