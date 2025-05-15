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
    <div className="fixed bottom-16 left-1 md:bottom-4 md:left-auto md:right-8 z-50 flex flex-col items-center space-y-1">
      {/* الدائرة الخضراء مع الأيقونة */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-10 w-10" />
      </a>

      {/* الكلمة بدون خلفية */}
      <a
        dir="rtl"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block text-white text-xs cursor-pointer select-none"
        aria-label="Chat on WhatsApp"
      >
        تواصل واتساب !
      </a>
    </div>
  );
};
