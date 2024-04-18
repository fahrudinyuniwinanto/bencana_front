import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CTable, CForm, CFormInput, CInputGroup, CButton, CSpinner } from '@coreui/react'
import { API_BASE_URL } from '../../../wfHelper'

const sy_configFrm = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getList()
  }, [searchQuery, currentPage])

  const getList = async () => {
    try {
      const q = searchQuery || '' // Gunakan searchQuery jika tidak kosong, jika tidak kosong, gunakan string kosong
      const page = currentPage
      const limit = '10'

      const response = await fetch(
        `${API_BASE_URL}sy_config/getlist?q=${q}&page=${page}&limit=${limit}`,
      )
      const responseData = await response.json()
      setData(responseData.data)
      setTotal(Math.ceil(responseData.total / limit))
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    getList()
  }

  const navigate = useNavigate()
  const newFrm = () => {
    navigate('/backend/sy-config-frm')
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner color="primary" size="sm" />
      </div>
    )
  }

  return (
    <div>
      <h1>List Konfigurasi Sistem</h1>
      <hr />
      <div className="row">
        <div className="mb-2 col-md-5">
          <CButton color="primary" onClick={newFrm}>
            Tambah
          </CButton>
        </div>
        <div className="mb-2 col-md-3"></div>
        <CForm className="mb-2 col-md-4">
          <CInputGroup className="mb-3">
            <CFormInput
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CButton color="primary" onClick={handleSearch}>
              Search
            </CButton>
          </CInputGroup>
        </CForm>
      </div>
      <CTable hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Value</th>
            <th>Note</th>
            {/* Tambahkan kolom-kolom lain sesuai kebutuhan */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="cursor-pointer"
              onClick={() => navigate(`/backend/sy-config-frm/${item.id}`)}
            >
              <td>{index + 1}</td>
              <td>{item.conf_name}</td>
              <td>{item.conf_val}</td>
              <td>{item.note}</td>
              {/* Tambahkan kolom-kolom lain sesuai kebutuhan */}
            </tr>
          ))}
        </tbody>
      </CTable>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-end">
          {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default sy_configFrm
