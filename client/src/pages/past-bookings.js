import Bookings from '../components/Bookings';
import Layout from '../layouts/Layout';
import QueryResult from '../components/QueryResult';
import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

export const SUBMIT_REVIEW = gql`
  mutation SubmitReview($bookingId: ID!, $guestReview: ReviewInput!) {
    submitGuestReview(bookingId: $bookingId, guestReview: $guestReview) {
      success
      message
      guestReview {
        id
        text
        rating
      }
    }
  }
`;

export const HOST_BOOKINGS = gql`
  query GetBookingsForHostListing($listingId: ID!, $status: BookingStatus) {
    listing(id: $listingId) {
      id
      title
    }
    bookingsForListing(listingId: $listingId, status: $status) {
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
      locationReview {
        id
        rating
        text
      }
      hostReview {
        id
        rating
        text
      }
      guestReview {
        id
        rating
        text
      }
    }
  }
`;

export default function HostBookings() {
  const {id} = useParams();
  const {loading, error, data} = useQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id,
      status: 'COMPLETED'
    }
  });

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {({bookingsForListing, listing}) => (
          <Bookings
            title={listing.title}
            bookings={bookingsForListing}
            isPast
          />
        )}
      </QueryResult>
    </Layout>
  );
}
