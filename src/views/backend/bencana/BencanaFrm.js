import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CForm,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormLabel,
  CInputGroup,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import { DocsLink } from 'src/components'
import Swal from 'sweetalert2'
import { API_BASE_URL, userData } from '../../../wfHelper'
import Select from 'react-select'

const BencanaFrm = () => {
  const tableName = 'm_bencana'
  const baseUrl = API_BASE_URL + tableName
  const { id } = useParams()
  const navigate = useNavigate()
  const [idMBencana, setIdMBencana] = useState('')
  const [idMKlasifikasi, setIdMKlasifikasi] = useState('')
  const [klasifikasiOptions, setKlasifikasiOptions] = useState([])
  const [namaBencana, setNamaBencana] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [filePreviewUpdate, setFilePreviewUpdate] = useState(null)
  useEffect(() => {
    if (id) {
      read(id)
    }
    fetchKlasifikasi()
  }, [])

  const fetchKlasifikasi = async () => {
    try {
      const response = await fetch(`${baseUrl}/getArrKlasifikasi`, {
        method: 'GET',
        headers: {
          Authorization: userData().token,
        },
      })
      const data = await response.json()
      setKlasifikasiOptions(data)
    } catch (error) {
      console.error(error)
    }
  }
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    setIsFileSelected(true)
    setFilePreview(URL.createObjectURL(e.target.files[0]))
  }
  const sendFile = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const response = await fetch(`${baseUrl}/uploadFiles`, {
        method: 'POST',
        headers: {
          Authorization: userData().token,
        },
        body: formData,
      })
      if (!response.ok) {
        throw new Error('Gagal mengunggah file')
      }
      const resfile = await response.json()
      console.log('File berhasil diunggah:', resfile)
      return resfile
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      const fileName = await sendFile()
      console.log('File name:', fileName)
      const data = {
        h: {
          id_m_bencana: idMBencana,
          id_m_klasifikasi: idMKlasifikasi,
          nama_bencana: namaBencana,
          file_name: fileName,
        },
        f: {
          crud: id ? 'u' : 'c',
        },
      }
      const response = await fetch(`${baseUrl}/save`, {
        method: 'POST',
        headers: {
          Authorization: userData().token,
        },
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
    try {
      console.log(id)
      const response = await fetch(`${baseUrl}/read/${id}`, {
        method: 'GET',
        headers: {
          Authorization: userData().token,
        },
      })
      if (!response.ok) {
        throw new Error('Gagal mengambil data')
      }
      const data = await response.json()
      setIdMBencana(data.h.id_m_bencana)
      setIdMKlasifikasi(data.h.id_m_klasifikasi)
      setNamaBencana(data.h.nama_bencana)
      setFileName(data.h.file_name)
      const linkFile = API_BASE_URL + 'assets/upload_files/' + tableName + '/' + data.h.file_name
      setFilePreviewUpdate(linkFile)
      console.log(linkFile)
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
        const response = await fetch(`${baseUrl}/del/${id}`, {
          method: 'GET',
          headers: {
            Authorization: userData().token,
          },
        })
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
      <CCard className="mb-4">
        <CCardHeader>
          Form Bencana
          <DocsLink href="https://coreui.io/docs/content/typography/" />
        </CCardHeader>
        <CCardBody>
          <div className="row">
            <div className="mb-2 col-md-5"></div>
            <CForm onSubmit={save}>
              <div className="row">
                <div className="col-md-6">
                  <CFormLabel htmlFor="idMBencana">
                    ID <code>Kosongkan jika buat baru</code>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="idMBencana"
                    value={idMBencana}
                    onChange={(e) => setIdMBencana(e.target.value)}
                    placeholder=""
                    readOnly
                  />
                  <CFormLabel>Klasifikasi</CFormLabel>
                  <Select
                    value={klasifikasiOptions.find((option) => option.value === idMKlasifikasi)}
                    onChange={(selectedOption) => setIdMKlasifikasi(selectedOption.value)}
                    options={klasifikasiOptions}
                  />
                  <CFormTextarea
                    type="text"
                    id="namaBencana"
                    label="Nama Bencana"
                    value={namaBencana}
                    onChange={(e) => setNamaBencana(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="file">
                    Attachment <code>Maksimal 2MB dengan type png/jpg</code>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput type="file" onChange={handleFileChange} accept="image/*" />
                  </CInputGroup>
                  {fileName && (
                    <>
                      Nama: {fileName}{' '}
                      <a href={filePreviewUpdate} download>
                        Download
                      </a>
                    </>
                  )}
                  <img
                    className="img-thumbnail"
                    src={filePreviewUpdate}
                    style={{ maxWidth: '80%', height: 'auto' }}
                    hidden={fileName ? false : true}
                  />
                  {isFileSelected && (
                    <div>
                      <h3>File Dipilih:</h3>
                      <p>
                        Nama: {selectedFile.name} | Tipe: {selectedFile.type} | Ukuran:{' '}
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <img src={filePreview} style={{ maxWidth: '80%', height: 'auto' }} />
                    </div>
                  )}
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
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BencanaFrm
