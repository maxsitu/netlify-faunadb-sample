import React from 'react';
import clsx from 'clsx';
import { Settings, useIdentityContext } from 'react-netlify-identity';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import useAtomicStyles from './useAtomicStyles';
import { ReactComponent as GoogleIcon } from 'icon/google-logo.svg';
import { ReactComponent as GithubIcon } from 'icon/github-logo.svg';
import { ReactComponent as GitLabIcon } from 'icon/gitlab-logo.svg';
import { ReactComponent as BitbucketIcon } from 'icon/bitbucket-logo.svg';

interface ProviderProps {
  settings: Settings;
  provider: string;
}

type Provider = 'bitbucket' | 'github' | 'gitlab' | 'google';

const providerIconMap: Record<Provider, any> = {
  gitlab: GitLabIcon,
  github: GithubIcon,
  google: GoogleIcon,
  bitbucket: BitbucketIcon,
};

function ProviderButton({ settings, provider }: ProviderProps) {
  const external = settings.external as { [key: string]: {} };
  if (!external[provider.toLowerCase()]) return null;
  const { loginProvider } = useIdentityContext();
  const providerName = provider.toLowerCase() as Provider;
  const click = () => loginProvider(providerName);

  const classes = useAtomicStyles();

  return (
    <div className={clsx(classes.textCenter, classes.pb1, classes.pt1)}>
      <Button
        onClick={click}
        variant="contained"
        color="primary"
        className={classes.w50}
        startIcon={
          <SvgIcon component={providerIconMap[provider.toLowerCase()]} />
        }
      >
        {provider}
      </Button>
    </div>
  );
}

const useProvidersStyle = makeStyles({
  root: {
    '& .MuiButton-startIcon': {
      position: 'absolute',
      left: '1rem',
    },
  },
});

export default function Providers() {
  const { settings } = useIdentityContext();

  const hasProviders = Object.entries(settings.external).some(
    ([k, v]) => ['github', 'gitlab', 'bitbucket', 'google'].includes(k) && v,
  );

  if (!hasProviders) return null;
  const hostname = window?.location?.hostname;
  const isLocalhost =
    hostname === 'localhost' ||
    hostname === '[::1]' ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/);

  const classes = useAtomicStyles();
  const providersClasses = useProvidersStyle();

  return (
    <div className={clsx(classes.pt5, classes.pb5, providersClasses.root)}>
      {isLocalhost && (
        <Alert severity="error">
          <AlertTitle>Testing Environment</AlertTitle>
          Testing providers on localhost won't work because OAuth redirects to
          your production site.
        </Alert>
      )}
      <ProviderButton settings={settings} provider="Google" />
      <ProviderButton settings={settings} provider="GitHub" />
      <ProviderButton settings={settings} provider="GitLab" />
      <ProviderButton settings={settings} provider="Bitbucket" />
    </div>
  );
}
