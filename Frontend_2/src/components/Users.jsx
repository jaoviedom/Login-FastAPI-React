import { useState, useEffect } from "react"
import axios from '../api/axios'

export default function Users() {
  const [users, setUsers] = useState()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController() // Object that allows you to abort one or more Web requests 

    const getUsers = async () => {
      try {
        const response = await axios.get('/users', {
          signal: controller.signal
        })
        console.log(response.data)
        isMounted && setUsers(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getUsers()
    return () => {
      isMounted = false
      controller.abort()
    }

  }, [])

  return (
    <article>
      <h2>Users list</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user?.usesrname}</li>)}
          </ul>
        ) : <p>No users to display</p>
      }
    </article>
  )
}
