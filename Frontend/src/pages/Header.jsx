import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Box, AbsoluteCenter, Center, Heading, Stack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Header({ title }) {

  const [token, setToken] = useContext(UserContext)
  const navigate = useNavigate()
  
  const handleLogout = () => {
    setToken(null)
    navigate("/login")
  }

  return (
    <Center>
      <Heading>{ title }</Heading>
      {token && (
        <Button onClick={handleLogout}>Logout</Button>
      )}
    </Center>
  )
}
