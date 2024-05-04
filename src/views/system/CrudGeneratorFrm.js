import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
} from '@coreui/react'
import Select from 'react-select'
import { API_BASE_URL } from '../../wfHelper'

const CrudComponent = () => {
  const [databases, setDatabases] = useState([])
  const [tables, setTables] = useState([])
  const [fields, setFields] = useState([])
  const [selectedDb, setSelectedDb] = useState('')
  const [selectedTable, setSelectedTable] = useState('')
  const [selectedPk, setSelectedPk] = useState('')
  const baseUrl = API_BASE_URL + 'crud'

  useEffect(() => {
    getDatabases()
  }, [])

  const getDatabases = async () => {
    try {
      const response = await fetch(`${baseUrl}/getDbs`)
      const data = await response.json()
      setDatabases(data.databases)
    } catch (error) {
      console.error('Error fetching database:', error)
    }
  }

  const getTables = async () => {
    try {
      const response = await fetch(`${baseUrl}/getTables?db=${selectedDb}`)
      const data = await response.json()
      setTables(data.tables)
    } catch (error) {
      console.error('Error fetching tables:', error)
    }
  }

  const getFields = async () => {
    try {
      const response = await fetch(`${baseUrl}/getFields?db=${selectedDb}&table=${selectedTable}`)
      const data = await response.json()
      setFields(data.fields)
      setSelectedPk(data.pk)
    } catch (error) {
      console.error('Error fetching fields:', error)
    }
  }

  const handleDbChange = (selectedOption) => {
    setSelectedDb(selectedOption.value)
    getTables()
  }

  const handleTableChange = (selectedOption) => {
    setSelectedTable(selectedOption.value)
    getFields()
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Generate CRUD</CCardHeader>
        <CCardBody>
          <div className="row">
            <CFormLabel>Database</CFormLabel>
            <Select
              options={databases.map((db) => ({ value: db, label: db }))}
              onChange={handleDbChange}
            />
          </div>
          <div className="row">
            <CFormLabel>Table</CFormLabel>
            <Select
              options={tables.map((table) => ({ value: table, label: table }))}
              onChange={handleTableChange}
            />
          </div>
          <div className="row">
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Column Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Caption</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Element</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {fields.map((field, index) => (
                  <tr key={index}>
                    <td>{field.COLUMN_NAME}</td>
                    <td>{field.CAPTION}</td>
                    <td>{field.ELEMENT}</td>
                  </tr>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CrudComponent
