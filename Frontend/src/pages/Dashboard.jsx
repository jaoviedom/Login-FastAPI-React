import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

  const [token, ] = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(token == null) {
      return navigate('/login')
    }
  })

  return (
    <div>Dashboard</div>
  )
}
