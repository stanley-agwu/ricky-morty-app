'use client';

import MuiTable, { type TableProps as ITableProps } from '@mui/material/Table';

import { TableContext } from './TableContext';

export enum EtableSizes {
  default,
  tight,
}

export interface TableProps extends Omit<ITableProps, 'size'> {
  size?: EtableSizes;
}

export const Table = ({
  size = EtableSizes.default,
  children,
  ...props
}: TableProps) => (
  <TableContext.Provider value={{ size, ...props }}>
    <MuiTable {...props}>{children}</MuiTable>
  </TableContext.Provider>
);
