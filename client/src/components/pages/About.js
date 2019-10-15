import React from 'react';
import { Container } from 'reactstrap';

const About = () => {
  return (
    <Container className='fade-in card text-center mt-2 pt-2'>
      <p>Author: Michael Ionov</p>
      This is a full-stack app built with MongoDB, Express, React and Node.
      <p>
        Source code can be found here
        <a href='https://github.com/invm/storefront'> GitHub</a>
      </p>
    </Container>
  );
};

export default About;
