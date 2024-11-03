import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { Stack, TextField, Button } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Skill() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skill',
  });

  return (
    <>
      {fields.map((field, index) => (
        <Stack
          direction="row"
          spacing={2}
          key={field.id}
          sx={{ marginBottom: 2 }}
        >
          <Controller
            name={`skills.${index}`}
            control={control}
            render={({ field }) => (
              <TextField fullWidth label={`Skill ${index + 1}`} {...field} />
            )}
          />
          <Button
            variant="outlined"
            color="error"
            onClick={() => remove(index)}
          >
            <RemoveCircleIcon />
          </Button>
        </Stack>
      ))}
      <Button onClick={() => append({})}>Add Skill</Button>
    </>
  );
}

export default Skill;
