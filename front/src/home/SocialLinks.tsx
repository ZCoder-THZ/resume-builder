import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
function SocialLinks() {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="portFolio_website"
        render={({ field }) => (
          <TextField
            fullWidth={true}
            sx={{ mb: 2 }}
            label="Portfolio"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="github"
        render={({ field }) => (
          <TextField
            label="Github"
            sx={{ mb: 2 }}
            {...field}
            fullWidth={true}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="linkedin"
        render={({ field }) => (
          <TextField
            fullWidth={true}
            sx={{ mb: 2 }}
            label="Linkedin"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="facebook"
        render={({ field }) => (
          <TextField
            fullWidth={true}
            sx={{ mb: 2 }}
            label="Facebook"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="twitter"
        render={({ field }) => (
          <TextField
            fullWidth={true}
            sx={{ mb: 2 }}
            label="Twitter"
            {...field}
          />
        )}
      />
    </>
  );
}

export default SocialLinks;
