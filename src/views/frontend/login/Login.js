import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { API_BASE_URL } from '../../../wfHelper'

const Login = () => {
  // State untuk menyimpan nilai dari field username dan password
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tokenAwal, setTokenAwal] = useState('')

  useEffect(() => {
    getToken()
  }, [tokenAwal])

  // Handler untuk perubahan nilai pada field username dan password
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  // Fungsi untuk mendapatkan token dari API token
  const getToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}Auth/token_awal`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Jika diperlukan, tambahkan header lain yang diperlukan untuk autentikasi
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          setTokenAwal(data.token)
        })
    } catch (error) {
      console.error('Error fetching token:', error.message) // Tambahkan log
      throw new Error('Failed to fetch token: ' + error.message)
    }
  }

  // Handler untuk proses login yang akan mengirimkan data login ke API login
  const handleLogin = () => {
    // Lakukan verifikasi data login sebelum mengirim ke API
    if (username && password) {
      // Kirim data login ke API login
      fetch(`${API_BASE_URL}Auth/login`, {
        method: 'POST',
        headers: {
          Authorization: tokenAwal,
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Login failed')
          }
          // Handle respons dari API login jika berhasil
          //console.log('Login success')
          // Redirect ke halaman selanjutnya
        })
        .catch((error) => {
          // Handle error jika login gagal
          //console.error('Login error:', error.message)
          // Tampilkan pesan kesalahan kepada pengguna
        })
    } else {
      // Tampilkan pesan kesalahan jika username atau password kosong
      console.error('Username and password are required')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Masuk ke Sistem</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>APP Name</h2>
                    <p>APP Des</p>
                    <Link to="#">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        APP Btn
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
