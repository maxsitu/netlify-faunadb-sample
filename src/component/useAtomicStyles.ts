import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  fontWeightBold: {
    fontWeight: '700!important' as any,
  },
  display4: {
    fontSize: '1.7rem',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  textBlack50: {
    color: 'rgba(59,62,102,.5)',
  },
  w50: {
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      minWidth: '50%',
    },
  },
  mb1: {
    marginBottom: '.25rem',
  },
  mb2: {
    marginBottom: '.5rem',
  },
  mb3: {
    marginBottom: '1rem',
  },
  mb4: {
    marginBottom: '1.5rem',
  },
  pb1: {
    paddingBottom: '.25rem',
  },
  pb2: {
    paddingBottom: '.5rem',
  },
  pb3: {
    paddingBottom: '1rem',
  },
  pb4: {
    paddingBottom: '1.5rem',
  },
  pb5: {
    paddingBottom: '3rem',
  },
  pt1: {
    paddingTop: '.25rem',
  },
  pt2: {
    paddingTop: '.5rem',
  },
  pt3: {
    paddingTop: '1rem',
  },
  pt4: {
    paddingTop: '1.5rem',
  },
  pt5: {
    paddingTop: '3rem',
  },
  textCenter: {
    textAlign: 'center',
  },
}));
