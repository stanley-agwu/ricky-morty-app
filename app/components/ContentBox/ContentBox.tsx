import { ClassAttributes, forwardRef, HTMLAttributes, MutableRefObject } from 'react';
import classNames from 'classnames';

import { Grid } from '@mui/material';

import styles from './ContentBox.module.scss';

export enum ContentBoxSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
  fullWidth = 'fullWidth',
}

type HTMLProps<T> = ClassAttributes<T> & HTMLAttributes<T>;

interface ContentBoxProps extends HTMLProps<HTMLDivElement> {
  size?: ContentBoxSize;
}

export const ContentBox = forwardRef(
  ({ children, size = ContentBoxSize.fullWidth, className, ...rest }: ContentBoxProps, ref) => (
    <div
      {...rest}
      ref={ref as MutableRefObject<any>}
      className={classNames(styles[size], className)}
    >
      {children}
    </div>
  )
);

ContentBox.displayName = 'ContentBox';

export const ContentContainer = forwardRef(
  ({ children, className, ...rest }: HTMLProps<HTMLDivElement>, ref) => (
    <div
      {...rest}
      ref={ref as MutableRefObject<any>}
      className={classNames(styles.container, className)}
    >
      {children}
    </div>
  )
);

ContentContainer.displayName = 'ContentContainer';

export const GridContent = forwardRef(
  ({ children, className, ...rest }: HTMLProps<HTMLDivElement>, ref) => (
    <Grid
      item
      xs={12}
      {...rest}
      sx={{ padding: { xs: '8px', md: '8px 16px 8px 40px' } }}
      ref={ref as MutableRefObject<any>}
      className={classNames(styles['grid-content'], className)}
    >
      {children}
    </Grid>
  )
);

GridContent.displayName = 'GridContent';
