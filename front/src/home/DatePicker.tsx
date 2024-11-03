// DateOnlyPicker.tsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import createCache from '@emotion/cache';
import { TextField } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { Dayjs } from 'dayjs';

// Create rtl cache
const cacheRtl = createCache({
  key: 'pickers-rtl-demo',
  stylisPlugins: [prefixer, rtlPlugin],
});

interface DateOnlyPickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

export default function DateOnlyPicker({
  label,
  value,
  onChange,
}: DateOnlyPickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            InputLabelProps={{
              style: { textAlign: 'left' },
            }}
            inputProps={{
              ...params.inputProps,
              style: {
                textAlign: 'left',
                padding: '10px',
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
