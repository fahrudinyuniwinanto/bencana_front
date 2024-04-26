import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CForm, CButton, CFormInput, CFormTextarea, CFormSelect, CFormLabel } from '@coreui/react'
import { Dropzone, FileMosaic } from '@dropzone-ui/react'
import Swal from 'sweetalert2'
import { API_BASE_URL } from '../../../wfHelper'
import Select from 'react-select'

const BencanaFrm = () => {
  const baseUrl = API_BASE_URL + 'm_bencana'
  const [id_m_bencana, setIdMBencana] = useState('')
  const [id_m_klasifikasi, setIdMKlasifikasi] = useState('')
  const [klasifikasiOptions, setKlasifikasiOptions] = useState([])
  const [nama_bencana, setNamaBencana] = useState('')
  const { id, setId } = useParams()
  const navigate = useNavigate()
  const [files, setFiles] = React.useState([])
  //constructor
  useEffect(() => {
    fetchKlasifikasi()
  }, []) // Efek ini hanya dijalankan sekali saat komponen dimuat

  const fetchKlasifikasi = async () => {
    try {
      const response = await fetch(`${baseUrl}/getArrKlasifikasi`)
      const data = await response.json()
      setKlasifikasiOptions(data)
    } catch (error) {
      console.error(error)
    }
  }
  const updateFiles = (incomingFiles) => {
    console.log(incomingFiles)
    setFiles(incomingFiles)
    // sendFilesToBackend(incomingFiles)
  }

  const sendFilesToBackend = async (files) => {
    try {
      const formData = new FormData()
      files.forEach((file, index) => {
        console.log(`File ${index + 1}:`, file)
        formData.append('files[]', file)
      })

      const response = await fetch(`${baseUrl}/uploadfiles`, {
        method: 'POST',
        body: formData,
        headers: {},
      })
      if (!response.ok) {
        throw new Error('Gagal mengupload files')
      }
      console.log('File berhasil diupload')
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  const save = async (e) => {
    e.preventDefault()
    const data = {
      h: {
        id_m_bencana: id_m_bencana,
        id_m_klasifikasi: id_m_klasifikasi,
        nama_bencana: nama_bencana,
      },
      f: {
        crud: id ? 'u' : 'c',
      },
    }
    try {
      const response = await fetch(`${baseUrl}/save`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Gagal menyimpan data')
      }

      navigate('/backend/bencana-list')
    } catch (error) {
      console.error(error)
    }
  }

  const read = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`${baseUrl}/read/${id}`)
      if (!response.ok) {
        throw new Error('Gagal mengambil data')
      }
      const data = await response.json()
      setIdMBencana(data.h.id_m_bencana)
      setIdMKlasifikasi(data.h.id_m_klasifikasi)
      setNamaBencana(data.h.nama_bencana)
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
        const response = await fetch(`${baseUrl}/del/${id}`)
        if (!response.ok) {
          throw new Error('Gagal menghapus data')
        }
        // Tampilkan SweetAlert saat berhasil menghapus
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data berhasil dihapus!',
        }).then(() => {
          navigate('/backend/bencana-list')
        })
      }
    } catch (error) {
      console.error(error)
      // Tampilkan SweetAlert saat gagal menghapus
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Data gagal dihapus!',
      })
    }
  }
  const goBack = () => {
    navigate('/backend/bencana-list')
  }

  return (
    <>
      <h1>{id ? 'Update' : 'Tambah'} Data Bencana</h1>
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
              id="id_m_bencana"
              label="ID"
              value={id_m_bencana}
              onChange={(e) => setIdMBencana(e.target.value)}
              placeholder=""
              aria-describedby="exampleFormControlInputHelpInline"
              readOnly
            />
            <CFormLabel htmlFor="id_m_klasifikasi">Klasifikasi</CFormLabel>
            <Select
              value={id_m_klasifikasi}
              onChange={setIdMKlasifikasi}
              options={klasifikasiOptions}
            />
            <CFormTextarea
              type="text"
              id="nama_bencana"
              label="Nama Bencana"
              value={nama_bencana}
              onChange={(e) => setNamaBencana(e.target.value)}
              placeholder=""
              aria-describedby="exampleFormControlInputHelpInline"
              required
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

export default BencanaFrm
