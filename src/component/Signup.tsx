import React from 'react';
import * as yup from 'yup';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { User, useIdentityContext } from 'react-netlify-identity';
import useLoading from 'hook/useLoading';
import useAtomicStyles from './useAtomicStyles';

interface SignupProps {
  onSignup?: (user: User) => void;
}

const singupSchema = yup.object().shape({
  fullName: yup.string().required('This field is required.'),
  email: yup
    .string()
    .required('This field is required.')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('This field is required.')
    .min(8, 'Password cannot be shorter than 8 characters')
    .max(20, 'Password cannot be longer than 20 characters'),
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Signup({ onSignup }: SignupProps) {
  const { signupUser } = useIdentityContext();
  const [isLoading, load] = useLoading();
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);
  const handleMouseDownPassword = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    [],
  );
  const classes = useAtomicStyles();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: singupSchema,
    onSubmit: async (values) => {
      const fullName = values.fullName;
      const email = values.email;
      const password = values.password;
      let user;
      try {
        user = await load(
          signupUser(email, password, {
            full_name: fullName,
            signupSource: 'netlify-faunadb-sample',
          }),
        );
        if (onSignup) {
          onSignup(user);
        }
      } catch (error) {
        let msg = 'Error with signup';
        if (error.json) {
          msg = error.json.msg || error.json.error_description;
        }
        setAlertMessage(msg);
      }
      if (process.env.NODE_ENV !== 'production') {
        console.log('Success! Signed up', user);
      }
    },
  });
  const { errors, values, touched, handleSubmit, handleChange } = formik;
  const errorText = (field: string): string =>
    (touched[field] && errors[field]) || '';

  return (
    <div className={clsx(classes.pt5, classes.pb5)}>
      <div className={clsx(classes.textCenter, classes.pt4, classes.pb4)}>
        <Typography
          variant="h5"
          gutterBottom
          className={clsx(
            classes.mb1,
            classes.display4,
            classes.fontWeightBold,
          )}
        >
          Sign Up
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.textBlack50}
        >
          Start exploring new features right away
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={classes.mb4}>
          <TextField
            id="fullName"
            error={!!errorText('fullName')}
            helperText={errorText('fullName')}
            value={values.fullName}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            disabled={isLoading}
            label="Full Name"
            defaultValue=""
            tabIndex={0}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={classes.mb4}>
          <TextField
            id="email"
            error={!!errorText('email')}
            helperText={errorText('email')}
            value={values.email}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            disabled={isLoading}
            label="Email"
            defaultValue=""
            tabIndex={1}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.mb3}>
          <TextField
            id="password"
            type={showPassword ? 'text' : 'password'}
            error={!!errorText('password')}
            helperText={errorText('password')}
            value={values.password}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            disabled={isLoading}
            label="Password"
            defaultValue=""
            tabIndex={2}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockTwoToneIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={clsx(classes.textCenter, classes.pb4, classes.pt4)}>
          <Button
            variant="contained"
            color="primary"
            className={classes.w50}
            type="submit"
          >
            Sign up
          </Button>
        </div>
      </form>
      <Snackbar
        open={!!alertMessage}
        autoHideDuration={6000}
        onClose={() => setAlertMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertMessage(null)} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
