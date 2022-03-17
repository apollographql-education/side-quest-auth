import PropTypes from 'prop-types';
import React from 'react';
import {Wrap} from '@chakra-ui/react';

export function InnerContainer({children, ...props}) {
  return (
    <Wrap
      boxSizing="border-box"
      w="full"
      spacing="8"
      alignItems="flex-start"
      {...props}
    >
      {children}
    </Wrap>
  );
}

InnerContainer.propTypes = {
  children: PropTypes.node
};
