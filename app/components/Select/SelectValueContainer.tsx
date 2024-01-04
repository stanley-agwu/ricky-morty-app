import { components, type ValueContainerProps } from 'react-select';
import SelectBadge from './SelectBadge/SelectBadge';
import { ReactNode } from 'react';

const SelectValueContainer = (props: ValueContainerProps) => {
  const [valuesChildren, input] = props.children as [ReactNode[], ReactNode];
  const values = props.getValue();
  if (values?.length) {
    return (
      <components.ValueContainer {...props}>
        {values.map(({ label }: any) => (
          <SelectBadge
            key={label}
            label={label}
            clearValue={() =>
              props.setValue(
                values.filter((x: any) => x.label !== label),
                'deselect-option'
              )
            }
          />
        ))}
        {input}
      </components.ValueContainer>
    );
  }

  return (
    <components.ValueContainer {...props}>
      {valuesChildren}
      {input}
    </components.ValueContainer>
  );
};

export default SelectValueContainer;
