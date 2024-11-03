import { Box, Button, TextField, Typography } from '@mui/material';
import Education from './Education';
import { useForm, Controller, FormProvider } from 'react-hook-form';

import Skill from './Skill';
import Project from './Project';

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type EducationType = { institution: string; degree: string; year: string };
type Skills = string;

type FormData = {
  personalInfo: PersonalInfo;
  education: EducationType[];
  skill: Skills[];
  project: Array<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }>;
};

function ResumeBuilder() {
  const methods = useForm<FormData>({
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      education: [{ institution: '', degree: '', year: '' }],
      skill: [' '],
      project: [
        {
          name: '',
          description: '',
          startDate: '',
          endDate: '',
        },
      ],
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: FormData) => {
    console.log('Resume Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Resume Builder
        </Typography>

        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        {/* <DatePicker /> */}
        <Controller
          name="personalInfo.name"
          control={methods.control}
          render={({ field }) => (
            <TextField fullWidth label="Name" margin="normal" {...field} />
          )}
        />
        <Controller
          name="personalInfo.email"
          control={methods.control}
          render={({ field }) => (
            <TextField fullWidth label="Email" margin="normal" {...field} />
          )}
        />
        <Controller
          name="personalInfo.phone"
          control={methods.control}
          render={({ field }) => (
            <TextField fullWidth label="Phone" margin="normal" {...field} />
          )}
        />
        <Controller
          name="personalInfo.address"
          control={methods.control}
          render={({ field }) => (
            <TextField fullWidth label="Address" margin="normal" {...field} />
          )}
        />

        <Education />
        <Project />
        <Skill />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          sx={{ marginTop: 2 }}
        >
          Generate Resume
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => reset()}
          sx={{ marginTop: 2, marginLeft: 2 }}
        >
          Reset
        </Button>
      </Box>
    </FormProvider>
  );
}

export default ResumeBuilder;
