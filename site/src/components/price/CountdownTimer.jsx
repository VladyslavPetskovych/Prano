import React, { useEffect, useState } from "react";

export default function CountdownTimer({ end, discount = 30 }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, finished: false });

  useEffect(() => {
    const ts = new Date(end).getTime();
    if (Number.isNaN(ts)) return;

    const tick = () => {
      const diff = ts - Date.now();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0, finished: true });

      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [end]);

  if (t.finished)
    return (
      <div className="text-red-600 font-bold text-center text-lg">
        Акція завершена
      </div>
    );

  const fmt = (n) => String(n).padStart(2, "0");

  return (
    <div className="w-full flex flex-col items-center gap-2 mb-4">
      {/* Discount badge */}
      <div className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-extrabold rounded-full text-sm sm:text-base shadow-md animate-pulse">
        🔥 -{discount}% ЗНИЖКА
      </div>

      {/* Timer container */}
      <div className="bg-neutral-900 text-white rounded-2xl px-4 py-3 flex items-center gap-2 sm:gap-4 shadow-lg border border-white/10">
        {[
          { v: fmt(t.d), l: "Дні" },
          { v: fmt(t.h), l: "Год" },
          { v: fmt(t.m), l: "Хв" },
          { v: fmt(t.s), l: "Сек" },
        ].map((b, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-black text-white font-mono text-lg sm:text-xl px-2 sm:px-3 py-1 rounded-lg shadow-inner border border-white/10">
              {b.v}
            </div>
            <span className="text-[10px] sm:text-xs mt-1 text-white/70">
              {b.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
