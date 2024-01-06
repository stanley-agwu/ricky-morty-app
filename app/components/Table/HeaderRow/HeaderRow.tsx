import classNames from 'classnames';
import { Row, RowProps } from '../Row/Row';
import styles from './HeaderRow.module.scss';

export const HeaderRow = ({ className = '', children, ...props }: RowProps) => (
  <Row className={classNames(styles.headerRow, className)} {...props}>
    {children}
  </Row>
);
