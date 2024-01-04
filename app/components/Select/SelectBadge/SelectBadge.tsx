import { ReactNode } from 'react';

import CloseSvg from './close.svg';

import styles from './SelectBadge.module.scss';
import Image from 'next/image';

interface SelectBadgeProps {
  label: string | ReactNode;
  clearValue: () => void;
}

const SelectBadge = ({ label, clearValue }: SelectBadgeProps) => (
  <div className={styles.selectBadge}>
    <div>{label}</div>
    <button className={styles.closeButton} onClick={clearValue}>
      <Image src={CloseSvg} alt='Close' />
    </button>
  </div>
);

export default SelectBadge;
