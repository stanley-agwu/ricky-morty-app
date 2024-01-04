import { DropdownIndicatorProps, components } from 'react-select';

import ChevronDownSvg from './chevron-down.svg';
import Image from 'next/image';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <Image
        className={menuIsOpen ? 'select-chevron-open' : ''}
        src={ChevronDownSvg}
        alt='toggle menu'
      />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
