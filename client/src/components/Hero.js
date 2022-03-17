import Background from '../assets/homepage-bg.png';
import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '@chakra-ui/react';
export default function Hero({children}) {
  return (
    <Box bgColor="brand.midnight">
      <Box
        bgImage={Background}
        bgRepeat="no-repeat"
        minH="500px"
        maxW="2000px"
        mx="auto"
        backgroundSize="cover"
      >
        {children}
      </Box>
    </Box>
  );
}

Hero.propTypes = {
  children: PropTypes.node
};
