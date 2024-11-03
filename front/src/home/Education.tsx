import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { Stack, TextField, Button, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Education() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      {fields.map((field, index) => (
        <Stack direction="row" spacing={2} key={field.id}>
          <Controller
            name={`education.${index}.institution`}
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="Institution" {...field} />
            )}
          />
          <Controller
            name={`education.${index}.degree`}
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="Degree" {...field} />
            )}
          />
          <Controller
            name={`education.${index}.year`}
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="Year" {...field} />
            )}
          />
          {/* ...other fields */}
          <Button onClick={() => remove(index)} color="error">
            <RemoveCircleIcon />
          </Button>
        </Stack>
      ))}
      <Button onClick={() => append({ institution: '', degree: '', year: '' })}>
        Add Education
      </Button>
    </>
  );
}

export default Education;
