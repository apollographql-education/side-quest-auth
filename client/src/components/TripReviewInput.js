import PropTypes from 'prop-types';
import React, {useState} from 'react';
import ReactStars from 'react-rating-stars-component';
import {Flex, Text, Textarea} from '@chakra-ui/react';
import {IoStar, IoStarOutline} from 'react-icons/io5';

// https://www.npmjs.com/package/react-rating-stars-component
export function ReviewRating({
  setReviewsInput = () => {},
  reviewType = '',
  rating = null
}) {
  const [, setRating] = useState(0);

  const updateState = newRating => {
    setRating(newRating);
    setReviewsInput(prevState => {
      return {
        ...prevState,
        [`${reviewType}Review`]: {
          ...prevState[`${reviewType}Review`],
          rating: newRating
        }
      };
    });
  };

  const starConfig = {
    size: 16,
    isHalf: false,
    color: 'black',
    activeColor: 'black',
    emptyIcon: <IoStarOutline />,
    filledIcon: <IoStar />
  };

  return (
    <ReactStars
      count={5}
      edit={rating !== null ? false : true}
      value={rating !== null ? rating : 0}
      onChange={updateState}
      {...starConfig}
    />
  );
}

ReviewRating.propTypes = {
  setReviewsInput: PropTypes.func,
  reviewType: PropTypes.string,
  rating: PropTypes.number
};

export default function ReviewInput({reviewType, setReviewsInput}) {
  const [textVal, setTextVal] = useState('');
  const updateState = e => {
    setReviewsInput(prevState => {
      return {
        ...prevState,
        [`${reviewType}Review`]: {
          ...prevState[`${reviewType}Review`],
          text: e.target.value
        }
      };
    });
  };
  return (
    <>
      <Flex alignItems="center">
        <Text fontWeight="semibold" textTransform="capitalize" mr={2}>
          {reviewType}
        </Text>
        <ReviewRating
          setReviewsInput={setReviewsInput}
          reviewType={reviewType}
        />
      </Flex>
      <Textarea
        placeholder="Leave your review"
        value={textVal}
        onChange={e => {
          setTextVal(e.target.value);
          updateState(e);
        }}
        w="400px"
      />
    </>
  );
}

ReviewInput.propTypes = {
  reviewType: PropTypes.string.isRequired,
  setReviewsInput: PropTypes.func.isRequired
};
