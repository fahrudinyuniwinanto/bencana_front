// BencanaPrint.js

import { jsPDF } from 'jspdf'

const generatePDF = (data) => {
  // Buat dokumen PDF baru
  const doc = new jsPDF()

  // Judul
  doc.setFontSize(20)
  doc.text('Detail Bencana', 105, 20, { align: 'center' })

  // Header tabel
  doc.setFontSize(12)
  doc.setTextColor(255, 255, 255) // Warna teks putih
  doc.setFillColor(0, 0, 0) // Warna latar hitam
  doc.rect(10, 30, 190, 10, 'F') // Kotak untuk header
  doc.text('ID', 15, 35)
  doc.text('Klasifikasi', 50, 35)
  doc.text('Nama Bencana', 90, 35)
  doc.text('File Name', 150, 35)

  // Isi tabel
  doc.setTextColor(0, 0, 0) // Kembalikan warna teks ke hitam
  doc.setFontSize(10)
  doc.rect(10, 40, 190, 10) // Garis horizontal
  doc.text(data.idMBencana, 15, 47)
  doc.text(data.idMKlasifikasi, 50, 47)
  doc.text(data.namaBencana, 90, 47)
  doc.text(data.fileName, 150, 47)

  // Simpan dokumen PDF dengan nama tertentu
  doc.save('detail_bencana.pdf')
}

export default generatePDF
