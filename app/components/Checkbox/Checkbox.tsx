import * as React from 'react';

import MaterialCheckBox, {
  CheckboxProps as MaterialCheckboxProps,
} from '@mui/material/Checkbox';
import { FormControlLabel, Typography } from '@mui/material';

export interface CheckboxProps extends MaterialCheckboxProps {
  fontSize?: number;
  label?: string;
  textColor?: string;
  unCheckedColor?: string;
}

export const Checkbox = ({
  fontSize,
  label,
  textColor,
  unCheckedColor,
  ...props
}: CheckboxProps) => {
  const color = textColor || '#37a58a';
  const unCheckedRadioColor = unCheckedColor || '#93a3b1';
  const formControlTheme = {
    marginLeft: 0,
    marginRight: '8px',
  };

  const checkboxTheme = {
    color: unCheckedRadioColor,
    '& .MuiSvgIcon-root': { fontSize },
    '&.Mui-checked': {
      color,
    },
    '&.Mui-disabled': {
      color: '#e3e9ef',
    },
  };

  return (
    <FormControlLabel
      sx={formControlTheme}
      control={<MaterialCheckBox sx={checkboxTheme} {...props} />}
      label={<Typography style={{ fontSize }}>{label || ''}</Typography>}
    />
  );
};
