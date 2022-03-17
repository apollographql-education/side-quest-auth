import '@apollo/space-kit/reset.css';
import {extendTheme} from '@chakra-ui/react';

import {colors} from '@apollo/space-kit/colors';

const {grey, silver, midnight} = colors;

const Button = {
  // The styles all buttons have in common
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'base' // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3 // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4 // <-- these values are tokens from the design system
    }
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500'
    },
    solid: {
      bg: 'indigo.dark',
      color: 'white',
      _hover: {
        bg: 'indigo.darkest'
      }
    },
    ghost: {
      _hover: {
        bg: 'indigo.dark',
        color: 'white'
      }
    },
    link: {
      color: 'indigo.dark',
      _hover: {
        textDecoration: 'underline'
      }
    }
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'solid'
  }
};

export default extendTheme({
  colors: {
    brand: {
      black: '#12151A',
      white: '#FCFDFF',
      light: '#DEE2E7',
      100: '#D9CFFF',
      200: '#AD9BF6',
      300: '#7156D9',
      400: '#3F20BA',
      midnight: '#1B2240',
      error: '#9C2323'
    },
    indigo: {
      darkest: '#2D1F66',
      dark: '#3F20BA',
      light: '#AD9BF6'
    },
    gray: {
      50: silver.light,
      100: silver.base,
      200: silver.dark,
      300: silver.darker,
      400: grey.light,
      500: grey.dark,
      600: midnight.dark,
      800: midnight.darker,
      900: midnight.darkest,
      dark: '#5A6270'
    }
  },
  fonts: {
    heading: "'Source Sans Pro', sans-serif",
    body: "'Source Sans Pro', sans-serif",
    code: "'Source Code Pro', sans-serif"
  },
  components: {
    Button
  }
});
