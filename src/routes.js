import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// syconfig
const SyConfigList = React.lazy(() => import('./views/backend/syconfig/SyConfigList'))
const SyConfigFrm = React.lazy(() => import('./views/backend/syconfig/SyConfigFrm'))
// bencana
const BencanaList = React.lazy(() => import('./views/backend/bencana/BencanaList'))
const BencanaFrm = React.lazy(() => import('./views/backend/bencana/BencanaFrm'))
const CrudGeneratorFrm = React.lazy(() => import('./views/system/CrudGeneratorFrm'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/backend/sy-config-list', name: 'SyConfig List', element: SyConfigList },
  { path: '/backend/sy-config-frm/:id', name: 'SyConfig Form', element: SyConfigFrm },
  { path: '/backend/bencana-list', name: 'Bencana List', element: BencanaList },
  { path: '/backend/bencana-frm/:id', name: 'Bencana Form', element: BencanaFrm },
  { path: '/system/crud-generator', name: 'Crud Generator', element: CrudGeneratorFrm },
]

export default routes
