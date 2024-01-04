import { components, type InputProps } from 'react-select';

const MultiSelectInput = (props: InputProps) => (
  <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
    {props.children}
  </components.Input>
);

export default MultiSelectInput;
