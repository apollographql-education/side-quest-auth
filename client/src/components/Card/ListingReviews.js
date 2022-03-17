import PropTypes from 'prop-types';
import React from 'react';
import TripReviews from '../TripReviews';

export function ListingReviews({title, isPast, trip, mutationConfig}) {
  const {locationReview, hostReview, guestReview} = trip;
  const {mutation, mutationOptions} = mutationConfig;

  return (
    <TripReviews
      ratingKey={title}
      location={title}
      locationReview={locationReview}
      hostReview={hostReview}
      guestReview={guestReview}
      isPastTrip={isPast}
      isHost={trip.listing.host.id === localStorage.getItem('token')}
      mutation={mutation}
      mutationOptions={mutationOptions}
    />
  );
}

ListingReviews.propTypes = {
  isPast: PropTypes.bool,
  title: PropTypes.string.isRequired,
  trip: PropTypes.object,
  mutationConfig: PropTypes.object.isRequired
};
