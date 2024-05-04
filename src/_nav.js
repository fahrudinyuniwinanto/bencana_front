import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilFactorySlash, cilBug } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  //dashboard
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilFactorySlash} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Master Data',
  },
  {
    component: CNavItem,
    name: 'Bencana',
    to: '/backend/bencana-list',
    icon: <CIcon icon={cilFactorySlash} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'SISTEM',
  },
  {
    component: CNavItem,
    name: 'Sys Config',
    to: '/backend/sy-config-list',
    icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'CRUD Generator',
    to: '/system/crud-generator',
    icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
  },
]

export default _nav
