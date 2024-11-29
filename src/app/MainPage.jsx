"use client"

import { useRouter } from 'next/navigation'
import { DefaulTable } from './components/Table'
import { useEffect, useState } from 'react'
import { backendURL } from '@/config/config'

export const MainPage = () => {

  const router = useRouter()
  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    fetch(backendURL)
      .then(res => res.json())
      .then(data => setUsersList(data))
  }, [router])


  const handleClick = () => {
    router.push('/users')
  }

  return (
    <div>
      <h1 style={{ paddingTop: '50px' }}>Usuarios</h1>
      <div style={{ width: '90%', height: '30%', justifyContent: 'right', display: "flex", padding: '5% 0 1% 0' }}>
        <button onClick={handleClick} style={{ width: '150px', height: '50px', backgroundColor: '#185875', color: '#FFF', borderRadius: '10px', }}>
          Crear usuario
        </button>
      </div>
      <div style={{ width: '100%', height: '70%', justifyContent: 'center' }}>
        <DefaulTable users={usersList} router={router} />
      </div>
    </div>
  )
}
