'use client';

import {
  GroupBase,
  PropsValue,
  InputAction,
  OnChangeValue,
  OptionsOrGroups,
} from 'react-select';

import './MultiSelect.scss';
import {
  ForwardedRef,
  type KeyboardEvent,
  forwardRef,
  useMemo,
  useState,
} from 'react';
import type { Option as OptionType } from './Option';
import { Select, type SelectProps } from '../Select';
import MultiSelectOption from './MultiSelectOption';
import MultiSelectValueContainer from './MultiSelectValueContainer';
import DropdownIndicator from '../SelectDropdownIndicator';
import MultiSelectInput from './MultiSelectInput';

interface FilterOptionOption<Option> {
  readonly label: string;
  readonly value: string;
  readonly data: Option;
}

export interface MultiSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends SelectProps<Option, IsMulti, Group> {
  badgeString?: string;
  allOptionLabel?: string;
  defaultValue?: Option[];
}

const MultiSelectCore = forwardRef(
  <
    Option extends OptionType,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
  >(
    props: MultiSelectProps<Option, IsMulti, Group>,
    ref: ForwardedRef<any>
  ) => {
    const [selectInput, setSelectInput] = useState<string>('');
    const allOption = props.allOptionLabel
      ? ({ value: '*', label: props.allOptionLabel } as Option)
      : null;

    const comparator = (v1: Option, v2: Option) =>
      (v1.value as number) - (v2.value as number);

    const filterOptions = (options: any, input: any) =>
      options
        ?.filter(({ label }: Option) =>
          label?.toLowerCase().includes(input?.toLowerCase())
        )
        ?.sort(comparator);
    const filteredOptions = filterOptions(props.options, selectInput);
    const filteredSelectOptions = filterOptions(props.value, selectInput);

    const customFilterOption = (
      { value, label }: FilterOptionOption<Option | unknown>,
      input: string
    ) =>
      (value !== '*' && label?.toLowerCase().includes(input?.toLowerCase())) ||
      (value !== '*' && filteredOptions?.length > 0);

    const onInputChange = (
      inputValue: string,
      event: { action: InputAction }
    ) => {
      if (event.action === 'input-change') {
        setSelectInput(inputValue);
      } else if (event.action === 'menu-close' && selectInput !== '') {
        setSelectInput('');
      }
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      if ((event.key === ' ' || event.key === 'Enter') && !selectInput) {
        event.preventDefault();
      }
    };

    const isAllSelected = useMemo(
      () =>
        JSON.stringify(filteredSelectOptions) ===
        JSON.stringify(filteredOptions),
      [filteredOptions, filteredSelectOptions]
    );

    const handleChange = (selected: any) => {
      type OnChange = NonNullable<typeof props.onChange>;
      const onChange = props.onChange as OnChange;
      if (
        (selected.length === 1 && selected.value === '*') ||
        selected.length === (props?.options?.length && props.options.length + 1)
      ) {
        return onChange(
          [] as unknown as OnChangeValue<Option, IsMulti>,
          undefined as any
        );
      }
      if (
        selected.length > 0 &&
        !isAllSelected &&
        (selected[selected.length - 1].value === allOption?.value ||
          JSON.stringify(filteredOptions) ===
            JSON.stringify(selected.sort(comparator)))
      ) {
        return onChange(
          [
            ...((props.value as any) ?? []),
            ...(props.options?.length
              ? props.options.filter(
                  ({ label }: any) =>
                    label?.toLowerCase().includes(selectInput?.toLowerCase()) &&
                    ((props.value as any) ?? [])?.filter(
                      (opt: Option) => opt.label === label
                    )?.length === 0
                )
              : []),
          ].sort(comparator) as any,
          undefined as any
        );
      }
      if (
        selected.length > 0 &&
        selected[selected.length - 1].value !== allOption?.value &&
        JSON.stringify(selected.sort(comparator)) !==
          JSON.stringify(filteredOptions)
      ) {
        return onChange(selected, undefined as any);
      }
      return onChange(
        [
          ...((props.value as any)?.filter(
            ({ label }: any) =>
              !label.toLowerCase().includes(selectInput?.toLowerCase())
          ) || []),
        ] as any,
        undefined as any
      );
    };
    const allOptionArray = (allOption as Option) ? [allOption] : [];

    return (
      <Select
        isMulti
        {...props}
        ref={ref}
        className={`MultiSelect ${props.className || ''}`}
        inputValue={selectInput}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        options={[
          ...allOptionArray,
          ...(props.options as OptionsOrGroups<Option, Group>),
        ]}
        onChange={handleChange}
        components={
          {
            DropdownIndicator: DropdownIndicator,
            option: MultiSelectOption(isAllSelected, filteredSelectOptions),
            Input: MultiSelectInput,
            ValueContainer: MultiSelectValueContainer(
              props.badgeString as string
            ),
            IndicatorSeparator: () => null,
            ...props.components,
          } as any
        }
        isClearable={false}
        filterOption={customFilterOption}
        menuPlacement={props.menuPlacement ?? 'auto'}
        closeMenuOnSelect={false}
        tabSelectsValue={false}
        backspaceRemovesValue={false}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
        {...(props.defaultValue && {
          defaultValue:
            props.defaultValue.length === props.options?.length
              ? [...allOptionArray, ...props.defaultValue]
              : props.defaultValue,
        })}
      />
    );
  }
);

MultiSelectCore.displayName = 'MultiSelectCore';

export const MultiSelect = forwardRef(
  <
    Option extends OptionType,
    IsMulti extends boolean = true,
    Group extends GroupBase<Option> = GroupBase<Option>
  >(
    props: MultiSelectProps<Option, IsMulti, Group>,
    ref: ForwardedRef<any>
  ) => {
    const [optionSelected, setOptionSelected] =
      useState<PropsValue<Option> | null>();
    const handleChange = (selected: any, action: any) => {
      setOptionSelected(selected);
      props.onChange?.(selected, action);
    };
    return (
      <MultiSelectCore
        {...props}
        ref={ref}
        value={optionSelected}
        onChange={handleChange}
      />
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
