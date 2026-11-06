import React from "react";
import { Link } from "react-router-dom";
import { BUTTON_DARK } from "./buttons";

// Відступ для якорів: шапка (92px) + запас
const SCROLL_OFFSET = "scroll-mt-[120px]";

function ServiceSection({ service, index }) {
  const { id, aliases = [], title, lead, image, video, alt, premium, includes, more } =
    service;
  const mediaRight = index % 2 === 1;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${SCROLL_OFFSET} mx-auto max-w-6xl px-5 md:px-8`}
    >
      {aliases.map((alias) => (
        <span key={alias} id={alias} className={`block ${SCROLL_OFFSET}`} aria-hidden="true" />
      ))}

      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <div
          className={`aspect-[4/3] overflow-hidden bg-Ndark ${
            mediaRight ? "md:order-last" : ""
          }`}
        >
          {video ? (
            <video
              src={video}
              poster={image}
              autoPlay
              muted
              loop
              playsInline
              aria-label={alt}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={image}
              alt={alt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="font-manrope">
          {premium && (
            <p className="mb-3 text-sm text-[#8C6D35]">Преміум-догляд</p>
          )}
          <h2
            id={`${id}-title`}
            className="font-playfair text-3xl font-normal leading-tight text-Ndark md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 leading-relaxed text-logoGray">{lead}</p>

          <h3 className="mt-6 text-sm font-semibold text-Ndark">Що входить</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-logoGray marker:text-Ndark/30">
            {includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link to="/price" className={BUTTON_DARK}>
              Ціни
            </Link>
            {more && (
              <Link to={more.to} className={BUTTON_DARK}>
                {more.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;
