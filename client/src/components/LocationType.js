import PropTypes from 'prop-types';
import React from 'react';
import {
  IoBonfireOutline,
  IoBusinessOutline,
  IoCubeOutline,
  IoHomeOutline,
  IoRocketOutline
} from 'react-icons/io5';

export default function LocationType({locType, size}) {
  const Icon = ({locType, size = '1em'}) => {
    switch (locType) {
      case 'SPACESHIP':
        return <IoRocketOutline size={size} />;
      case 'HOUSE':
        return <IoHomeOutline size={size} />;
      case 'CAMPSITE':
        return <IoBonfireOutline size={size} />;
      case 'APARTMENT':
        return <IoBusinessOutline size={size} />;
      case 'ROOM':
        return <IoCubeOutline size={size} />;
      default:
        return null;
    }
  };
  Icon.propTypes = {
    locType: PropTypes.string,
    size: PropTypes.string
  };

  return <Icon locType={locType} size={size} />;
}

LocationType.propTypes = {
  locType: PropTypes.string,
  size: PropTypes.string
};
