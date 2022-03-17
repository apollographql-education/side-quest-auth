import PropTypes from 'prop-types';

import BookStay from '../components/BookStay';
import Layout from '../layouts/Layout';
import LocationType from '../components/LocationType';
import QueryResult from '../components/QueryResult';
import React from 'react';
import Stars from '../components/Stars';
import startCase from 'lodash/startCase';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Wrap
} from '@chakra-ui/react';
import {GUEST_TRIPS} from './trips';
import {IoBedOutline, IoCreate} from 'react-icons/io5';
import {Link, useParams} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import {useUser} from '../utils';

export const LISTING = gql`
  query GetListing($id: ID!) {
    listing(id: $id) {
      id
      title
      description
      photoThumbnail
      numOfBeds
      costPerNight
      locationType
      amenities {
        name
        category
      }
      overallRating
      reviews {
        text
        author {
          id
          name
          profilePicture
        }
        rating
      }
      host {
        id
        name
        profilePicture
        profileDescription
        overallRating
      }
      bookings {
        checkInDate
        checkOutDate
      }
    }
  }
`;

function AmenityList({amenities, category}) {
  const title = startCase(category.toLowerCase());
  return (
    <Stack spacing="3">
      <Text fontWeight="semibold">{title}</Text>
      <Wrap spacing="2">
        {amenities.map(amenity => (
          <Text
            key={amenity}
            border="1px"
            borderColor="gray.200"
            py="2"
            px="3"
            borderRadius="4"
          >
            {amenity}
          </Text>
        ))}
      </Wrap>
    </Stack>
  );
}

AmenityList.propTypes = {
  category: PropTypes.string,
  amenities: PropTypes.array
};

export default function Listings() {
  const {id} = useParams();
  const {user} = useUser();
  const {loading, error, data} = useQuery(LISTING, {variables: {id}});

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {data => {
          const {
            id,
            title,
            description,
            numOfBeds,
            locationType,
            photoThumbnail,
            amenities,
            host,
            reviews,
            overallRating,
            costPerNight,
            bookings
          } = data?.listing;

          const amenitiesByCategory = amenities.reduce((acc, amenity) => {
            if (acc[amenity.category]) {
              acc[amenity.category] = [...acc[amenity.category], amenity.name];
            } else {
              acc[amenity.category] = [amenity.name];
            }
            return acc;
          }, {});

          return (
            <Stack direction="column" mb="12" spacing="6">
              <Flex justifyContent="space-between">
                <Stack>
                  <Heading as="h1" size="lg">
                    {title}
                  </Heading>
                  {overallRating ? (
                    <Stars size={20} rating={overallRating} />
                  ) : (
                    <Text>Uh-oh, this place has no reviews yet!</Text>
                  )}
                </Stack>
                {host && user && host.id === user.id && (
                  <Button
                    as={Link}
                    to={`/listing/${id}/edit`}
                    rightIcon={<IoCreate size={20} />}
                    ml="4"
                  >
                    Edit your listing
                  </Button>
                )}
              </Flex>
              <Image
                src={photoThumbnail}
                alt={title}
                objectFit="cover"
                width="100%"
                borderRadius={8}
              />
              <Flex direction="row" flexWrap="wrap">
                <Stack flex="1" direction="column" spacing="6" mr={8}>
                  <Stack spacing="4">
                    <Heading as="h2" size="md">
                      Details
                    </Heading>
                    <HStack spacing="16" align="top">
                      <Stack spacing="2">
                        <Text fontWeight="bold">Number of beds</Text>
                        <Stack align="center" direction="row">
                          <IoBedOutline size={22} />
                          <Text ml="1">{numOfBeds} beds</Text>
                        </Stack>
                      </Stack>
                      <Stack spacing="2">
                        <Text fontWeight="bold">Location Type </Text>
                        <Stack align="center" direction="row">
                          <LocationType locType={locationType} size="22px" />
                          <Text casing="capitalize" ml="1">
                            {locationType}
                          </Text>
                        </Stack>
                      </Stack>
                    </HStack>
                  </Stack>
                  <Divider />
                  <Stack>
                    <Heading as="h2" size="md">
                      About this location
                    </Heading>
                    <Text fontSize="lg" fontWeight="regular" mr="1">
                      {description}
                    </Text>
                  </Stack>
                  <Divider />
                  <Box>
                    <Heading as="h2" size="md" mb="2">
                      Amenities
                    </Heading>
                    <Stack spacing="3">
                      {Object.entries(amenitiesByCategory).map(
                        ([key, value]) => (
                          <AmenityList
                            category={key}
                            amenities={value}
                            key={key}
                          />
                        )
                      )}
                    </Stack>
                  </Box>
                  <Divider />
                  <Box>
                    <Heading as="h2" size="md" mb="2">
                      Meet your host
                    </Heading>
                    <Flex align="flex-start" justify="space-between">
                      <Stack>
                        <Flex>
                          <Text fontWeight="semibold" mr={4}>
                            {host.name}
                          </Text>
                          <Stars size={16} rating={host.overallRating} />
                        </Flex>
                        <Text>{host.profileDescription}</Text>
                      </Stack>
                      <Avatar
                        name="profile"
                        size="md"
                        borderColor="white"
                        borderWidth="1px"
                        src={host.profilePicture}
                        ml={4}
                        bg="gray.50"
                      />
                    </Flex>
                  </Box>
                  <Divider />
                  <Box>
                    <Heading as="h2" size="md" mb="6">
                      What other space travelers have to say about this stay
                    </Heading>
                    <Stack direction="column" spacing="6">
                      {reviews.length === 0 ? (
                        <Text>Uh-oh, this place has no reviews yet!</Text>
                      ) : (
                        reviews.map(({text, author, rating}) => (
                          <Flex align="flex-start" key={author.id}>
                            <Stack>
                              <Avatar
                                name="profile"
                                size="md"
                                borderColor="white"
                                borderWidth="1px"
                                src={author.profilePicture}
                                bg="gray.50"
                              />
                            </Stack>
                            <Stack direction="column" spacing="1" pl={4}>
                              <HStack align="flex-start">
                                <Heading size="sm">{author.name}</Heading>
                                <Stars size={16} rating={rating} />
                              </HStack>
                              <Text>{text}</Text>
                            </Stack>
                          </Flex>
                        ))
                      )}
                    </Stack>
                  </Box>
                </Stack>

                <BookStay
                  costPerNight={costPerNight}
                  bookings={bookings}
                  listingId={id}
                  refetchQueries={[LISTING, {query: GUEST_TRIPS}]}
                  userRole={user?.__typename}
                />
              </Flex>
            </Stack>
          );
        }}
      </QueryResult>
    </Layout>
  );
}
