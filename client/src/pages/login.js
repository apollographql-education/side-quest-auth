import Logo from '../assets/airlock-logo.svg';
import React, {useState} from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Select,
  Spacer,
  Stack,
  Text
} from '@chakra-ui/react';
import {IoCheckmark, IoChevronDown, IoChevronUp} from 'react-icons/io5';

import {Link} from 'react-router-dom';

export default function Login() {
  const [value, setValue] = useState();
  const handleChange = event => setValue(event.target.value);
  const users = [
    'Athes - Guest',
    'Kelle - Host',
    'Renie - Host',
    'Flinson - Host',
    'Cara - Guest',
    'Wardy - Guest',
    'Brise - Guest',
    'Hendav - Guest'
  ];
  const HOST_USER = 'user-1';
  const GUEST_USER = 'user-2';

  function login(userId) {
    const id = userId ? userId : value;
    localStorage.setItem('token', id);
  }

  return (
    <>
      <Box as={Link} to="/" width="100%">
        <HStack spacing="2" p="4">
          <Image
            boxSize="50px"
            objectFit="cover"
            src={Logo}
            alt="airlock logo"
          />
          <Text fontWeight="extrabold" fontSize="2xl">
            Airlock
          </Text>
        </HStack>
      </Box>
      <Container maxW="container.md">
        <Stack spacing={6} alignItems="center">
          <Heading as="h1" size="xl">
            Choose a user role
          </Heading>
          <HStack spacing={6}>
            <Box
              border="1px solid"
              borderRadius="8"
              borderColor="gray.100"
              p="6"
            >
              <Center h="300px">
                <Flex alignItems="center" w="330px" direction="column">
                  <Heading as="h2" size="lg">
                    Host
                  </Heading>
                  <Stack mt="4">
                    <HStack alignItems="center">
                      <IoCheckmark /> <Text>Create and manage listings</Text>
                    </HStack>
                    <HStack alignItems="center">
                      <IoCheckmark /> <Text>Edit your profile</Text>
                    </HStack>
                    <HStack alignItems="center">
                      <IoCheckmark />{' '}
                      <Text>Write reviews about your guests</Text>
                    </HStack>
                  </Stack>
                  <Button
                    as={Link}
                    to="/"
                    flex="1"
                    mt="8"
                    onClick={() => {
                      login(HOST_USER);
                    }}
                    isFullWidth
                  >
                    Log in as host
                  </Button>
                </Flex>
              </Center>
            </Box>
            <Box
              border="1px solid"
              borderRadius="8"
              borderColor="gray.100"
              p="6"
            >
              <Center h="300px">
                <Flex alignItems="center" w="330px" direction="column">
                  <Heading as="h2" size="lg">
                    Guest
                  </Heading>
                  <Stack mt="4">
                    <HStack alignItems="center">
                      <IoCheckmark />
                      <Text>Book places to stay</Text>
                    </HStack>
                    <HStack alignItems="center">
                      <IoCheckmark />
                      <Text>Add funds to your wallet</Text>
                    </HStack>
                    <HStack alignItems="center">
                      <IoCheckmark />
                      <Text>Write reviews about your stay</Text>
                    </HStack>
                  </Stack>
                  <Button
                    as={Link}
                    to="/"
                    flex="1"
                    onClick={() => {
                      login(GUEST_USER);
                    }}
                    mt="8"
                    isFullWidth
                  >
                    Log in as guest
                  </Button>
                </Flex>
              </Center>
            </Box>
          </HStack>
          <Spacer mt={16} />
          <Accordion allowToggle width="500px">
            <AccordionItem borderTop={0} borderBottom={0}>
              {({isExpanded}) => (
                <>
                  <AccordionButton
                    _hover={{bgColor: 'white'}}
                    color="indigo.dark"
                  >
                    <Flex flex="1" alignItems="center" justifyContent="center">
                      <Button variant="link" mr={2}>
                        More login options
                      </Button>
                      {isExpanded ? <IoChevronUp /> : <IoChevronDown />}
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel py={4}>
                    <Text fontSize="md" color="gray.600" mb={2}>
                      Want to test out other accounts? Choose a user from the
                      list!
                    </Text>
                    <Select
                      onChange={handleChange}
                      placeholder="Select a user"
                      value={value}
                    >
                      {users.map((userId, index) => (
                        <option key={index + 3} value={`user-${index + 3}`}>
                          {userId}
                        </option>
                      ))}
                    </Select>
                    <Button
                      as={Link}
                      to="/"
                      onClick={e => {
                        value ? login() : e.preventDefault();
                      }}
                      isDisabled={!value}
                      mt={4}
                      isFullWidth
                    >
                      Log in
                    </Button>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Stack>
      </Container>
    </>
  );
}
