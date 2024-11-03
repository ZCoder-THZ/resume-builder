import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function DeleteAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {/* <Alert severity="success">This is a success Alert.</Alert>
      <Alert severity="info">This is an info Alert.</Alert>
      <Alert severity="warning">This is a warning Alert.</Alert> */}
      <Alert variant="filled" severity="error">
        This is an error Alert.
      </Alert>
    </Stack>
  );
}
