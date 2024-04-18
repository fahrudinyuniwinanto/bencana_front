import React, { useEffect, useState } from 'react'
import { CFooter } from '@coreui/react'
import { parsys, API_BASE_URL } from '../wfHelper'

const AppFooter = () => {
  const [appName, setAppName] = useState('')
  const [leftFooter, setLeftFooter] = useState('')
  useEffect(() => {
    const fetchParsys = async () => {
      try {
        const name = await parsys('APP_NAME')
        const leftFooter = await parsys('LEFT_FOOTER')
        setAppName(name)
        setLeftFooter(leftFooter)
      } catch (error) {
        console.error(error)
      }
    }

    fetchParsys()
  }, []) // Panggil hanya sekali saat komponen dimuat

  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1" dangerouslySetInnerHTML={{ __html: leftFooter }} />
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href={API_BASE_URL} target="_blank" rel="noopener noreferrer">
          {appName} &amp; Dashboard Template
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
