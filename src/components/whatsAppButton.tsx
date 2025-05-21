import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello, I'm interested in your products!",
}) => {
  const [showButton, setShowButton] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500); // 5 ثواني

    return () => clearTimeout(timer);
  }, []);

  const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  if (!showButton) return null;

  return (
    <>
      {/* زر الواتساب على اللابتوب (أخضر في الأسفل اليمين) */}
      <div className="hidden md:flex fixed bottom-4 right-8 z-50 flex-col items-center space-y-1">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-10 w-10" />
        </a>
        <a
          dir="rtl"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-xs cursor-pointer select-none"
          aria-label="Chat on WhatsApp"
        >
          تواصل واتساب!
        </a>
      </div>

      {/* زر الواتساب على الموبايل (أسود في الأعلى اليسار) */}
      <div className="flex md:hidden fixed top-1/4 -translate-y-1/2 left-4 z-50 flex-col items-center space-y-1">
        {" "}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-gray-800 text-white p-1 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-10 w-10" />
        </a>
      </div>
    </>
  );
};
