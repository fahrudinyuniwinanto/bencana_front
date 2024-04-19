import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CForm, CButton, CFormInput, CFormTextarea } from '@coreui/react'
import { Dropzone, FileMosaic } from '@dropzone-ui/react'
import Swal from 'sweetalert2'
import { API_BASE_URL } from '../../../wfHelper'

const SyConfigFrm = () => {
  const [confName, setConfName] = useState('')
  const [confVal, setConfVal] = useState('')
  const [note, setNote] = useState('')
  const { id, setId } = useParams()
  const navigate = useNavigate()
  const [files, setFiles] = React.useState([])

  //constructtor
  useEffect(() => {
    if (id) {
      read(id)
    }
  }, [id])

  const updateFiles = (incomingFiles) => {
    console.log(incomingFiles)
    setFiles(incomingFiles)
    sendFilesToBackend(incomingFiles)
  }

  const sendFilesToBackend = async (files) => {
    try {
      const formData = new FormData()
      files.forEach((file, index) => {
        console.log(`File ${index + 1}:`, file)
        formData.append('files[]', file)
      })

      const response = await fetch(`${API_BASE_URL}sy_config/uploadfiles`, {
        method: 'POST',
        body: formData,
        headers: {},
      })
      if (!response.ok) {
        throw new Error('Failed to upload files')
      }
      console.log('Files uploaded successfully')
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
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
      const response = await fetch(`${API_BASE_URL}sy_config/save`, {
        method: 'POST',
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
      const response = await fetch(`${API_BASE_URL}sy_config/read/${id}`)
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
      // Tampilkan SweetAlert konfirmasi sebelum menghapus
      const result = await Swal.fire({
        title: 'Yakin hapus?',
        text: 'Anda akan menghapus data ID ' + id,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, tetap hapus!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      })

      // Jika pengguna menekan tombol "Yes"
      if (result.isConfirmed) {
        const response = await fetch(`${API_BASE_URL}sy_config/del/${id}`)
        if (!response.ok) {
          throw new Error('Failed to delete data')
        }
        // Tampilkan SweetAlert saat berhasil menghapus
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data has been deleted successfully!',
        }).then(() => {
          navigate('/backend/sy-config-list')
        })
      }
    } catch (error) {
      console.error(error)
      // Tampilkan SweetAlert saat gagal menghapus
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete data!',
      })
    }
  }
  const goBack = () => {
    navigate('/backend/sy-config-list')
  }

  return (
    <>
      <h1>{id ? 'Update' : 'Tambah'} Data Konfigurasi Sistem</h1>
      <hr />
      <div className="row">
        <div className="col-lg-3"></div>
      </div>

      <CForm onSubmit={save}>
        {/* input id readonly */}
        <div className="row">
          <div className="col-md-4">
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
              required
            />
            <CFormInput
              type="text"
              id="conf_val"
              label="Value Config"
              value={confVal}
              onChange={(e) => setConfVal(e.target.value)}
              placeholder=""
              aria-describedby="exampleFormControlInputHelpInline"
              required
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
          </div>
          <div className="col-md-6">
            <Dropzone onChange={updateFiles} value={files}>
              {files.map((file, index) => (
                <FileMosaic key={index} file={file} preview />
              ))}
            </Dropzone>
          </div>
        </div>
        <br />
        <CButton className="m-1" color="secondary" onClick={goBack}>
          <i className="fa fa-arrow-left"></i> Kembali
        </CButton>
        <button type="submit" className="btn btn-primary m-1">
        <i className="fa fa-save"></i> Simpan
        </button>
        <CButton color="danger" className="m-1" onClick={del} hidden={id ? false : true}>
        <i className="fa fa-trash"></i> Hapus
        </CButton>
      </CForm>
    </>
  )
}

export default SyConfigFrm
