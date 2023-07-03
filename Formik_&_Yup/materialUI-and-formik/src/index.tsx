import * as React from 'react';
import {render} from 'react-dom';
import {Formik, Form, Field} from 'formik';
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  FormControlLabel,
  Typography,
  AutocompleteRenderInputParams,
  ToggleButton,
} from '@mui/material';
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import MuiTextField from '@mui/material/TextField';
import {
  Autocomplete,
  TextField,
  Select,
  Switch,
  ToggleButtonGroup,
} from 'formik-mui';
import {TimePicker, DatePicker, DateTimePicker} from 'formik-mui-lab';

import {UpperCasingTextField} from './UpperCasingTextField';
import {top100Films, ranges} from './data';

interface Values {
  email: string;
}

const App = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      select: '0-20',
      tags: [],
      rememberMe: true,
      date: new Date(),
      time: new Date(),
      dateTime: new Date(),
      toggle: [],
      autocomplete: [],
    }}
    validate={(values) => {
      const errors: Partial<Values> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={(values, {setSubmitting}) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
  >
    {({values, submitForm, resetForm, isSubmitting, touched, errors}) => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form>
          <Box margin={1}>
            <Field
              component={UpperCasingTextField}
              name="email"
              type="email"
              label="Email"
              helperText="Please Enter Email"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
          </Box>
          <Box margin={1}>
            <FormControlLabel
              control={
                <Field component={Switch} type="checkbox" name="rememberMe" />
              }
              label="Remember Me"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="select"
              label="With Select"
              select
              variant="standard"
              helperText="Please select Range"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {ranges.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
          </Box>
          <Box margin={1}>
            <FormControl sx={{minWidth: 120}}>
              <Field
                component={Select}
                type="text"
                label="Tags"
                name="tags"
                multiple={true}
                inputProps={{name: 'tags', id: 'tags'}}
              >
                <MenuItem value="dogs">Dogs</MenuItem>
                <MenuItem value="cats">Cats</MenuItem>
                <MenuItem value="rats">Rats</MenuItem>
                <MenuItem value="snakes">Snakes</MenuItem>
              </Field>
            </FormControl>
          </Box>
          {isSubmitting && <LinearProgress />}
          <Box margin={1}>
            <Field component={TimePicker} name="time" label="Time" />
          </Box>
          <Box margin={1}>
            <Field component={DatePicker} name="date" label="Date" />
          </Box>
          <Box margin={1}>
            <Field
              component={DateTimePicker}
              name="dateTime"
              label="Date Time"
            />
          </Box>
          <Box margin={1}>
            <Typography>Toggle button</Typography>
            <Field component={ToggleButtonGroup} name="toggle" type="checkbox">
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ToggleButton>
              <ToggleButton value="justify" aria-label="justified" disabled>
                <FormatAlignJustifyIcon />
              </ToggleButton>
            </Field>
          </Box>
          <Box margin={1}>
            <Field
              name="autocomplete"
              multiple
              component={Autocomplete}
              options={top100Films}
              getOptionLabel={(option: any) => option.title}
              style={{width: 300}}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <MuiTextField
                  {...params}
                  name="autocomplete"
                  error={touched['autocomplete'] && !!errors['autocomplete']}
                  helperText={touched['autocomplete'] && errors['autocomplete']}
                  label="Autocomplete"
                  variant="outlined"
                />
              )}
            />
          </Box>
          <Box margin={1}>
            <Button
              sx={{margin: 1}}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
            <Button
              sx={{margin: 1}}
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              onClick={() => {
                resetForm();
              }}
            >
              Reset
            </Button>
          </Box>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      </LocalizationProvider>
    )}
  </Formik>
);

render(<App />, document.getElementById('root'));
