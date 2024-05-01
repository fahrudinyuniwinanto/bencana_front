import React , { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { logout } from '../wfHelper'

const DefaultLayout = () => {

  const navigate = useNavigate()
  useEffect(() => {
    // Memeriksa login sebelum melakukan pengambilan data
    if (!checkLoggedIn()) {
      navigate('/login');
    } else {
      // Set timeout untuk melakukan logout otomatis setelah 30 menit (1.800.000 milidetik atau 1 menit 60.000 milidetik)
     const logoutTimer = setTimeout(logout, 900000); // 30 menit = 1800000 milidetik
     return () => clearTimeout(logoutTimer); // Membersihkan timeout saat komponen dibongkar
    }
  },[]
);
  const checkLoggedIn = () => {
    // Mendapatkan data pengguna dari localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    // Mengembalikan nilai dari properti 'logged' (true atau false)
    return userData?.logged || false;
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
