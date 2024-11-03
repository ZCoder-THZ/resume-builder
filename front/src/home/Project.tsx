// Project.tsx
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { Stack, TextField, Button, Typography, Grid } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DateOnlyPicker from './DatePicker';
import dayjs from 'dayjs';

export type Projects = Array<{
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}>;

function Project() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'project',
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>
      {fields.map((field, index) => (
        <Stack key={field.id} sx={{ marginBottom: 2 }}>
          {/* Project Name and Dates in the same row */}
          <Grid container marginBottom={2} spacing={2}>
            <Grid item xs={4} spacing={2}>
              <Controller
                name={`project.${index}.name`}
                control={control}
                render={({ field }) => (
                  <TextField fullWidth label="Project Name" {...field} />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`project.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <DateOnlyPicker
                    label="Start Date"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.format('YYYY-MM-DD') : '')
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`project.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <DateOnlyPicker
                    label="End Date"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.format('YYYY-MM-DD') : '')
                    }
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Description on a separate row */}
          <Grid item xs={12} marginBottom={2}>
            <Controller
              name={`project.${index}.description`}
              control={control}
              render={({ field }) => (
                <TextField fullWidth label="Description" {...field} />
              )}
            />
          </Grid>

          {/* Remove button */}
          <Button
            variant="outlined"
            color="error"
            onClick={() => remove(index)}
            startIcon={<RemoveCircleIcon />}
          >
            Remove Project
          </Button>
        </Stack>
      ))}
      <Button
        onClick={() =>
          append({ name: '', description: '', startDate: '', endDate: '' })
        }
      >
        Add Project
      </Button>
    </>
  );
}

export default Project;
