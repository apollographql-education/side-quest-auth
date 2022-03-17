import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Link,
  StackDivider,
  Text,
  VStack,
  Wrap
} from '@chakra-ui/react';
import {
  Content,
  Image,
  InnerContainer,
  ListingReviews,
  OuterContainer
} from './Card';
import {IoChevronBack} from 'react-icons/io5';

import {HOST_BOOKINGS, SUBMIT_REVIEW} from '../pages/past-bookings';
import {Link as RouterLink, useLocation, useParams} from 'react-router-dom';

function Booking({booking, listingTitle, isPast}) {
  const hasHostReview = booking.guestReview !== null;
  const title = booking.listing?.title || listingTitle;
  const graphqlVariables = {listingId: booking.listing.id, status: 'COMPLETED'};

  if (isPast) {
    return (
      <OuterContainer p={2}>
        <InnerContainer>
          <VStack>
            <Image
              isAvatar
              src={booking.guest.profilePicture}
              name={booking.guest.name}
              w="200px"
              h="auto"
              alt={booking.guest.name}
            />
            <Content
              title={booking.guest.name}
              checkInDate={booking.checkInDate}
              checkOutDate={booking.checkOutDate}
              hasReviews={hasHostReview}
            >
              {booking.status === 'CURRENT' ? (
                <Box w="max-content">
                  <Text fontWeight="semibold" fontStyle="italic">
                    Current guest
                  </Text>
                </Box>
              ) : null}
            </Content>
          </VStack>
          <ListingReviews
            title={title}
            isPast={isPast}
            trip={booking}
            mutationConfig={{
              mutation: SUBMIT_REVIEW,
              mutationOptions: {
                variables: {
                  ...graphqlVariables,
                  bookingId: booking.id
                },
                // NOTE: for the scope of this project, we've opted for the simpler refetch approach
                // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
                refetchQueries: [
                  {
                    query: HOST_BOOKINGS,
                    variables: graphqlVariables
                  }
                ]
              }
            }}
          />
        </InnerContainer>
      </OuterContainer>
    );
  } else {
    return (
      <OuterContainer p={2}>
        <InnerContainer>
          <Wrap align="center" spacing="4">
            <Image
              isAvatar
              src={booking.guest.profilePicture}
              name={booking.guest.name}
              w="100px"
              h="auto"
              alt={booking.guest.name}
            />
            <Content
              title={booking.guest.name}
              checkInDate={booking.checkInDate}
              checkOutDate={booking.checkOutDate}
            >
              {booking.status === 'CURRENT' ? (
                <Box w="max-content">
                  <Text fontWeight="semibold" fontStyle="italic">
                    Current guest
                  </Text>
                </Box>
              ) : null}
            </Content>
          </Wrap>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

Booking.propTypes = {
  booking: PropTypes.object,
  isPast: PropTypes.bool,
  listingTitle: PropTypes.string
};

export default function Bookings({title, bookings, isPast = false}) {
  const {pathname} = useLocation();
  const {id} = useParams();

  return (
    <>
      <Flex
        alignItems="center"
        mb="4"
        color="indigo.dark"
        fontWeight="semibold"
      >
        <IoChevronBack />
        <Link as={RouterLink} to={'/listings'} fontWeight="semibold">
          Back to listings
        </Link>
      </Flex>
      <Heading as="h1" mb={4}>
        {title}
      </Heading>
      <Box
        as="nav"
        w="full"
        mb="4"
        fontSize="lg"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <Link
          as={RouterLink}
          to={`/listing/${id}/bookings`}
          mr="8"
          fontWeight={
            pathname === `/listing/${id}/bookings` ? 'bold' : 'normal'
          }
          color={
            pathname === `/listing/${id}/bookings` ? 'indigo.dark' : 'gray.dark'
          }
        >
          Upcoming Bookings
        </Link>
        <Link
          as={RouterLink}
          to={`/listing/${id}/past-bookings`}
          fontWeight={
            pathname === `/listing/${id}/past-bookings` ? 'bold' : 'normal'
          }
          color={
            pathname === `/listing/${id}/past-bookings`
              ? 'indigo.dark'
              : 'gray.dark'
          }
        >
          Past Bookings
        </Link>
      </Box>

      {bookings.length ? (
        <VStack spacing="4" divider={<StackDivider />}>
          {bookings.map((booking, i) => {
            return (
              <Booking
                key={`${title}-${i}`}
                booking={booking}
                listingTitle={title}
                isPast={isPast}
              />
            );
          })}
        </VStack>
      ) : (
        <Text textAlign="center">
          You have no {isPast ? 'previous' : 'current or upcoming'} bookings
        </Text>
      )}
    </>
  );
}

Bookings.propTypes = {
  title: PropTypes.string.isRequired,
  bookings: PropTypes.array.isRequired,
  isPast: PropTypes.bool
};
