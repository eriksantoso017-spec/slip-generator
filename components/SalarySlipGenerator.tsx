"use client";

import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Separator,
} from "@/components/ui";
import { Upload, Download } from "lucide-react";

function SalarySlipGenerator() {
  // Company Details
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState(
    "PT. KWT. CAKRAWALA NUANSA NIRWANA"
  );
  const [companyAddress, setCompanyAddress] = useState(
    "Jl. Abdul Fatah KM 4 Kp. Babakan Nyamplung Rt. 05/05 Desa Cinangka Kec. Cempea Kab. Bogor 16620"
  );

  // Salary Period
  const [period, setPeriod] = useState("1 Maret 2023 - 31 Maret 2023");

  // Employee Details
  const [employeeId, setEmployeeId] = useState("2004030");
  const [employeeName, setEmployeeName] = useState("INDRA GUNARDI");
  const [position, setPosition] = useState("Mechanical Engineering");
  const [status, setStatus] = useState("Karyawan Tetap");

  // Income
  const [gajiPokok, setGajiPokok] = useState(5000000);
  const [tjJabatan, setTjJabatan] = useState(1200000);
  const [tjKonsumsi, setTjKonsumsi] = useState(455000);
  const [tjHarian, setTjHarian] = useState(520000);
  const [bonusTarget, setBonusTarget] = useState(850000);

  // Deductions
  const [pph21, setPph21] = useState(0);
  const [asuransi, setAsuransi] = useState(0);

  // Footer
  const [place, setPlace] = useState("Bogor");
  const [date, setDate] = useState("31 Maret 2023");
  const [signatureName, setSignatureName] = useState("Febriansyah");
  const [signaturePosition, setSignaturePosition] = useState("Keuangan");

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate totals
  const totalIncome =
    gajiPokok + tjJabatan + tjKonsumsi + tjHarian + bonusTarget;
  const totalDeduction = pph21 + asuransi;
  const netSalary = totalIncome - totalDeduction;

  // Format Indonesian currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };

  // Convert number to Indonesian words
  const numberToWords = (num: number): string => {
    const ones = [
      "",
      "Satu",
      "Dua",
      "Tiga",
      "Empat",
      "Lima",
      "Enam",
      "Tujuh",
      "Delapan",
      "Sembilan",
    ];
    const teens = [
      "Sepuluh",
      "Sebelas",
      "Dua Belas",
      "Tiga Belas",
      "Empat Belas",
      "Lima Belas",
      "Enam Belas",
      "Tujuh Belas",
      "Delapan Belas",
      "Sembilan Belas",
    ];
    const tens = [
      "",
      "",
      "Dua Puluh",
      "Tiga Puluh",
      "Empat Puluh",
      "Lima Puluh",
      "Enam Puluh",
      "Tujuh Puluh",
      "Delapan Puluh",
      "Sembilan Puluh",
    ];

    if (num === 0) return "Nol";

    const convertHundreds = (n: number): string => {
      let result = "";
      const hundred = Math.floor(n / 100);
      const remainder = n % 100;

      if (hundred > 0) {
        result += hundred === 1 ? "Seratus" : ones[hundred] + " Ratus";
      }

      if (remainder >= 10 && remainder < 20) {
        result += (result ? " " : "") + teens[remainder - 10];
      } else {
        const ten = Math.floor(remainder / 10);
        const one = remainder % 10;

        if (ten > 0) {
          result += (result ? " " : "") + tens[ten];
        }

        if (one > 0) {
          result += (result ? " " : "") + ones[one];
        }
      }

      return result;
    };

    if (num < 1000) {
      return convertHundreds(num);
    }

    const billion = Math.floor(num / 1000000000);
    const million = Math.floor((num % 1000000000) / 1000000);
    const thousand = Math.floor((num % 1000000) / 1000);
    const remainder = num % 1000;

    let result = "";

    if (billion > 0) {
      result +=
        billion === 1 ? "Satu Miliar" : convertHundreds(billion) + " Miliar";
    }

    if (million > 0) {
      result +=
        (result ? " " : "") +
        (million === 1 ? "Satu Juta" : convertHundreds(million) + " Juta");
    }

    if (thousand > 0) {
      result +=
        (result ? " " : "") +
        (thousand === 1 ? "Seribu" : convertHundreds(thousand) + " Ribu");
    }

    if (remainder > 0) {
      result += (result ? " " : "") + convertHundreds(remainder);
    }

    return result;
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          setCompanyLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportToPNG = async () => {
    if (!previewRef.current) return;

    try {
      // Dynamic import for client-side only - html2canvas is browser-only
      const html2canvasModule = await import("html2canvas");
      const html2canvas = html2canvasModule.default;
      const canvas = await html2canvas(previewRef.current as HTMLElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        width: 595, // A4 portrait width in pixels
        height: 842, // A4 portrait height in pixels
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `slip-gaji-${employeeName.replace(
        /\s+/g,
        "-"
      )}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error exporting to PNG:", error);
      alert("Gagal mengekspor slip gaji. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            Generator Slip Gaji
          </h1>
          <Button onClick={handleExportToPNG} className="gap-2">
            <Download size={18} />
            Export PNG
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Input Form */}
          <Card className="h-fit">
            <CardContent className="pt-6 space-y-6">
              {/* Company Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Data Perusahaan
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo Perusahaan</Label>
                  <div className="flex gap-2">
                    <Input
                      ref={fileInputRef}
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2"
                    >
                      <Upload size={16} />
                      Upload Logo
                    </Button>
                    {companyLogo && (
                      <img
                        src={companyLogo}
                        alt="Logo"
                        className="h-10 w-10 object-contain rounded"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Nama Perusahaan</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Alamat Perusahaan</Label>
                  <Input
                    id="companyAddress"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Periode Gaji</Label>
                  <Input
                    id="period"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="1 Maret 2023 - 31 Maret 2023"
                  />
                </div>
              </div>

              <Separator />

              {/* Employee Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Data Karyawan
                </h2>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">ID Karyawan</Label>
                    <Input
                      id="employeeId"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeName">Nama Karyawan</Label>
                    <Input
                      id="employeeName"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Jabatan</Label>
                    <Input
                      id="position"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Input
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Income */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Penghasilan
                </h2>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="gajiPokok">Gaji Pokok</Label>
                    <Input
                      id="gajiPokok"
                      type="number"
                      value={gajiPokok}
                      onChange={(e) => setGajiPokok(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tjJabatan">Tunjangan Jabatan</Label>
                    <Input
                      id="tjJabatan"
                      type="number"
                      value={tjJabatan}
                      onChange={(e) => setTjJabatan(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tjKonsumsi">Tunjangan Konsumsi</Label>
                    <Input
                      id="tjKonsumsi"
                      type="number"
                      value={tjKonsumsi}
                      onChange={(e) => setTjKonsumsi(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tjHarian">Tunjangan Harian</Label>
                    <Input
                      id="tjHarian"
                      type="number"
                      value={tjHarian}
                      onChange={(e) => setTjHarian(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bonusTarget">Bonus Target</Label>
                    <Input
                      id="bonusTarget"
                      type="number"
                      value={bonusTarget}
                      onChange={(e) => setBonusTarget(Number(e.target.value))}
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center font-semibold">
                    <span>Total Penghasilan (A):</span>
                    <span>Rp {formatCurrency(totalIncome)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Deductions */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Potongan
                </h2>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="pph21">PPh 21</Label>
                    <Input
                      id="pph21"
                      type="number"
                      value={pph21}
                      onChange={(e) => setPph21(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asuransi">Asuransi</Label>
                    <Input
                      id="asuransi"
                      type="number"
                      value={asuransi}
                      onChange={(e) => setAsuransi(Number(e.target.value))}
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center font-semibold">
                    <span>Total Potongan (B):</span>
                    <span>Rp {formatCurrency(totalDeduction)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Net Salary */}
              <div className="space-y-2 bg-primary/10 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Penerimaan Bersih (A - B):</span>
                  <span className="text-primary">
                    Rp {formatCurrency(netSalary)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Footer */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Informasi Tambahan
                </h2>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="place">Tempat</Label>
                    <Input
                      id="place"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Tanggal</Label>
                    <Input
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signaturePosition">
                      Jabatan Pemberi TTD
                    </Label>
                    <Input
                      id="signaturePosition"
                      value={signaturePosition}
                      onChange={(e) => setSignaturePosition(e.target.value)}
                      placeholder="Keuangan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signatureName">Nama Pemberi TTD</Label>
                    <Input
                      id="signatureName"
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                      placeholder="Febriansyah"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card>
              <CardContent className="p-0">
                <div
                  ref={previewRef}
                  className="bg-white p-8 text-black"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    width: "595px",
                    minHeight: "842px",
                    margin: "0 auto",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-2">
                    {companyLogo && (
                      <img
                        src={companyLogo}
                        alt="Logo"
                        className="w-20 h-20 object-contain"
                      />
                    )}
                    <div className="flex-1 text-center">
                      <h2 className="text-base font-bold mb-1">
                        {companyName}
                      </h2>
                      <p className="text-xs leading-relaxed">
                        {companyAddress}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center my-4">
                    <h1 className="text-lg font-bold underline">
                      SLIP GAJI KARYAWAN
                    </h1>
                    <p className="text-sm mt-2">Periode {period}</p>
                  </div>

                  {/* Employee Details - Each in SINGLE ROW */}
                  <div className="space-y-1 mb-4 text-sm">
                    <div className="flex">
                      <span className="w-32 font-normal">ID. No.</span>
                      <span className="font-normal">: {employeeId}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-normal">Nama</span>
                      <span className="font-normal">: {employeeName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-normal">Jabatan</span>
                      <span className="font-normal">: {position}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-normal">Status</span>
                      <span className="font-normal">: {status}</span>
                    </div>
                  </div>

                  {/* Income and Deductions - Two Column */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Income */}
                    <div>
                      <h3 className="font-bold mb-2 text-sm">PENGHASILAN</h3>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Gaji Pokok</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            {formatCurrency(gajiPokok)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tj. Jabatan</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            {formatCurrency(tjJabatan)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tj. Konsumsi</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            {formatCurrency(tjKonsumsi)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tj. Harian</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            {formatCurrency(tjHarian)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bonus Target</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            {formatCurrency(bonusTarget)}
                          </span>
                        </div>
                        <div className="border-t border-black pt-1 mt-1 flex justify-between font-bold">
                          <span>Total (A)</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            Rp {formatCurrency(totalIncome)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Deductions */}
                    <div>
                      <h3 className="font-bold mb-2 text-sm">POTONGAN</h3>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>PPh 21</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            {pph21 > 0 ? formatCurrency(pph21) : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Asuransi</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            {asuransi > 0 ? formatCurrency(asuransi) : "-"}
                          </span>
                        </div>
                        <div className="border-t border-black pt-1 mt-1 flex justify-between font-bold">
                          <span>Total (B)</span>
                          <span className="text-right">=</span>
                          <span className="text-right w-24">
                            Rp{" "}
                            {totalDeduction > 0
                              ? formatCurrency(totalDeduction)
                              : "0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Net Salary with GRAY BACKGROUND */}
                  <div
                    className="mb-2"
                    style={{
                      backgroundColor: "#e5e7eb",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="flex justify-between font-bold text-sm">
                      <span>PENERIMAAN BERSIH (A - B)</span>
                      <span>=</span>
                      <span>Rp {formatCurrency(netSalary)}</span>
                    </div>
                  </div>

                  {/* Terbilang with GRAY BACKGROUND and SMALLER FONT */}
                  <div
                    className="mb-4"
                    style={{
                      backgroundColor: "#e5e7eb",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="text-xs italic">
                      <span className="font-normal">Terbilang: # </span>
                      <span className="lowercase">
                        {numberToWords(netSalary)} rupiah
                      </span>
                      <span className="font-normal"> #</span>
                    </div>
                  </div>

                  {/* Footer - Place and Date ABOVE Signature */}
                  <div className="mt-8 text-right">
                    <div className="text-sm mb-1">
                      <p>
                        {place}, {date}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="mb-16">{signaturePosition}</p>
                    </div>
                  </div>

                  <div className="mt-2 text-right">
                    <div className="text-sm">
                      <p className="mb-16">{signatureName}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalarySlipGenerator;
