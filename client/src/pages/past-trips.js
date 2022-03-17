import Layout from '../layouts/Layout';
import QueryResult from '../components/QueryResult';
import React from 'react';
import Trips from '../components/Trips';
import {Center, Spinner} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';

export const PAST_GUEST_TRIPS = gql`
  query GetPastTrips {
    pastGuestBookings {
      id
      checkInDate
      checkOutDate
      status
      listing {
        title
        photoThumbnail
        host {
          id
        }
      }
      guest {
        id
      }
      locationReview {
        id
        text
        rating
      }
      hostReview {
        id
        text
        rating
      }
      guestReview {
        id
        text
        rating
      }
    }
  }
`;

export default function PastTrips() {
  const {loading, error, data} = useQuery(PAST_GUEST_TRIPS);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }
  if (error) {
    return <div>uhoh error! {error.message}</div>;
  }

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {({pastGuestBookings}) => <Trips trips={pastGuestBookings} isPast />}
      </QueryResult>
    </Layout>
  );
}
