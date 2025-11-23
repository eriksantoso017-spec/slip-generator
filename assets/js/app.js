$(document).ready(function() {
    // Format Indonesian currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID').format(amount);
    }

    // Convert number to Indonesian words
    function numberToWords(num) {
        const ones = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
        const teens = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];
        const tens = ['', '', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];

        if (num === 0) return 'Nol';

        function convertHundreds(n) {
            let result = '';
            const hundred = Math.floor(n / 100);
            const remainder = n % 100;

            if (hundred > 0) {
                result += hundred === 1 ? 'Seratus' : ones[hundred] + ' Ratus';
            }

            if (remainder >= 10 && remainder < 20) {
                result += (result ? ' ' : '') + teens[remainder - 10];
            } else {
                const ten = Math.floor(remainder / 10);
                const one = remainder % 10;

                if (ten > 0) {
                    result += (result ? ' ' : '') + tens[ten];
                }

                if (one > 0) {
                    result += (result ? ' ' : '') + ones[one];
                }
            }

            return result;
        }

        if (num < 1000) {
            return convertHundreds(num);
        }

        const billion = Math.floor(num / 1000000000);
        const million = Math.floor((num % 1000000000) / 1000000);
        const thousand = Math.floor((num % 1000000) / 1000);
        const remainder = num % 1000;

        let result = '';

        if (billion > 0) {
            result += billion === 1 ? 'Satu Miliar' : convertHundreds(billion) + ' Miliar';
        }

        if (million > 0) {
            result += (result ? ' ' : '') + (million === 1 ? 'Satu Juta' : convertHundreds(million) + ' Juta');
        }

        if (thousand > 0) {
            result += (result ? ' ' : '') + (thousand === 1 ? 'Seribu' : convertHundreds(thousand) + ' Ribu');
        }

        if (remainder > 0) {
            result += (result ? ' ' : '') + convertHundreds(remainder);
        }

        return result;
    }

    // Calculate and update totals
    function updateCalculations() {
        const gajiPokok = parseFloat($('#gajiPokok').val()) || 0;
        const tjJabatan = parseFloat($('#tjJabatan').val()) || 0;
        const tjKonsumsi = parseFloat($('#tjKonsumsi').val()) || 0;
        const tjHarian = parseFloat($('#tjHarian').val()) || 0;
        const bonusTarget = parseFloat($('#bonusTarget').val()) || 0;
        const pph21 = parseFloat($('#pph21').val()) || 0;
        const asuransi = parseFloat($('#asuransi').val()) || 0;

        const totalIncome = gajiPokok + tjJabatan + tjKonsumsi + tjHarian + bonusTarget;
        const totalDeduction = pph21 + asuransi;
        const netSalary = totalIncome - totalDeduction;

        // Update left panel totals
        $('#totalIncome').text('Rp ' + formatCurrency(totalIncome));
        $('#totalDeduction').text('Rp ' + formatCurrency(totalDeduction));
        $('#netSalary').text('Rp ' + formatCurrency(netSalary));

        // Update preview
        updatePreview();
    }

    // Update preview panel
    function updatePreview() {
        // Company details
        const companyLogo = $('#logoPreview').attr('src');
        if (companyLogo) {
            $('#previewLogo').attr('src', companyLogo).removeClass('hidden');
        } else {
            $('#previewLogo').addClass('hidden');
        }
        $('#previewCompanyName').text($('#companyName').val());
        $('#previewCompanyAddress').text($('#companyAddress').val());
        $('#previewPeriod').text($('#period').val());

        // Employee details
        $('#previewEmployeeId').text($('#employeeId').val());
        $('#previewEmployeeName').text($('#employeeName').val());
        $('#previewPosition').text($('#position').val());
        $('#previewStatus').text($('#status').val());

        // Income
        const gajiPokok = parseFloat($('#gajiPokok').val()) || 0;
        const tjJabatan = parseFloat($('#tjJabatan').val()) || 0;
        const tjKonsumsi = parseFloat($('#tjKonsumsi').val()) || 0;
        const tjHarian = parseFloat($('#tjHarian').val()) || 0;
        const bonusTarget = parseFloat($('#bonusTarget').val()) || 0;
        const pph21 = parseFloat($('#pph21').val()) || 0;
        const asuransi = parseFloat($('#asuransi').val()) || 0;

        const totalIncome = gajiPokok + tjJabatan + tjKonsumsi + tjHarian + bonusTarget;
        const totalDeduction = pph21 + asuransi;
        const netSalary = totalIncome - totalDeduction;

        $('#previewGajiPokok').text(formatCurrency(gajiPokok));
        $('#previewTjJabatan').text(formatCurrency(tjJabatan));
        $('#previewTjKonsumsi').text(formatCurrency(tjKonsumsi));
        $('#previewTjHarian').text(formatCurrency(tjHarian));
        $('#previewBonusTarget').text(formatCurrency(bonusTarget));
        $('#previewTotalIncome').text('Rp ' + formatCurrency(totalIncome));

        $('#previewPph21').text(pph21 > 0 ? formatCurrency(pph21) : '-');
        $('#previewAsuransi').text(asuransi > 0 ? formatCurrency(asuransi) : '-');
        $('#previewTotalDeduction').text('Rp ' + (totalDeduction > 0 ? formatCurrency(totalDeduction) : '0'));

        $('#previewNetSalary').text('Rp ' + formatCurrency(netSalary));
        $('#previewTerbilang').text(numberToWords(netSalary).toLowerCase() + ' rupiah');

        // Footer
        const place = $('#place').val();
        const date = $('#date').val();
        $('#previewPlaceDate').text(place + ', ' + date);
    }

    // Logo upload handler
    $('#uploadLogoBtn').on('click', function() {
        $('#logo').click();
    });

    $('#logo').on('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function() {
                const result = reader.result;
                if (result) {
                    $('#logoPreview').attr('src', result).removeClass('hidden');
                    updatePreview();
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Input change handlers - update preview in real-time
    $('#companyName, #companyAddress, #period, #employeeId, #employeeName, #position, #status, #place, #date').on('input', function() {
        updatePreview();
    });

    // Number input change handlers - update calculations and preview
    $('#gajiPokok, #tjJabatan, #tjKonsumsi, #tjHarian, #bonusTarget, #pph21, #asuransi').on('input', function() {
        updateCalculations();
    });

    // Export to PNG
    $('#exportBtn').on('click', function() {
        const employeeName = $('#employeeName').val().replace(/\s+/g, '-');
        const fileName = 'slip-gaji-' + employeeName + '-' + Date.now() + '.png';

        html2canvas(document.getElementById('previewRef'), {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false
        }).then(function(canvas) {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(function(error) {
            console.error('Error exporting to PNG:', error);
            alert('Gagal mengekspor slip gaji. Silakan coba lagi.');
        });
    });

    // Initial calculation and preview update
    updateCalculations();
});

