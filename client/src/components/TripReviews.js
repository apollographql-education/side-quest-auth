import PropTypes from 'prop-types';
import React, {useState} from 'react';
import ReviewInput, {ReviewRating} from './TripReviewInput';
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';
import {IoChevronDown, IoChevronUp} from 'react-icons/io5';
import {useMutation} from '@apollo/client';

function Review({review, children}) {
  return (
    <>
      {review ? (
        <Box>
          <Flex alignItems="center">
            <Text fontWeight="semibold" mr="4">
              {children}
            </Text>
            <ReviewRating rating={review.rating} />
          </Flex>
          <Text>{review.text}</Text>
        </Box>
      ) : null}
    </>
  );
}

Review.propTypes = {
  review: PropTypes.object,
  children: PropTypes.node
};

export default function TripReviews({
  ratingKey,
  locationReview,
  hostReview,
  guestReview,
  mutation,
  mutationOptions,
  isHost = false
}) {
  const [reviewsInput, setReviewsInput] = useState({});
  const [isReviewInputOpen, setIsReviewInputOpen] = useState(false);
  const isSubmitDisabled = isHost
    ? !(reviewsInput.guestReview?.rating && reviewsInput.guestReview?.text)
    : !(
        reviewsInput?.locationReview?.rating &&
        reviewsInput?.locationReview?.text &&
        reviewsInput?.hostReview?.rating &&
        reviewsInput?.hostReview?.text
      );

  const toast = useToast();
  const successfulToast = {
    title: 'Your review has been submitted.',
    description: 'Thank you!',
    status: 'success',
    duration: 9000,
    isClosable: true
  };
  const errorToast = {
    title: 'Something went wrong.',
    description: 'Try again later.',
    status: 'error',
    duration: 9000,
    isClosable: true
  };

  const [submitReviews] = useMutation(mutation, {
    ...mutationOptions,
    variables: {...mutationOptions.variables, ...reviewsInput},
    onCompleted: data => {
      if (isHost) {
        data.submitGuestReview.success
          ? toast(successfulToast)
          : toast(errorToast);
      } else {
        data.submitHostAndLocationReviews.success
          ? toast(successfulToast)
          : toast(errorToast);
      }
    }
  });

  const renderNoReviewMessage = author => {
    return (
      <Text>
        Your {author} hasn&apos;t reviewed their stay yet. We&apos;ve reached
        out to them and will report back here once we&apos;ve received their
        thoughts.
      </Text>
    );
  };

  // what the host sees
  const renderHostView = () => {
    return (
      <>
        <Heading as="h2" fontWeight="semibold" fontSize="lg">
          What your guest had to say
        </Heading>
        {!locationReview && !hostReview && renderNoReviewMessage('guest')}
        {locationReview && (
          <Review ratingKey={ratingKey} review={locationReview}>
            Location
          </Review>
        )}
        {hostReview && (
          <Review ratingKey={ratingKey} review={hostReview}>
            Host
          </Review>
        )}
        {guestReview && (
          <>
            <Heading as="h2" fontWeight="semibold" fontSize="lg">
              Your rating and review
            </Heading>
            <Review ratingKey={ratingKey} review={guestReview}>
              Guest
            </Review>
          </>
        )}
        {!guestReview && (
          <>
            <Button
              mt={4}
              variant="link"
              rightIcon={
                isReviewInputOpen ? <IoChevronUp /> : <IoChevronDown />
              }
              onClick={() => setIsReviewInputOpen(prevState => !prevState)}
            >
              Review your guest
            </Button>
            <Collapse in={isReviewInputOpen} py="4" w="100%">
              <Stack spacing={4}>
                <Heading as="h2" fontWeight="semibold" fontSize="lg">
                  Your rating and review
                </Heading>
                <ReviewInput
                  reviewType="guest"
                  setReviewsInput={setReviewsInput}
                  isHost
                />
                <Button
                  onClick={submitReviews}
                  disabled={isSubmitDisabled}
                  w="fit-content"
                >
                  Submit Review
                </Button>
              </Stack>
            </Collapse>
          </>
        )}
      </>
    );
  };

  // what the guest sees
  const renderGuestView = () => {
    return (
      <>
        <Heading as="h2" fontWeight="semibold" fontSize="lg">
          What your host had to say
        </Heading>
        {!guestReview && renderNoReviewMessage('host')}
        {guestReview && (
          <Review ratingKey={ratingKey} review={guestReview}>
            Guest
          </Review>
        )}
        {locationReview && hostReview && (
          <>
            <Heading as="h2" fontWeight="semibold" fontSize="lg">
              Your rating and review
            </Heading>
            <Review ratingKey={ratingKey} review={locationReview}>
              Location
            </Review>
            <Review ratingKey={ratingKey} review={hostReview}>
              Host
            </Review>
          </>
        )}
        {!locationReview && !hostReview && (
          <>
            <Button
              mt={4}
              variant="link"
              rightIcon={
                isReviewInputOpen ? <IoChevronUp /> : <IoChevronDown />
              }
              onClick={() => setIsReviewInputOpen(prevState => !prevState)}
            >
              Review your stay
            </Button>
            <Collapse in={isReviewInputOpen} py="4" w="100%">
              <Stack spacing={4}>
                <Heading as="h2" fontWeight="semibold" fontSize="lg">
                  Your rating and review
                </Heading>
                <ReviewInput
                  reviewType="location"
                  setReviewsInput={setReviewsInput}
                  isHost
                />
                <ReviewInput
                  reviewType="host"
                  setReviewsInput={setReviewsInput}
                  isHost
                />
                <Button
                  onClick={submitReviews}
                  disabled={isSubmitDisabled}
                  w="fit-content"
                >
                  Submit Review
                </Button>
              </Stack>
            </Collapse>
          </>
        )}
      </>
    );
  };

  return (
    <VStack w="full" alignItems="flex-start" spacing="3" flex="1">
      {isHost ? renderHostView() : renderGuestView()}
    </VStack>
  );
}

TripReviews.propTypes = {
  locationReview: PropTypes.object,
  hostReview: PropTypes.object,
  guestReview: PropTypes.object,
  ratingKey: PropTypes.string.isRequired,
  mutation: PropTypes.object,
  mutationOptions: PropTypes.object,
  isHost: PropTypes.bool
};
