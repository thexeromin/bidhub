'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { signOutAction } from '@/auth.action'

import NavLink from './NavLink'

const Links = ['Signin', 'Signup']
const authLinks = [
    {
        label: 'Create Auction',
        url: '/auction/create',
    },
    {
        label: 'View Auctions',
        url: '/auction/all',
    },
]

export default function Navbar() {
    const { status } = useSession()
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box>
                        <Heading size="sm" as="h4">
                            {status == 'authenticated' ? (
                                <Link href={'/dashboard'}>Marketplace</Link>
                            ) : (
                                <Link href={'/'}>Marketplace</Link>
                            )}
                        </Heading>
                    </Box>

                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        {status !== 'authenticated'
                            ? Links.map((link) => (
                                  <NavLink
                                      link={'/' + link.toLowerCase()}
                                      key={link}
                                  >
                                      {link}
                                  </NavLink>
                              ))
                            : authLinks.map(({ url, label }) => (
                                  <NavLink link={url} key={url}>
                                      {label}
                                  </NavLink>
                              ))}
                    </HStack>
                </HStack>

                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={7}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        {status === 'authenticated' && (
                            <Button onClick={() => signOutAction()}>
                                Signout
                            </Button>
                        )}

                        {/* <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
                    </Stack>
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        {Links.map((link) => (
                            <NavLink key={link}>{link}</NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    )
}
