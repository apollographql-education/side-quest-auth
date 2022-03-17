import Nav from '../components/Nav';
import PropTypes from 'prop-types';
import React from 'react';
import {Container} from '@chakra-ui/react';

export default function Layout({
  noNav,
  children,
  containerSize = 'container.xl',
  ...props
}) {
  return (
    <>
      {!noNav && <Nav />}
      <Container maxW={containerSize} {...props} mb={24}>
        {children}
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  noNav: PropTypes.bool,
  containerSize: PropTypes.string
};
