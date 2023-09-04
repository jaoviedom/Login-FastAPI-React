import React, { useState, useEffect, useContext } from 'react'
import * as UserServer from '../servers/UserServer'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { useToast } from '@chakra-ui/react'
import { UserContext } from '../contexts/UserContext';
import { Box, AbsoluteCenter, Center, Heading, Stack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {

  const initialState = {
    username: '',
    password: '',
  }

  const [loginForm, setLoginForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false)
  const [, setToken] = useContext(UserContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const toast = useToast()
  const navigate = useNavigate()

  let from = location.state?.from?.pathname || "/";

  const handleClick = () => setShowPassword(!showPassword)

  const handleInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  const onSubmit = async (loginForm) => {
    try {
      let response = await UserServer.login(loginForm.username, loginForm.password)
      // console.log(response)
      const data = await response.json()
      // console.log(data)
      if (!response.ok) {
        toast({
          title: 'Error!',
          description: data.detail,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        setToken(data.access_token)
        toast({
          title: '¡Bienvenido!',
          description: "Bienvenido al sistema",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        if (data.access_token != null) {
          response = await UserServer.getUserMe(data.access_token)
          if (response.ok) {
            let user = await response.json()
            if(user.role === "Usuario") {
              navigate('/')
            } else if(user.role === "Administrador") {
              navigate('/dashboard')
            }
          }
        }
        // navigate(-1)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <Box h='100vh'>
        <AbsoluteCenter p='4' color='gray' axis='both' borderRadius='md' boxShadow='lg'>
          <Center><Heading as='h1' size='xl' mb={5}>Login</Heading></Center>
          <Center><Heading as='h2' size='sm' mb={5}>Acceda al sistema</Heading></Center>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <FormControl isInvalid={errors.username} isRequired id='username'>
                  <FormLabel>Usuario</FormLabel>
                  <Input type='text' placeholder='Steve Jobs' {...register("username", { required: true })} value={loginForm.username || ''} onChange={handleInputChange} />
                  {/* <FormHelperText>Ingrese el nombre del conjunto residencial.</FormHelperText> */}
                  {errors.username && <span>Este campo es obligatorio.</span>}
                </FormControl>
                <FormControl isInvalid={errors.password} isRequired id='password'>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup size='md'>
                    <Input pr='4.5rem' type={showPassword ? 'text' : 'password'} placeholder='********' {...register("password", { required: true })} value={loginForm.password || ''} onChange={handleInputChange} />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {showPassword ? 'Ocultar' : 'Ver'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  mt={4}
                  colorScheme='blue'
                  // isLoading={props.isSubmitting}
                  type='submit'
                >Acceder</Button>
              </Stack>
            </form>
          </Box>
        </AbsoluteCenter>
      </Box>
    </Container>
  )
}

const Container = styled.div`

`