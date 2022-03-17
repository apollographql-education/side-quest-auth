import Layout from '../layouts/Layout';
import QueryResult from '../components/QueryResult';
import React from 'react';
import Stars from '../components/Stars';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  StackDivider,
  Text,
  VStack
} from '@chakra-ui/react';
import {HOST_LISTINGS} from '../utils';
import {IoAddCircleOutline} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';

const LINK_PROPS = {
  as: Link,
  mr: '4',
  color: 'indigo.dark',
  fontWeight: 'semibold',
  _hover: {
    textDecoration: 'underline'
  }
};

export default function Listings() {
  const {loading, error, data} = useQuery(HOST_LISTINGS);

  return (
    <Layout>
      <Flex w="full" justifyContent="space-between">
        <Heading as="h1" mb="4">
          My listings
        </Heading>
        <Button
          as={Link}
          to="/listings/create"
          leftIcon={<IoAddCircleOutline />}
          mb="4"
        >
          Add
        </Button>
      </Flex>
      <QueryResult loading={loading} error={error} data={data}>
        {({hostListings}) => {
          return (
            <VStack
              spacing="4"
              divider={<StackDivider borderColor="gray.200" />}
            >
              {hostListings.map((listingData, index) => {
                const {
                  id,
                  title,
                  photoThumbnail,
                  overallRating,
                  numberOfUpcomingBookings
                } = listingData;
                return (
                  <Box key={`${title}-${index}`} overflow="hidden" w="full">
                    <Flex direction="row" flexWrap="wrap">
                      <Image
                        src={photoThumbnail}
                        alt={title}
                        objectFit="cover"
                        w="250px"
                        h="140px"
                        borderRadius={4}
                      />
                      <Flex direction="column" px="4">
                        <Flex direction="column" h="full">
                          <Heading as="h2" size="md">
                            {title}
                          </Heading>
                          <Flex flexWrap="wrap" mt={4}>
                            <Text mr={4}>
                              {numberOfUpcomingBookings} bookings
                            </Text>
                            {overallRating ? (
                              <Stars size={20} rating={overallRating} />
                            ) : (
                              <Text>No reviews yet</Text>
                            )}
                          </Flex>
                        </Flex>
                        <Flex>
                          <Box {...LINK_PROPS} to={`/listing/${id}/edit`}>
                            Edit
                          </Box>
                          <Box {...LINK_PROPS} to={`/listing/${id}`}>
                            View
                          </Box>
                          <Box {...LINK_PROPS} to={`/listing/${id}/bookings`}>
                            Manage Bookings
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                );
              })}
            </VStack>
          );
        }}
      </QueryResult>
    </Layout>
  );
}
