import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { parsys, API_BASE_URL } from '../../../wfHelper';
import Swal from 'sweetalert2'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tokenAwal, setTokenAwal] = useState('');
  const [appName, setAppName] = useState('');
  const [appDesc, setAppDesc] = useState('');
  const navigate = useNavigate();

  // if (isLoggedIn) {
  //   navigate('/dashboard'); // Arahkan ke halaman dashboard jika login berhasil
  // }

  useEffect(() => {
    getToken();
    fetchParsys();
  }, [tokenAwal]);

  const fetchParsys = async () => {
    try {
      const name = await parsys('APP_NAME');
      const desc = await parsys('APP_DESC');
      setAppName(name);
      setAppDesc(desc);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const getToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}Auth/token_awal`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTokenAwal(data.token);
    } catch (error) {
      console.error('Error fetching token:', error.message);
      throw new Error('Failed to fetch token: ' + error.message);
    }
  }

  const handleLogin = () => {
    if (username && password) {
      fetch(`${API_BASE_URL}Auth/login`, {
        method: 'POST',
        headers: {
          Authorization: tokenAwal,
        },
        body: JSON.stringify({ username, password }),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error('Login failed');
          }

          const data = await response.json();
          // Simpan data login ke local storage
          localStorage.setItem('userData', JSON.stringify(data));   
          navigate('/backend/sy-config-list')
          
        
        })
        .catch((error) => {
          //console.error('Login error:', error.message);
          // Tampilkan pesan kesalahan kepada pengguna
          Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Username atau Password anda salah!',
        })
        });
    } else {
      // console.error('Username and password are required');
      Swal.fire({
        icon: 'warning',
        title: 'Perhatian',
        text: 'Username and password are required',
      })
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
                    <h2>{appName}</h2>
                    <p>{appDesc}</p>
                    <Link to="#">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Website
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

export default Login;
