import React from "react";

function contacts() {
  return (
    <div className="min-h-screen">
      <div></div>
      <div className="flex items-center justify-center p-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d909.615881387787!2d24.026415534866796!3d49.84654919847564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add0ccfd9e63f%3A0xc15e4a8be7be479c!2sVesela%20St%2C%205%2C%20L&#39;viv%2C%20L&#39;vivs&#39;ka%20oblast%2C%2079000!5e0!3m2!1sen!2sua!4v1738653628602!5m2!1sen!2sua"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default contacts;
