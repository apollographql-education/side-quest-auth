import PropTypes from 'prop-types';
import QueryResult from './QueryResult';
import React, {useState} from 'react';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import startCase from 'lodash/startCase';
import union from 'lodash/union';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea,
  Wrap
} from '@chakra-ui/react';
import {gql, useMutation, useQuery} from '@apollo/client';

export const AMENITIES = gql`
  query GetAllAmenities {
    listingAmenities {
      id
      category
      name
    }
  }
`;

export default function ListingForm({
  mutation,
  mutationOptions,
  listingId,
  listingData
}) {
  const {loading, error, data} = useQuery(AMENITIES);

  return (
    <QueryResult loading={loading} error={error} data={data}>
      {({listingAmenities}) => (
        <ListingFormBody
          listingId={listingId}
          listingData={listingData}
          mutation={mutation}
          amenities={listingAmenities}
          mutationOptions={mutationOptions}
        />
      )}
    </QueryResult>
  );
}

ListingForm.propTypes = {
  listingData: PropTypes.object.isRequired,
  listingId: PropTypes.string,
  mutation: PropTypes.object.isRequired,
  mutationOptions: PropTypes.object.isRequired
};

function ListingFormBody({
  listingData,
  amenities,
  listingId,
  mutation,
  mutationOptions
}) {
  const listingAmenities = listingData.amenities.map(amenity => amenity.id);
  const allAmenities = amenities.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.category]: acc[curr.category]
        ? [...acc[curr.category], curr]
        : [curr]
    };
  }, {});

  const [formValues, setFormValues] = useState({
    amenities: listingAmenities
  });

  const [submitListing, {loading}] = useMutation(mutation, mutationOptions);

  const handleAmenitiesChange = (e, allAmenitiesInCategory) => {
    if (e.target.type === 'checkbox') {
      if (e.target.id.includes('select-all')) {
        setFormValues(prevState => {
          return {
            ...prevState,
            amenities: union(prevState.amenities, allAmenitiesInCategory) // union merges and deduplicates arrays
          };
        });
      } else {
        if (e.target.checked) {
          setFormValues({
            ...formValues,
            amenities: [...formValues.amenities, e.target.id]
          });
        } else {
          setFormValues(prevState => {
            let updatedAmenities = [...prevState.amenities];
            const indexToRemove = prevState.amenities.indexOf(e.target.id);

            if (indexToRemove > -1) {
              updatedAmenities = prevState.amenities
                .slice(0, indexToRemove)
                .concat(
                  prevState.amenities.slice(
                    indexToRemove + 1,
                    prevState.amenities.length
                  )
                );
            }

            return {...formValues, amenities: updatedAmenities};
          });
        }
      }
    }
  };

  const handleSelectAll = allAmenitiesInCategory => {
    setFormValues(prevState => {
      return {
        ...prevState,
        amenities: union(prevState.amenities, allAmenitiesInCategory) // union merges and deduplicates arrays
      };
    });
  };

  const handleDeselectAll = allAmenitiesInCategory => {
    setFormValues(prevState => {
      const newAmenities = prevState.amenities.filter(
        a => !allAmenitiesInCategory.includes(a)
      );
      return {
        ...prevState,
        amenities: newAmenities
      };
    });
  };
  return (
    <Stack
      as="form"
      onSubmit={e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const uncontrolledInputs = Object.fromEntries(formData);
        uncontrolledInputs.costPerNight = Number(
          uncontrolledInputs.costPerNight
        );
        uncontrolledInputs.numOfBeds = Number(uncontrolledInputs.numOfBeds);

        submitListing({
          variables: {
            listingId,
            listing: {...uncontrolledInputs, ...formValues}
          }
        });
      }}
      spacing="8"
      mb="4"
    >
      <FormControl as="fieldset">
        <Stack spacing="4">
          <FormLabel as="legend" fontSize="xl" fontWeight="bold">
            General information
          </FormLabel>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Title</FormLabel>
            <Input
              type="text"
              name="title"
              placeholder="Give your location a name"
              defaultValue={listingData.title}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Describe your location"
              defaultValue={listingData.description}
            />
          </FormControl>
        </Stack>
      </FormControl>

      <FormControl as="fieldset">
        <Stack spacing="4">
          <FormLabel as="legend" fontSize="xl" fontWeight="bold">
            Location details
          </FormLabel>
          <Wrap spacing={6} alignItems="center">
            <FormControl as={Stack} isRequired maxW="250px">
              <FormLabel fontWeight="bold">Location type</FormLabel>
              <Select
                name="locationType"
                placeholder="Select option"
                defaultValue={listingData.locationType}
              >
                <option value="APARTMENT">Apartment</option>
                <option value="CAMPSITE">Campsite</option>
                <option value="HOUSE">House</option>
                <option value="ROOM">Room</option>
                <option value="SPACESHIP">Spaceship</option>
              </Select>
            </FormControl>
            <FormControl as={Stack} maxW="146px">
              <FormLabel fontWeight="bold">Bedrooms</FormLabel>
              <NumberInput
                name="numOfBeds"
                min={1}
                defaultValue={listingData.numOfBeds}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl as={Stack} maxW="146px" isRequired>
              <FormLabel fontWeight="bold">Cost per night</FormLabel>
              <InputGroup>
                <InputLeftAddon bg="transparent" paddingRight="0">
                  ¤
                </InputLeftAddon>
                <NumberInput
                  name="costPerNight"
                  min={1}
                  defaultValue={listingData.costPerNight}
                >
                  <NumberInputField
                    borderLeftWidth="0"
                    borderTopLeftRadius="0"
                    borderBottomLeftRadius="0"
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl as={Stack} isRequired flex={1}>
              <FormLabel fontWeight="bold">Image</FormLabel>
              <Input
                name="photoThumbnail"
                type="text"
                placeholder="Image URL"
                defaultValue={listingData.photoThumbnail}
              />
            </FormControl>
          </Wrap>
        </Stack>
      </FormControl>
      <FormControl as="fieldset">
        <Stack spacing="4">
          <FormLabel as="legend" fontSize="xl" fontWeight="bold">
            Amenities
          </FormLabel>

          {Object.entries(allAmenities).map(([key, val]) => (
            <AmenitiesSelection
              key={key}
              category={key}
              amenities={val}
              onChange={handleAmenitiesChange}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              formValues={formValues.amenities}
            />
          ))}
        </Stack>
      </FormControl>

      <Flex w="full" justifyContent="flex-end">
        <Button type="submit" isLoading={loading} colorScheme="blue">
          Publish listing
        </Button>
      </Flex>
    </Stack>
  );
}

ListingFormBody.propTypes = {
  listingData: PropTypes.object.isRequired,
  amenities: PropTypes.array,
  mutation: PropTypes.object.isRequired,
  listingId: PropTypes.string,
  mutationOptions: PropTypes.object.isRequired
};

function AmenitiesSelection({
  formValues,
  category,
  amenities,
  onChange,
  onSelectAll,
  onDeselectAll
}) {
  // example value for `category` -- 'ACCOMMODATION_DETAILS'
  const title = startCase(category.toLowerCase());

  const allAmenitiesInCategory = amenities.map(amenity => amenity.id);
  const overlappingAmenities = intersection(allAmenitiesInCategory, formValues);
  return (
    <Stack>
      <HStack mb="2">
        <FormLabel mb="0" fontWeight="bold">
          {title}
        </FormLabel>
        <Checkbox
          id={`${category}-select-all`}
          isChecked={isEqual(overlappingAmenities, allAmenitiesInCategory)}
          onChange={() => {
            if (isEqual(overlappingAmenities, allAmenitiesInCategory)) {
              onDeselectAll(allAmenitiesInCategory);
            } else {
              onSelectAll(allAmenitiesInCategory);
            }
          }}
        >
          Select all
        </Checkbox>
      </HStack>
      <CheckboxGroup>
        <Grid templateColumns="repeat(3, 1fr)" gap="4">
          {amenities.map(({id, name}) => {
            const isChecked = formValues.includes(id);
            return (
              <Checkbox
                key={id}
                isChecked={isChecked}
                id={id}
                onChange={e => onChange(e, allAmenitiesInCategory)}
              >
                {name}
              </Checkbox>
            );
          })}
        </Grid>
      </CheckboxGroup>
    </Stack>
  );
}

AmenitiesSelection.propTypes = {
  category: PropTypes.string,
  amenities: PropTypes.array,
  formValues: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onDeselectAll: PropTypes.func.isRequired
};
