import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '@chakra-ui/react';

export function OuterContainer({children, ...props}) {
  return (
    <Box w="full" {...props}>
      {children}
    </Box>
  );
}

OuterContainer.propTypes = {
  children: PropTypes.node
};
