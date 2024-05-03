import { CForm } from '@coreui/react'
import React from 'react'

const CrudGeneratorPage = () => {
  const save = async (e) => {
    console.log(e)
  }
  return (
    <>
      <div className="alert alert-danger">Perhatian! Harus dilakukan dengan sangat cermat</div>
      <h2>CRUD Generator ReactJs (CoreUI versi 5.0.0) dan Codeigniter 3</h2>
      <CForm onSubmit={save}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="crudName">Name</label>
              <input
                type="text"
                className="form-control"
                id="crudName"
                name="crudName"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="crudTable">Table</label>
              <input
                type="text"
                className="form-control"
                id="crudTable"
                name="crudTable"
                placeholder="Table"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="crudPrefix">Prefix</label>
              <input
                type="text"
                className="form-control"
                id="crudPrefix"
                name="crudPrefix"
                placeholder="Prefix"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="crudAuthor">Author</label>
              <input
                type="text"
                className="form-control"
                id="crudAuthor"
                name="crudAuthor"
                placeholder="Author"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="crudFolder">Folder</label>
              <input
                type="text"
                className="form-control"
                id="crudFolder"
                name="crudFolder"
                placeholder="Folder"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="crudDescription">Description</label>
              <textarea
                className="form-control"
                id="crudDescription"
                name="crudDescription"
                rows="3"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </CForm>
    </>
  )
}

export default CrudGeneratorPage
