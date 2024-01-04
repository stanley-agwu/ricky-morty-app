import { components } from 'react-select';

import type { Option } from './Option';
import { Checkbox } from '../../Checkbox/Checkbox';

const MultiSelectOption =
  // eslint-disable-next-line react/display-name
  (isAllSelected: boolean, filteredSelectedOptions: Option[]) => (props: any) =>
    (
      <components.Option {...props}>
        {props.value === '*' &&
        !isAllSelected &&
        filteredSelectedOptions?.length > 0 ? (
          <Checkbox key={props.value} indeterminate={true} />
        ) : (
          <Checkbox
            key={props.value}
            checked={props.isSelected || isAllSelected}
            onChange={() => {}}
          />
        )}
        <label>{props.label}</label>
      </components.Option>
    );

export default MultiSelectOption;
