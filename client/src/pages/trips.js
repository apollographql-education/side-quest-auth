import CurrentTrips from '../components/Trips';
import Layout from '../layouts/Layout';
import QueryResult from '../components/QueryResult';
import React from 'react';
import {gql, useQuery} from '@apollo/client';

export const GUEST_TRIPS = gql`
  query GetGuestTrips {
    upcomingGuestBookings {
      checkInDate
      checkOutDate
      status
      listing {
        title
        photoThumbnail
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

export default function Trips() {
  const {loading, error, data} = useQuery(GUEST_TRIPS);

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {({upcomingGuestBookings}) => (
          <CurrentTrips trips={upcomingGuestBookings} />
        )}
      </QueryResult>
    </Layout>
  );
}
