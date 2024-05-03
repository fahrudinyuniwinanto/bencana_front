import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { exportToExcel } from 'react-json-to-excel'
import {
  CTable,
  CForm,
  CFormInput,
  CInputGroup,
  CButton,
  CSpinner,
  CCard,
  CCardBody,
  CCardHeader,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { DocsLink } from 'src/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faSearch,
  faCaretUp,
  faCaretDown,
  faEraser,
} from '@fortawesome/free-solid-svg-icons'
import { API_BASE_URL, userData } from '../../../wfHelper'

const bencanaFrm = () => {
  const baseUrl = API_BASE_URL + 'm_bencana'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [sortKey, setSortKey] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [limit, setLimit] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    getList()
  }, [searchQuery, currentPage, sortKey, sortOrder, limit])

  const getList = async () => {
    try {
      const q = searchQuery || ''
      const page = currentPage

      let url = `${baseUrl}/getlist?q=${q}&page=${page}&limit=${limit}&sortKey=${sortKey}&sortOrder=${sortOrder}`

      // Jika opsi "Show All" dipilih, hapus parameter limit dari URL
      if (limit === 'all') {
        url = `${baseUrl}/getlist?q=${q}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: userData().token,
        },
      })
      const responseData = await response.json()
      setData(responseData.data)
      setTotal(Math.ceil(responseData.total / limit))
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
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
      <CCard className="mb-4">
        <CCardHeader>
          Bencana
          <DocsLink href="https://coreui.io/docs/content/typography/" />
        </CCardHeader>
        <CCardBody>
          <div className="row">
            <div className="mb-2 col-md-3">
              <CButton color="primary" onClick={() => navigate('/backend/bencana-frm')}>
                <FontAwesomeIcon icon={faPlus} /> Tambah Data
              </CButton>
            </div>
            <div className="mb-2 col-md-3"></div>
            <div className="mb-2 col-md-3">
              <CForm>
                <CInputGroup className="mb-3">
                  <CFormInput
                    type="text"
                    placeholder="Cari..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                  />
                  <CButton color="primary" onClick={getList}>
                    <FontAwesomeIcon icon={faSearch} />
                  </CButton>
                  {searchQuery && ( // Menampilkan tombol "Clear" hanya jika searchQuery tidak kosong
                    <CButton
                      color="warning"
                      title="Bersihkan pencarian"
                      onClick={() => setSearchQuery('')}
                    >
                      <FontAwesomeIcon icon={faEraser} />
                    </CButton>
                  )}
                </CInputGroup>
              </CForm>
            </div>
            <div className="mb-2 col-md-3">
              {/* Dropdown untuk mengatur jumlah data per halaman */}
              <CDropdown className="d-inline-block">
                <CDropdownToggle caret color="primary">
                  <i className="fa fa-list"></i> Tampil {limit}
                </CDropdownToggle>
                <CDropdownMenu>
                  {[10, 25, 100, 500, 1000, 'all'].map((option) => (
                    <CDropdownItem key={option} onClick={() => setLimit(option)}>
                      {option === 'all' ? 'Semua' : option + ' data'}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>{' '}
              <button
                className="btn btn-success"
                onClick={() =>
                  exportToExcel(data, 'Data Bencana - ' + new Date().toLocaleDateString())
                }
              >
                <i className="fa fa-file-excel"></i> Excel
              </button>
            </div>
          </div>
          <div className="row">
            <code>
              Ditampilkan <strong>{limit}</strong> data{' '}
              {searchQuery ? 'dengan kata kunci ' + searchQuery : ''}{' '}
            </code>
          </div>
          <CTable hover responsive>
            <thead>
              <tr style={{ cursor: 'pointer' }} title="Klik untuk sorting">
                <th>#</th>
                <SortableColumn
                  title="Klasifikasi Bencana"
                  sortKey="id_m_klasifikasi"
                  handleSort={handleSort}
                  sortOrder={sortOrder}
                />
                <SortableColumn
                  title="Nama Bencana"
                  sortKey="nama_bencana"
                  handleSort={handleSort}
                  sortOrder={sortOrder}
                />
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="cursor-pointer"
                  onClick={() => navigate(`/backend/bencana-frm/${item.id_m_bencana}`)}
                  style={{ cursor: 'pointer' }}
                  title="Klik untuk edit dan hapus"
                >
                  <td>{index + 1}</td>
                  <td>{item.klasifikasi}</td>
                  <td>{item.nama_bencana}</td>
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
        </CCardBody>
      </CCard>
    </div>
  )
}

const SortableColumn = ({ title, sortKey, handleSort, sortOrder }) => {
  return (
    <th onClick={() => handleSort(sortKey)}>
      {title}{' '}
      {sortOrder === 'asc' ? (
        <FontAwesomeIcon icon={faCaretUp} />
      ) : (
        <FontAwesomeIcon icon={faCaretDown} />
      )}
    </th>
  )
}

export default bencanaFrm
