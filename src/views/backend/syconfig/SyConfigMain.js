import React from 'react'
import { useNavigate } from 'react-router-dom'
import SyConfigList from './SyConfigList' // Pastikan import komponen getList yang sudah dibuat
import { CButton } from '@coreui/react'

const MainComponent = () => {
  const navigate = useNavigate()

  const handleNewForm = () => {
    navigate('/backend/sy-config-frm')
  }

  return (
    <div>
      <h1>System Configuration</h1>
      <CButton color="primary" onClick={handleNewForm}>
        Tambah
      </CButton>
      <SyConfigList />
    </div>
  )
}

export default MainComponent
