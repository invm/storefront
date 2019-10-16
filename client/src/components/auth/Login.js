import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { Form, FormGroup, Label, Input, Container, Spinner } from 'reactstrap';

const Login = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const [user, setUser] = useState({
    password: '',
    email: ''
  });
  const { setAlert, alerts, removeAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated, loading } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      if (alerts.length > 0) removeAlert(alerts[0].id);
      props.history.push('/');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill all fields', 'danger');
    } else {
      login({
        password,
        email
      });
    }
  };

  const { password, email } = user;
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      className='fade-in card px-1 py-2 mt-2'
    >
      <div className='form-container'>
        <h1 className='text-center'>
          Account <span className='text-primary'>Login</span>
        </h1>
        <Form onSubmit={onSubmit} className='my-2'>
          <FormGroup row>
            <Label for='email'>Email</Label>
            <Input
              type='email'
              value={email}
              onChange={onChange}
              name='email'
              id='email'
            />
          </FormGroup>
          <FormGroup row>
            <Label for='password'>Password</Label>
            <Input
              type='password'
              name='password'
              onChange={onChange}
              value={password}
              id='password'
            />
          </FormGroup>

          {loading ? (
            <FormGroup row>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Spinner
                  className='fade-in'
                  style={{ width: '7rem', height: '7rem' }}
                  color='info'
                />
              </div>
            </FormGroup>
          ) : (
            <FormGroup row>
              <Input
                type='submit'
                className='btn btn-primary'
                style={{ fontSize: '2rem' }}
                onClick={onSubmit}
                value='Login'
              />
            </FormGroup>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default Login;
