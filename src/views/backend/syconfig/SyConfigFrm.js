import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CForm, CButton, CFormInput, CFormTextarea } from '@coreui/react'
import { BASE_URL } from '../../../wfConfig'

const SyConfigFrm = () => {
  const [confName, setConfName] = useState('')
  const [confVal, setConfVal] = useState('')
  const [note, setNote] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      read(id)
    }
  }, [id])

  const save = async (e) => {
    e.preventDefault()
    const data = {
      h: {
        conf_name: confName,
        conf_val: confVal,
        note: note,
        id: id,
      },
      f: {
        crud: id ? 'u' : 'c', // Jika id ada, gunakan 'u' untuk update, jika tidak gunakan 'c' untuk create
      },
    }
    try {
      const response = await fetch(`${BASE_URL}/apisyconfig/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to save data')
      }

      navigate('/backend/sy-config-list')
    } catch (error) {
      console.error(error)
    }
  }

  const read = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`${BASE_URL}apisyconfig/read/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      setConfName(data.h.conf_name)
      setConfVal(data.h.conf_val)
      setNote(data.h.note)
    } catch (error) {
      console.error(error)
    }
  }

  const del = async () => {
    try {
      const response = await fetch(`${BASE_URL}apisyconfig/del/${id}`)
      if (!response.ok) {
        throw new Error('Failed to delete data')
      }
      navigate('/backend/sy-config-list')
    } catch (error) {
      console.error(error)
    }
  }

  const goBack = () => {
    navigate('/backend/sy-config-list')
  }

  return (
    <>
      <h1>{id ? 'Update' : 'Tambah'} Sy Config Form</h1>
      <hr />
      <div className="row">
        <div className="col-lg-3"></div>
      </div>
      <CForm className="col-lg-4" onSubmit={save}>
        {/* input id readonly */}
        <CFormInput
          type="text"
          id="i"
          label="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder=""
          aria-describedby="exampleFormControlInputHelpInline"
          readOnly
        />
        <CFormInput
          type="text"
          id="conf_name"
          label="Nama Config"
          value={confName}
          onChange={(e) => setConfName(e.target.value)}
          placeholder=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          type="text"
          id="conf_val"
          label="Value Config"
          value={confVal}
          onChange={(e) => setConfVal(e.target.value)}
          placeholder=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormTextarea
          type="text"
          id="note"
          label="Keterangan"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <br />
        <CButton className="m-1" color="secondary" onClick={goBack}>
          Kembali
        </CButton>
        <button type="submit" className="btn btn-primary m-1">
          Simpan
        </button>
        <CButton color="danger" className="m-1" onClick={del} hidden={id ? false : true}>
          Hapus
        </CButton>
      </CForm>
    </>
  )
}

export default SyConfigFrm
