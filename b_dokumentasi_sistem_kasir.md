**🛒 SPESIFIKASI TEKNIS: PIXELCRAFT POS (POINT OF SALE)**  
***Stack Utama:*** * Laravel 11 + Inertia.js (Vue 3) + Tailwind CSS*  
 *  
 * ***Target Pengguna:*** * UMKM F&B (Kafe, Resto, Angkringan), Retail/Toko, & Usaha Jasa.*  
 *  
 * ***Karakteristik:*** * Single Page Application (SPA) feel, offline-first ready (PWA/Local Storage cache), UI/UX modern & responsif (Tablet & Desktop friendly), fast thermal printing.*  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSfYxKK/kYXEkyk8WcGbCFuCLTOzVXsAAPzFuVZ3dXw9AQDgtesB/v8F8JQadPwAAAAASUVORK5CYII=)  
**🛠️ 1. ARCHITECTURE & TECH STACK**  
Sistem dibagun dengan arsitektur modern yang memisahkan logika backend dan reactive UI tanpa perlu mengelola REST API terpisah:  
| | | |  
|-|-|-|  
| **Layer** | **Teknologi** | **Peran / Alasan Pemilihan** |   
| **Backend Framework** | Laravel 11 | Robust ORM, Authentication (Breeze/Fortify), Authorization, Queueing, & Reporting engine. |   
| **Adapter / Bridge** | Inertia.js | Menghubungkan Laravel & Vue 3 secara seamless tanpa overhead building REST API manual. |   
| **Frontend Framework** | Vue 3 (Composition API / Script Setup) | Reactive UI super cepat untuk kalkulasi keranjang, pencarian produk, dan filter real-time. |   
| **Styling & UI Components** | Tailwind CSS v3 + Headless UI | Tampilan clean, dark mode support, serta layout grid kasir yang responsif. |   
| **State & Local Cache** | Pinia + IndexedDB / LocalStorage | Menyimpan draft transaksi lokal & caching data produk agar transaksi tetap lancar saat koneksi lambat. |   
| **Print Engine** | Web Bluetooth / Web Serial API / EscPos PHP | Direct thermal printing ke printer struk (58mm / 80mm) via Bluetooth atau USB. |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhwgJGkPcrHpnRgQU2QtIq6DIze3UGAMBf3Gu1VcfXEwAAXrseaJkELjbMzy0AAAAASUVORK5CYII=)  
**📱 2. STRUKTUR MODUL & FITUR UTAMA**  
**🟢 A. Modul Kasir / POS Screen (Core Feature)**  
Tampilan interface khusus kasir dengan tata letak split-screen (Produk di kiri, Keranjang/Cart di kanan):  
- **Grid & Search Produk Fast-Access:**  
  - Pencarian instan (by nama, SKU, atau Barcode Scan via USB Scanner/Camera).  
  - Filter berdasarkan kategori (Makanan, Minuman, Snacking, dll).  
  - Kartu produk interaktif (menampilkan stok real-time, varian harga, & thumbnail).  
- **Manajemen Keranjang (Cart Management):**  
  - Tambah/kurang kuantitas secara cepat (+ / -).  
  - Opsi varian produk (misal: Size L/M, Level Pedas, Hot/Ice).  
  - Catatan khusus item (misal: *"Tanpa Bawang"*).  
  - Diskon item/diskon total (nominal atau persentase).  
  - Pajak (PPN) & Biaya Layanan (Service Charge) otomatis.  
- **Proses Pembayaran (Multi-Payment):**  
  - Tunai (dengan kalkulator kembalian instan & quick cash button: Rp10k, Rp20k, Rp50k, Rp100k, Uang Pas).  
  - Non-Tunai / QRIS (Integrasi QRIS Statis/Dinamis Midtrans/Xendit).  
  - Transfer Bank & Debit.  
- **Output Transaksi:**  
  - Auto Print Struk Thermal (58mm/80mm).  
  - Kirim Struk Digital via WhatsApp Web API langsung ke nomor pelanggan.  
  - Fitur *Hold/Save Order* (untuk sistem open bill / simpan pesanan meja).  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsad4FCtY9ecwnkms4E2ELcGWmTmrKwAA/uLeqrU6vp4AAPDa/gDzUgM9+S8z3AAAAABJRU5ErkJggg==)  
**📦 B. Modul Inventaris & Produk (Inventory Management)**  
- **Manajemen Produk & Varian:**  
  - Multi-varian (Warna, Ukuran, Opsi).  
  - Harga Beli (HPP) vs Harga Jual (Margin Profit calculation).  
  - Upload foto produk dengan auto-compress.  
- **Stock Control:**  
  - Tracking stok masuk (Stock In) & stok keluar/rusak (Stock Out/Adjustment).  
  - Peringatan stok tipis (*Low Stock Alert threshold*).  
  - Manajemen Supplier & Riwayat Pembelian Grosir.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhZscaUpheJwqQgQU2QtIq6DIze3UGAMBf3Gu1VcfXEwAAXrseopcEQ2uoYnwAAAAASUVORK5CYII=)  
**📊 C. Modul Laporan & Analitik (Dashboard Executive)**  
Tampilan visual kaya grafik interaktif (menggunakan Chart.js / ApexCharts via Vue):  
- **Ringkasan Penjualan:**  
  - Total Omzet, Profit Bersih (Gross Profit), Total Transaksi, & Rata-rata Nilai Basket.  
- **Top Performing Analytics:**  
  - Produk terlaris (Best Seller Item) & Jam-jam sibuk transaksi (Peak Hours Heatmap).  
- **Laporan Keuangan & Kas:**  
  - Laporan Penjualan Harian, Mingguan, Bulanan (Filter Tanggal Custom).  
  - Laporan Berdasarkan Metode Pembayaran (Cash vs QRIS vs Card).  
  - Laporan Relevansi Kasir (Setoran Shift Kasir / Opening-Closing Cash Drawer Audit).  
- **Export Data:** Download Laporan ke format Excel (.xlsx) & PDF.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nO3OMQ0AIAwAwZIgBKm1gjSMNCwYYCIkd9OP3zJzRMQMAAB+sfqJeroBAMCN2pTWBSSZVtjzAAAAAElFTkSuQmCC)  
**👥 D. Modul Manajemen Pengguna & Multi-Akses (RBAC)**  
Role-Based Access Control yang presisi:  
- **Admin / Owner:** Akses penuh ke Laporan, HPP, Manajemen Stok, Pengaturan Harga, & User.  
- **Kasir:** Akses terbatas hanya pada Layar Kasir, Hold Order, dan Cetak Ulang Struk (Tanpa akses lihat HPP/Laporan Total Omzet).  
- **Manajer Toko:** Akses Stok, Adjustment, dan Laporan Harian.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd40A5GMORPYEt7WMGbCFuCLTNzVFcAAPzFvVZbdX49AQDgtf0BSrIDUgOg4eAAAAAASUVORK5CYII=)  
**🎨 3. UI/UX DESIGN SYSTEM & PALET WARNA**  
Aplikasi mengusung antarmuka yang modern, minim distraction, dan bersahabat untuk mata kasir yang bekerja berjam-jam:  
- **Primary Tone:**Slate-900 / Zinc-900 (Header & Sidebar profesional).  
- **Accent Color:**Indigo-600 / Violet-600 (Tombol utama transaksi & checkout) atau Emerald-600 (Status sukses & bayar).  
- **Cart & Payment Area:** Distinct background (bg-slate-50 / bg-zinc-100) untuk membedakan area pencarian produk dan kalkulasi biaya.  
- **Typography:**Inter atau Plus Jakarta Sans untuk keterbacaan angka dan harga yang jelas.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsScYxpg/h5VMYARvRrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA224BcUMk6pDAAAAAElFTkSuQmCC)  
**🚀 4. DATABASE SCHEMA (ENTITY RELATIONSHIP OVERVIEW)**  
users              ──> id, name, email, password, role_id  
 roles              ──> id, name (admin, cashier, manager)  
 categories         ──> id, name, slug, icon  
 products           ──> id, category_id, name, sku, barcode, cost_price, selling_price, stock, image  
 product_variants   ──> id, product_product_id, variant_name, additional_price, stock  
 orders             ──> id, order_number, user_id, customer_name, total_amount, discount, tax, final_amount, payment_method, payment_status  
 order_items        ──> id, order_id, product_id, variant_info, qty, unit_price, subtotal, notes  
 cash_drawers       ──> id, user_id, opening_cash, closing_cash, total_sales_cash, shift_start, shift_end  
   
## **📋 5. CHECKLIST PENJUALAN & DEPLOYMENT UNTUK PIXELCRAFT DIGITAL**  
- [ ] Build installer PWA agar bisa di-"Add to Home Screen" di Tablet Android/iPad.  
- [ ] Buat mode Demo/Sandbox Data untuk presentasi ke calon klien UMKM.  
- [ ] Sediakan template preset data awal (misal: Preset Menu Cafe, Preset Toko Kelontong) untuk setup cepat < 15 menit.  
- [ ] Integrasi driver Thermal Printer USB & Bluetooth standar pasar (Eppos, Enibit, Panda, Posiflex).  
   
