// Toast.js
import React from 'react'
import { CToast, CToastBody, CToastHeader } from '@coreui/react'

const Toast = ({ title, message }) => {
  return (
    <CToast placement="top-end" autohide={3000}>
      <CToastHeader closeButton>
        <div className="fw-bold me-auto">{title}</div>
        <small>Just now</small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )
}

export default Toast
