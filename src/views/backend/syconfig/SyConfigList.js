import React, { useState, useEffect } from 'react'
import { CTable, CForm, CFormInput, CInputGroup, CButton } from '@coreui/react'

const getList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchData()
  }, [searchQuery])

  const fetchData = async () => {
    try {
      const q = searchQuery || '' // Gunakan searchQuery jika tidak kosong, jika tidak kosong, gunakan string kosong
      const page = '1'
      const limit = '100'

      const response = await fetch(
        `http://bencana_back.me/apisyconfig/getlist?q=${q}&page=${page}&limit=${limit}`,
      )
      const responseData = await response.json()
      setData(responseData.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchData()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <CForm className="mb-3 col-md-4">
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
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.conf_name}</td>
              <td>{item.conf_val}</td>
              <td>{item.note}</td>
              {/* Tambahkan kolom-kolom lain sesuai kebutuhan */}
            </tr>
          ))}
        </tbody>
      </CTable>
    </div>
  )
}

export default getList
