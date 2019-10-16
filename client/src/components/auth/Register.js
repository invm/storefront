import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { Form, FormGroup, Label, Input, Container, Spinner } from 'reactstrap';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    register,
    error,
    clearErrors,
    isAuthenticated,
    loading
  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Email already registered, try another one.') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    name: '',
    company: '',
    password: '',
    password2: '',
    email: ''
  });

  const onChange = e => setUser({ ...user, [e.target.id]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '')
      setAlert('Please enter all fields', 'danger');
    else if (password !== password2)
      setAlert(
        'Passwords should be the same and at least 6 characters',
        'warning'
      );
    else {
      register({
        name,
        company,
        password,
        email
      });
    }
  };

  const { name, company, password, password2, email } = user;
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
          Account <span className='text-primary'>Register</span>
        </h1>
        <Form onSubmit={onSubmit} className='my-2'>
          <FormGroup row>
            <Label for='name'>Name</Label>
            <Input
              onChange={onChange}
              type='text'
              name='name'
              value={name}
              id='name'
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for='company'>Company</Label>
            <Input
              type='text'
              name='company'
              onChange={onChange}
              value={company}
              id='company'
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for='email'>Email</Label>
            <Input
              type='email'
              value={email}
              onChange={onChange}
              name='email'
              id='email'
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for='password'>Password</Label>
            <Input
              type='password'
              onChange={onChange}
              value={password}
              id='password'
              minLength='6'
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for='password2'>Confirm password</Label>
            <Input
              type='password'
              onChange={onChange}
              value={password2}
              id='password2'
              required
              minLength='6'
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

export default Register;
