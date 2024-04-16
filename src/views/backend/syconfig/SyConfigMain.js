import React from 'react'
import { useNavigate } from 'react-router-dom'
import SyConfigList from './SyConfigList' // Pastikan import komponen getList yang sudah dibuat

const MainComponent = () => {
  const navigate = useNavigate()

  const handleNewForm = () => {
    navigate('/backend/syconfig/SyConfigFrm')
  }

  return (
    <div>
      <h1>Main Component</h1>
      <SyConfigList />
      <button onClick={handleNewForm}>Tambah</button>
    </div>
  )
}

export default MainComponent
