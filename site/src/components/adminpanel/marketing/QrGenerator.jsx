import React, { useState } from "react";
import QrCode from "./QrCode";

// Довільний QR-код: посилання, текст, телефон тощо. Такі сканування не рахуються —
// для обліку створіть рекламну кампанію.
function QrGenerator() {
  const [value, setValue] = useState("https://prano.group");
  const [fileName, setFileName] = useState("prano-qr");
  const [dark, setDark] = useState("#22282B");
  const [light, setLight] = useState("#FFFFFF");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-1">Генератор QR-кодів</h3>
      <p className="text-sm text-gray-500 mb-4">
        Сканування таких кодів не рахуються. Щоб бачити статистику — створіть
        рекламну кампанію.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-sm">
            Посилання або текст
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={3}
              className="p-2 mt-1 border rounded w-full"
            />
          </label>
          <label className="text-sm">
            Назва файлу
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="p-2 mt-1 border rounded w-full"
            />
          </label>
          <div className="flex gap-4">
            <label className="text-sm flex items-center gap-2">
              Колір
              <input type="color" value={dark} onChange={(e) => setDark(e.target.value)} />
            </label>
            <label className="text-sm flex items-center gap-2">
              Фон
              <input type="color" value={light} onChange={(e) => setLight(e.target.value)} />
            </label>
          </div>
          <label className="text-sm">
            Стійкість до пошкоджень
            <select
              value={errorCorrectionLevel}
              onChange={(e) => setErrorCorrectionLevel(e.target.value)}
              className="p-2 mt-1 border rounded w-full"
            >
              <option value="L">Низька (7%)</option>
              <option value="M">Середня (15%)</option>
              <option value="Q">Висока (25%)</option>
              <option value="H">Максимальна (30%)</option>
            </select>
          </label>
        </div>

        <div className="flex justify-center">
          <QrCode
            value={value.trim()}
            fileName={fileName.trim() || "qr-code"}
            size={220}
            dark={dark}
            light={light}
            errorCorrectionLevel={errorCorrectionLevel}
          />
        </div>
      </div>
    </div>
  );
}

export default QrGenerator;
