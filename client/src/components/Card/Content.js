import PropTypes from 'prop-types';
import React from 'react';
import {Flex, Heading, Text} from '@chakra-ui/react';
export function Content({
  title,
  checkInDate,
  checkOutDate,
  children,
  wrapperProps
}) {
  return (
    <>
      <Flex direction="column" alignItems="flex-start" {...wrapperProps}>
        <Heading as="h2" size="md" fontWeight="semibold">
          {title}
        </Heading>
        <Text mt="2">
          {checkInDate} - {checkOutDate}
        </Text>
      </Flex>
      {children}
    </>
  );
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
  hasReviews: PropTypes.bool,
  children: PropTypes.node,
  wrapperProps: PropTypes.object
};
