import { components, type ValueContainerProps } from 'react-select';
import SelectBadge from '../SelectBadge/SelectBadge';
import { ReactElement, ReactNode } from 'react';

const MultiSelectValueContainer =
  // eslint-disable-next-line react/display-name
  (badgeString: string) => (props: ValueContainerProps) => {
    const [values, input] = props.children as [ReactNode[], ReactNode];
    const valuesWithoutAll = (values as ReactElement[])?.filter?.(
      ({ props }) => props.data.value !== '*'
    );

    if (valuesWithoutAll?.length) {
      return (
        <components.ValueContainer {...props}>
          <SelectBadge
            label={(badgeString || '{numberOfOptions} selected').replace(
              '{numberOfOptions}',
              `${valuesWithoutAll.length}`
            )}
            clearValue={props.clearValue}
          />
          {input}
        </components.ValueContainer>
      );
    }

    return (
      <components.ValueContainer {...props}>
        {values}
        {input}
      </components.ValueContainer>
    );
  };

export default MultiSelectValueContainer;
