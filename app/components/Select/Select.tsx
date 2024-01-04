import ReactSelect, { GroupBase, Props } from 'react-select';
import DropdownIndicator from './SelectDropdownIndicator';
import SelectValueContainer from './SelectValueContainer';
import { ForwardedRef, forwardRef } from 'react';
import AsyncSelectComponent, { AsyncProps } from 'react-select/async';

import './Select.scss';

export type SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = Props<Option, IsMulti, Group>;

export const ReactSelectProps = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => ({
  id: 'ReactSelect',
  clasNamePrefix: 'ReactSelect',
  components: {
    IndicatorSeparator: () => null,
    DropdownIndicator,
    ...(props.isMulti ? { ValueContainer: SelectValueContainer } : {}),
    ...props.components,
  },
});

export const Select = forwardRef(
  <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
  >(
    props: SelectProps<Option, IsMulti, Group>,
    ref: ForwardedRef<any>
  ) => (
    <ReactSelect {...props} ref={ref} {...(ReactSelectProps(props) as any)} />
  )
);

Select.displayName = 'Select';

export const AsyncSelect = forwardRef(
  <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
  >(
    props: AsyncProps<Option, IsMulti, Group>,
    ref: ForwardedRef<any>
  ) => (
    <AsyncSelectComponent
      {...props}
      ref={ref}
      {...(ReactSelectProps(props) as any)}
    />
  )
);

AsyncSelect.displayName = 'AsyncSelect';
