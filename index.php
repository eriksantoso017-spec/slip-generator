<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generator Slip Gaji</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
    <!-- html2canvas for export -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    
    <!-- Lucide Icons (using CDN alternative or Font Awesome) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --primary: 222.2 47.4% 11.2%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96.1%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --radius: 0.5rem;
        }
        
        body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
        }
        
        .card {
            background-color: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 1.5rem;
        }
        
        .input {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border: 1px solid hsl(var(--input));
            border-radius: calc(var(--radius) - 2px);
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
        }
        
        .input:focus {
            outline: none;
            border-color: hsl(var(--primary));
        }
        
        .btn {
            padding: 0.5rem 1rem;
            border-radius: calc(var(--radius) - 2px);
            font-weight: 500;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
        }
        
        .btn-primary {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
        }
        
        .btn-primary:hover {
            opacity: 0.9;
        }
        
        .btn-outline {
            background-color: transparent;
            border: 1px solid hsl(var(--border));
            color: hsl(var(--foreground));
        }
        
        .btn-outline:hover {
            background-color: hsl(var(--secondary));
        }
        
        .separator {
            height: 1px;
            background-color: hsl(var(--border));
            margin: 1.5rem 0;
        }
    </style>
</head>
<body class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex items-center justify-between">
            <h1 class="text-3xl font-bold text-gray-900">Generator Slip Gaji</h1>
            <button id="exportBtn" class="btn btn-primary flex items-center gap-2">
                <i class="fas fa-download"></i>
                Export PNG
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Left Panel - Input Form -->
            <div class="card h-fit">
                <div class="space-y-6">
                    <!-- Company Details -->
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-gray-900">Data Perusahaan</h2>
                        <div class="space-y-2">
                            <label for="logo" class="block text-sm font-medium">Logo Perusahaan</label>
                            <div class="flex gap-2 items-center">
                                <input type="file" id="logo" accept="image/*" class="hidden">
                                <button type="button" id="uploadLogoBtn" class="btn btn-outline flex items-center gap-2">
                                    <i class="fas fa-upload"></i>
                                    Upload Logo
                                </button>
                                <img id="logoPreview" src="" alt="Logo" class="h-10 w-10 object-contain rounded hidden">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="companyName" class="block text-sm font-medium">Nama Perusahaan</label>
                            <input type="text" id="companyName" class="input" value="PT. KWT. CAKRAWALA NUANSA NIRWANA">
                        </div>

                        <div class="space-y-2">
                            <label for="companyAddress" class="block text-sm font-medium">Alamat Perusahaan</label>
                            <input type="text" id="companyAddress" class="input" value="Jl. Abdul Fatah KM 4 Kp. Babakan Nyamplung Rt. 05/05 Desa Cinangka Kec. Cempea Kab. Bogor 16620">
                        </div>

                        <div class="space-y-2">
                            <label for="period" class="block text-sm font-medium">Periode Gaji</label>
                            <input type="text" id="period" class="input" value="1 Maret 2023 - 31 Maret 2023" placeholder="1 Maret 2023 - 31 Maret 2023">
                        </div>
                    </div>

                    <div class="separator"></div>

                    <!-- Employee Details -->
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-gray-900">Data Karyawan</h2>
                        <div class="space-y-3">
                            <div class="space-y-2">
                                <label for="employeeId" class="block text-sm font-medium">ID Karyawan</label>
                                <input type="text" id="employeeId" class="input" value="2004030">
                            </div>

                            <div class="space-y-2">
                                <label for="employeeName" class="block text-sm font-medium">Nama Karyawan</label>
                                <input type="text" id="employeeName" class="input" value="INDRA GUNARDI">
                            </div>

                            <div class="space-y-2">
                                <label for="position" class="block text-sm font-medium">Jabatan</label>
                                <input type="text" id="position" class="input" value="Mechanical Engineering">
                            </div>

                            <div class="space-y-2">
                                <label for="status" class="block text-sm font-medium">Status</label>
                                <input type="text" id="status" class="input" value="Karyawan Tetap">
                            </div>
                        </div>
                    </div>

                    <div class="separator"></div>

                    <!-- Income -->
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-gray-900">Penghasilan</h2>
                        <div class="space-y-3">
                            <div class="space-y-2">
                                <label for="gajiPokok" class="block text-sm font-medium">Gaji Pokok</label>
                                <input type="number" id="gajiPokok" class="input" value="5000000">
                            </div>

                            <div class="space-y-2">
                                <label for="tjJabatan" class="block text-sm font-medium">Tunjangan Jabatan</label>
                                <input type="number" id="tjJabatan" class="input" value="1200000">
                            </div>

                            <div class="space-y-2">
                                <label for="tjKonsumsi" class="block text-sm font-medium">Tunjangan Konsumsi</label>
                                <input type="number" id="tjKonsumsi" class="input" value="455000">
                            </div>

                            <div class="space-y-2">
                                <label for="tjHarian" class="block text-sm font-medium">Tunjangan Harian</label>
                                <input type="number" id="tjHarian" class="input" value="520000">
                            </div>

                            <div class="space-y-2">
                                <label for="bonusTarget" class="block text-sm font-medium">Bonus Target</label>
                                <input type="number" id="bonusTarget" class="input" value="850000">
                            </div>

                            <div class="pt-2 flex justify-between items-center font-semibold">
                                <span>Total Penghasilan (A):</span>
                                <span id="totalIncome">Rp 0</span>
                            </div>
                        </div>
                    </div>

                    <div class="separator"></div>

                    <!-- Deductions -->
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-gray-900">Potongan</h2>
                        <div class="space-y-3">
                            <div class="space-y-2">
                                <label for="pph21" class="block text-sm font-medium">PPh 21</label>
                                <input type="number" id="pph21" class="input" value="0">
                            </div>

                            <div class="space-y-2">
                                <label for="asuransi" class="block text-sm font-medium">Asuransi</label>
                                <input type="number" id="asuransi" class="input" value="0">
                            </div>

                            <div class="pt-2 flex justify-between items-center font-semibold">
                                <span>Total Potongan (B):</span>
                                <span id="totalDeduction">Rp 0</span>
                            </div>
                        </div>
                    </div>

                    <div class="separator"></div>

                    <!-- Net Salary -->
                    <div class="space-y-2 bg-blue-50 p-4 rounded-lg">
                        <div class="flex justify-between items-center text-lg font-bold">
                            <span>Penerimaan Bersih (A - B):</span>
                            <span class="text-blue-600" id="netSalary">Rp 0</span>
                        </div>
                    </div>

                    <div class="separator"></div>

                    <!-- Footer -->
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-gray-900">Informasi Tambahan</h2>
                        <div class="space-y-3">
                            <div class="space-y-2">
                                <label for="place" class="block text-sm font-medium">Tempat</label>
                                <input type="text" id="place" class="input" value="Bogor">
                            </div>

                            <div class="space-y-2">
                                <label for="date" class="block text-sm font-medium">Tanggal</label>
                                <input type="text" id="date" class="input" value="31 Maret 2023">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Panel - Preview -->
            <div class="lg:sticky lg:top-8 h-fit">
                <div class="card">
                    <div id="previewRef" class="bg-white p-8 text-black" style="font-family: Arial, sans-serif;">
                        <!-- Header -->
                        <div class="flex items-start gap-4 mb-2">
                            <img id="previewLogo" src="" alt="Logo" class="w-20 h-20 object-contain hidden">
                            <div class="flex-1">
                                <h2 class="text-base font-bold mb-1" id="previewCompanyName">PT. KWT. CAKRAWALA NUANSA NIRWANA</h2>
                                <p class="text-xs leading-relaxed" id="previewCompanyAddress">Jl. Abdul Fatah KM 4 Kp. Babakan Nyamplung Rt. 05/05 Desa Cinangka Kec. Cempea Kab. Bogor 16620</p>
                            </div>
                        </div>

                        <!-- Title -->
                        <div class="text-center my-4">
                            <h1 class="text-lg font-bold underline">SLIP GAJI KARYAWAN</h1>
                            <p class="text-sm mt-2">Periode <span id="previewPeriod">1 Maret 2023 - 31 Maret 2023</span></p>
                        </div>

                        <!-- Employee Details -->
                        <div class="space-y-1 mb-4 text-sm">
                            <div class="flex">
                                <span class="w-32 font-normal">ID. No.</span>
                                <span class="font-normal">: <span id="previewEmployeeId">2004030</span></span>
                            </div>
                            <div class="flex">
                                <span class="w-32 font-normal">Nama</span>
                                <span class="font-normal">: <span id="previewEmployeeName">INDRA GUNARDI</span></span>
                            </div>
                            <div class="flex">
                                <span class="w-32 font-normal">Jabatan</span>
                                <span class="font-normal">: <span id="previewPosition">Mechanical Engineering</span></span>
                            </div>
                            <div class="flex">
                                <span class="w-32 font-normal">Status</span>
                                <span class="font-normal">: <span id="previewStatus">Karyawan Tetap</span></span>
                            </div>
                        </div>

                        <!-- Income and Deductions - Two Column -->
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <!-- Income -->
                            <div>
                                <h3 class="font-bold mb-2 text-sm">PENGHASILAN</h3>
                                <div class="space-y-1 text-xs">
                                    <div class="flex justify-between">
                                        <span>Gaji Pokok</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewGajiPokok">0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Tj. Jabatan</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewTjJabatan">0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Tj. Konsumsi</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewTjKonsumsi">0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Tj. Harian</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewTjHarian">0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Bonus Target</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewBonusTarget">0</span>
                                    </div>
                                    <div class="border-t border-black pt-1 mt-1 flex justify-between font-bold">
                                        <span>Total (A)</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewTotalIncome">Rp 0</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Deductions -->
                            <div>
                                <h3 class="font-bold mb-2 text-sm">POTONGAN</h3>
                                <div class="space-y-1 text-xs">
                                    <div class="flex justify-between">
                                        <span>PPh 21</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewPph21">-</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Asuransi</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewAsuransi">-</span>
                                    </div>
                                    <div class="border-t border-black pt-1 mt-1 flex justify-between font-bold">
                                        <span>Total (B)</span>
                                        <span class="text-right">=</span>
                                        <span class="text-right w-24" id="previewTotalDeduction">Rp 0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Net Salary with GRAY BACKGROUND -->
                        <div class="mb-2" style="background-color: #e5e7eb; padding: 8px; border-radius: 4px;">
                            <div class="flex justify-between font-bold text-sm">
                                <span>PENERIMAAN BERSIH (A - B)</span>
                                <span>=</span>
                                <span id="previewNetSalary">Rp 0</span>
                            </div>
                        </div>

                        <!-- Terbilang with GRAY BACKGROUND -->
                        <div class="mb-4" style="background-color: #e5e7eb; padding: 8px; border-radius: 4px;">
                            <div class="text-xs italic">
                                <span class="font-normal">Terbilang: # </span>
                                <span class="lowercase" id="previewTerbilang">nol rupiah</span>
                                <span class="font-normal"> #</span>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="mt-8 text-right">
                            <div class="text-sm mb-1">
                                <p id="previewPlaceDate">Bogor, 31 Maret 2023</p>
                            </div>
                            <div class="text-sm">
                                <p class="mb-16">Keuangan</p>
                            </div>
                        </div>

                        <div class="mt-2 text-right">
                            <div class="text-sm">
                                <p class="mb-16">Febriansyah</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/app.js"></script>
</body>
</html>

