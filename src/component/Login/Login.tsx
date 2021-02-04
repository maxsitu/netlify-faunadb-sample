/** @jsxImportSource @emotion/core */
import { jsx } from '@emotion/core';
import * as yup from 'yup';
import { useFormik, FormikConfig } from 'formik';
import { InputGroup, Input, Toolbar, Button, Text, Layer, useTheme } from 'sancho';
import useLoading from '@Hook/useLoading';
import { useIdentityContext, User } from 'react-netlify-identity'

interface LoginProps {
  onLogin?: (user?: User) => void;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const loginSchema = yup.object().shape({
  email: 
    yup.string()
       .required('This field is required.')
       .email('Please enter a valid email address'),
  password: 
    yup.string()
    .required('This field is required.')
    .min(8, 'Password cannot be shorter than 8 characters')
    .max(20, 'Password cannot be longer than 20 characters'),
});


export default function Login({ onLogin }: LoginProps) {
  const { loginUser } = useIdentityContext();
  const [isLoading, load] = useLoading();

  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    // validate: () => ({
    //   password: "It's always complaining"
    // }),
    onSubmit: async values => {
      const email = values.email;
      const password = values.password;
      // const user = await load(loginUser(email, password, true));
      const user = await load(Promise.resolve({firstName: 'John', lastName: 'Smith'}));
      if (process.env.NODE_ENV !== 'production') {
        console.log('Success! Logged in', user);
      }
      if (onLogin) {
        onLogin(user);
      } else {
        await sleep(4000);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  const { errors, values, touched, handleSubmit, handleChange } = formik;

  return (
    <div css={{ maxWidth: "400px" }}>
      <Layer>
        <Toolbar
          css={{
            justifyContent: "center",
            borderBottom: `1px solid ${theme.colors.border.default}`
          }}>
          <Text gutter={false} variant="h4">
            Sign in to Site
          </Text>
        </Toolbar>
        <form css={{ padding: theme.spaces.lg }} onSubmit={handleSubmit}>
          <InputGroup label="Email" error={touched.email && errors.email} >
            <Input
              id="email"
              name="email"
              required
              disabled={isLoading}
              tabIndex={1}
              placeholder="your.name@email.com"
              value={values.email}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup label="Password" error={touched.password && errors.password} >
            <Input
              id="password"
              name="password"
              required
              disabled={isLoading}
              tabIndex={2}
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
          </InputGroup>
          <Button
            css={{ marginTop: "1rem" }}
            size="lg"
            tabIndex={3}
            component="button"
            type="submit"
            block
            intent="primary"
          >
            Sign in
          </Button>
        </form>
      </Layer>
    </div>
  );
}