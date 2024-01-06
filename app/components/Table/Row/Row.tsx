'use client';

import classNames from 'classnames';
import { EtableSizes } from '../Table/Table';
import { useTableContext } from '../Table/TableContext';

import styles from './Row.module.scss';
import { TableRow, TableRowProps } from '@mui/material';

export interface RowProps extends TableRowProps {
  isStriped?: boolean;
  isSelected?: boolean;
}

export const Row = ({
  className = '',
  isStriped,
  isSelected,
  children,
  hover,
  onClick,
  ...props
}: RowProps) => {
  const { size } = useTableContext();
  return (
    <TableRow
      {...props}
      onClick={onClick}
      className={classNames(
        styles.row,
        't-row',
        {
          [styles.striped]: isStriped,
          [styles.tight]: size === EtableSizes.tight,
          [styles.selected]: isSelected,
          [styles.noHover]: !hover,
          hover,
        },
        className
      )}
      hover={hover}
    >
      {children}
    </TableRow>
  );
};
