import classNames from 'classnames';

import { TableHead as MuiTableHead, TableHeadProps } from '@mui/material';

import styles from './TableHead.module.scss';

export const TableHead = ({ className, ...props }: TableHeadProps) => (
  <MuiTableHead
    {...props}
    className={classNames(styles.head, className)}
  ></MuiTableHead>
);
