import Bookings from '../components/Bookings';
import Layout from '../layouts/Layout';
import QueryResult from '../components/QueryResult';
import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

export const HOST_BOOKINGS = gql`
  query GetBookingsForHostListing(
    $listingId: ID!
    $upcomingStatus: BookingStatus
    $currentStatus: BookingStatus
  ) {
    listing(id: $listingId) {
      id
      title
    }
    upcomingBookings: bookingsForListing(
      listingId: $listingId
      status: $upcomingStatus
    ) {
      id
      listing {
        id
        host {
          id
        }
      }
      guest {
        id
        name
        profilePicture
      }
      checkInDate
      checkOutDate
      status
    }

    currentBooking: bookingsForListing(
      listingId: $listingId
      status: $currentStatus
    ) {
      id
      listing {
        id
        title
        host {
          id
        }
      }
      guest {
        id
        name
        profilePicture
      }
      checkInDate
      checkOutDate
      status
    }
  }
`;

export default function HostBookings() {
  const {id} = useParams();
  const {loading, error, data} = useQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id,
      upcomingStatus: 'UPCOMING',
      currentStatus: 'CURRENT'
    }
  });

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {({upcomingBookings, currentBooking, listing}) => {
          const bookings = [...upcomingBookings, ...currentBooking];

          return <Bookings title={listing.title} bookings={bookings} />;
        }}
      </QueryResult>
    </Layout>
  );
}
