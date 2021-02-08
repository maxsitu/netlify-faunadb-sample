import React from 'react';
import clsx from 'clsx';
import { useIdentityContext } from 'react-netlify-identity';
import useLoading from 'hook/useLoading';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import useAtomicStyles from './useAtomicStyles';

interface LogoutProps {
  onLogout?: () => void;
}

export default function Logout({ onLogout }: LogoutProps) {
  const identity = useIdentityContext();
  const [isLoading, load] = useLoading();
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);

  const name = identity?.user?.user_metadata?.full_name || 'NoName';
  const classes = useAtomicStyles();

  const logout = async () => {
    try {
      await load(identity.logoutUser());
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      let msg = 'Error with login';
      if (error.json) {
        msg = error.json.msg || error.json.error_description;
      }
      setAlertMessage(msg);
    }
  };

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
          Logged in
        </Typography>
      </div>
      <form onSubmit={logout}>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.textBlack50}
        >
          Logged in as <strong>{name}</strong>
        </Typography>
        <div className={clsx(classes.textCenter, classes.pb4, classes.pt4)}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isLoading || !identity?.user}
          >
            Log out
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
