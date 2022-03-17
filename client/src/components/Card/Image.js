import PropTypes from 'prop-types';
import React from 'react';
import {Avatar, Image as ChakraImage} from '@chakra-ui/react';

export function Image({src, alt, isAvatar = false, w, h}) {
  const IMG_PROPS = {
    src,
    alt,
    h: h ? h : 'full',
    bg: 'gray.50'
  };

  if (isAvatar) {
    return <Avatar {...IMG_PROPS} w={w ? w : 'auto'} />;
  }

  return <ChakraImage {...IMG_PROPS} w={w ? w : '200px'} borderRadius={4} />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isAvatar: PropTypes.bool,
  w: PropTypes.string,
  h: PropTypes.string
};
