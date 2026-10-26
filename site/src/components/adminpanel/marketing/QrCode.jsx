import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

// Розмір файлу для друку (листівки, банери)
const DOWNLOAD_SIZE = 1024;

const downloadFile = (href, fileName) => {
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  link.click();
};

function QrCode({
  value,
  fileName = "qr-code",
  size = 200,
  dark = "#22282B",
  light = "#FFFFFF",
  errorCorrectionLevel = "M",
}) {
  const canvasRef = useRef(null);
  const options = {
    margin: 2,
    errorCorrectionLevel,
    color: { dark, light },
  };

  useEffect(() => {
    if (!value || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, { ...options, width: size }).catch(
      (error) => console.error("Error rendering QR code:", error)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, size, dark, light, errorCorrectionLevel]);

  const downloadPng = async () => {
    const dataUrl = await QRCode.toDataURL(value, {
      ...options,
      width: DOWNLOAD_SIZE,
    });
    downloadFile(dataUrl, `${fileName}.png`);
  };

  const downloadSvg = async () => {
    const svg = await QRCode.toString(value, { ...options, type: "svg" });
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    downloadFile(url, `${fileName}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (!value) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} className="rounded border bg-white" />
      <div className="flex gap-2">
        <button
          onClick={downloadPng}
          className="bg-Nblue text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          PNG
        </button>
        <button
          onClick={downloadSvg}
          className="bg-slate-500 text-white text-sm px-3 py-1 rounded hover:bg-slate-600 transition"
        >
          SVG
        </button>
      </div>
    </div>
  );
}

export default QrCode;
