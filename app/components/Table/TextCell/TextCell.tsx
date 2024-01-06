import classNames from 'classnames';
import { Cell } from '../Cell/Cell';
import styles from './TextCell.module.scss';

export enum TextCellSize {
  small = 'small',
  default = 'default',
}

export interface TextCellProps {
  className?: string;
  text: string;
  subtext?: string;
  size?: TextCellSize;
  hasUpdate?: boolean;
}

export const TextCell = ({
  text,
  size = TextCellSize.default,
  subtext,
  className = '',
}: TextCellProps) => (
  <Cell className={className}>
    <div className={styles.textCell}>
      <div
        className={classNames(styles.text, {
          [styles.small]: size === TextCellSize.small,
        })}
      >
        {text}
      </div>
      {subtext && <div className={styles.subtext}>{subtext}</div>}
    </div>
  </Cell>
);
