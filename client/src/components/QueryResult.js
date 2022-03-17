import PropTypes from 'prop-types';
import React from 'react';
import {Center, Spinner} from '@chakra-ui/react';

export default function QueryResult({loading, error, data, children}) {
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (error) {
    return <Center>uhoh error! {error.message}</Center>;
  }

  if (data) {
    return children(data);
  }

  return <Center>Nothing to show</Center>;
}

QueryResult.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
  children: PropTypes.func
};
