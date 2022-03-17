import Layout from '../layouts/Layout';
import ListingForm from '../components/ListingForm';
import React from 'react';
import {Button} from '@chakra-ui/react';
import {HOST_LISTINGS, LISTING_FRAGMENT} from '../utils';
import {IoArrowBackOutline} from 'react-icons/io5';
import {Link, useHistory} from 'react-router-dom';
import {gql} from '@apollo/client';

export const CREATE_LISTING = gql`
  mutation CreateListingMutation($listing: CreateListingInput!) {
    createListing(listing: $listing) {
      success
      message
      listing {
        ...ListingFragment
        amenities {
          id
          category
          name
        }
      }
    }
  }
  ${LISTING_FRAGMENT}
`;

export default function CreateListing() {
  const history = useHistory();
  return (
    <Layout>
      <Button as={Link} to="/listings" leftIcon={<IoArrowBackOutline />} mb="4">
        Back to listings
      </Button>
      <ListingForm
        listingData={{
          title: '',
          description: '',
          numOfBeds: 1,
          locationType: '',
          photoThumbnail: '',
          amenities: [],
          costPerNight: 100
        }}
        mutation={CREATE_LISTING}
        mutationOptions={{
          onCompleted: () => {
            history.push('/listings');
          },
          update: (cache, {data}) => {
            // update the cache to add our new listing
            // https://www.apollographql.com/docs/react/api/react/hooks/#update
            const query = cache.readQuery({query: HOST_LISTINGS});

            if (query?.hostListings) {
              cache.writeQuery({
                query: HOST_LISTINGS,
                data: {
                  hostListings: [
                    ...query.hostListings,
                    data.createListing.listing
                  ]
                }
              });
            }
          }
        }}
      />
    </Layout>
  );
}
