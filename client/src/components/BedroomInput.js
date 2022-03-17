import PropTypes from 'prop-types';
import React from 'react';
import {Select, Stack, Text} from '@chakra-ui/react';

export default function BedroomInput({numOfBeds, setNumOfBeds, ...props}) {
  return (
    <Stack direction="column" spacing={2}>
      <Text as="label" fontSize="large" fontWeight="bold">
        Bedrooms
        <Select
          onChange={e => setNumOfBeds(Number(e.target.value))}
          value={numOfBeds}
          mt="2"
          {...props}
        >
          <option disabled="disabled">Number of bedrooms</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5+</option>
        </Select>
      </Text>
    </Stack>
  );
}

BedroomInput.propTypes = {
  numOfBeds: PropTypes.number.isRequired,
  setNumOfBeds: PropTypes.func.isRequired
};
