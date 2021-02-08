import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from 'component/Login';
import Logout from 'component/Logout';
import Signup from 'component/Signup';
import Providers from 'component/Providers';
import { User, useIdentityContext } from 'react-netlify-identity';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface AuthProps {
  onLogin?: (user: User) => void;
  onSignup?: (user: User) => void;
  onLogout?: () => void;
}

function LoginScreen(props: AuthProps) {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        <Login onLogin={props.onLogin} />
        <Providers />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Signup onSignup={props.onSignup} />
      </TabPanel>
      <Providers />
    </div>
  );
}

function LogoutScreen(props: AuthProps) {
  return <Logout onLogout={props.onLogout} />;
}

export default function IdentityWidget(props: AuthProps) {
  const identity = useIdentityContext();
  const isLoggedIn = Boolean(identity?.user);

  return isLoggedIn ? <LogoutScreen {...props} /> : <LoginScreen {...props} />;
}
