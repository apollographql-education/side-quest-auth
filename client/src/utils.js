import DatePicker from 'react-datepicker';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import format from 'date-fns/format';
import {gql, useQuery} from '@apollo/client';
import {useState} from 'react';

export const GET_USER = gql`
  query GetMyProfile {
    me {
      id
      name
      profilePicture
      ... on Host {
        profileDescription
      }
      ... on Guest {
        funds
      }
    }
  }
`;

export function useUser() {
  const [user, setUser] = useState();

  const {loading, error} = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    onCompleted: ({me}) => {
      setUser({...me});
    }
  });

  return {
    user,
    setUser,
    loading,
    error
  };
}

export const LISTING_FRAGMENT = gql`
  fragment ListingFragment on Listing {
    id
    title
    photoThumbnail
    numOfBeds
    description
    overallRating
    costPerNight
    locationType
  }
`;

export const HOST_LISTINGS = gql`
  query GetHostListings {
    hostListings {
      ...ListingFragment
      numberOfUpcomingBookings
    }
  }
  ${LISTING_FRAGMENT}
`;

export const getNextDate = date => {
  const nextDate = new Date(date).setDate(date.getDate() + 1);
  return new Date(nextDate);
};

export const getDatePickerProps = ({
  today,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  ...props
}) => {
  return {
    type: 'date',
    as: DatePicker,
    dateFormat: 'MM-dd-yyyy',
    minDate: today,
    startDate,
    endDate,
    onChange: date => {
      setStartDate(date);

      // match end date with start date if start date was changed to be farther in the future than the current end date
      if (endDate < date) {
        setEndDate(new Date(getNextDate(date)));
      }
    },
    ...props
  };
};

// need to normalize Date time (data from getDatesToExclude times are all 00:00:00)
// from Fri Nov 05 2021 11:38:24 GMT-0600 (Mountain Daylight Time)
// to Fri Nov 05 2021 00:00:00 GMT-0600 (Mountain Daylight Time)
const normalizeDate = date => {
  return new Date(format(date, 'MMM d yyyy'));
};

export const getDatesToExclude = (startDate, endDate) => {
  const datesArr = [];
  const stringDatesArr = [];
  const end = new Date(endDate);
  const currDate = new Date(startDate);

  while (currDate < end) {
    const dateToAdd = new Date(currDate);
    datesArr.push(dateToAdd);
    stringDatesArr.push(dateToAdd.toString());
    currDate.setDate(currDate.getDate() + 1);
  }

  // keeping string values of the dates makes it easier to check
  // datepicker inputs to see if the user selected a date
  // that should be excluded
  return {
    dates: [...datesArr, end],
    stringDates: [...stringDatesArr, end.toString()]
  };
};

export const isDateValid = (invalidDates, dateToCheck) => {
  const checkDateString = normalizeDate(dateToCheck).toString();

  return !invalidDates.includes(checkDateString);
};

export const getFirstValidDate = (invalidDates, checkInDate) => {
  const today = checkInDate || new Date();
  const currDate = normalizeDate(today);

  while (!isDateValid(invalidDates, currDate)) {
    currDate.setDate(currDate.getDate() + 1);
  }

  return currDate;
};

// check if rangeToCheck (check in and check out dates) overlaps with an existing booking
export const areDatesValid = (bookings, rangeToCheck) => {
  return bookings.find(booking =>
    areIntervalsOverlapping(
      {
        start: new Date(booking.checkInDate),
        end: new Date(booking.checkOutDate)
      },
      rangeToCheck
    )
  )
    ? false
    : true;
};
