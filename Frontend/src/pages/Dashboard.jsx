import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import * as UserServer from '../servers/UserServer'

export default function Dashboard() {

  const [token, ] = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async() => {
      let response = await UserServer.getUserMe(token)
      let user = await response.json()
      if(token === "null") {
        return navigate('/login')
      } else if(user.role !== 'Administrador') {
        return navigate('/')
      }
    }
    getUser()
  })

  return (
    <div>Dashboard</div>
  )
}
