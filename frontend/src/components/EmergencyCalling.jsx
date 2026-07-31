import { useState } from "react";
import { FiPhoneCall, FiMessageCircle, FiX } from "react-icons/fi";

export default function EmergencyButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Emergency Menu */}
      {open && (
        <div className="mb-4 w-72 rounded-2xl bg-white shadow-2xl border border-red-200 p-4">

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-red-600">
              🚨 Emergency
            </h2>

            <button onClick={() => setOpen(false)}>
              <FiX size={20} />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Need immediate medical assistance?
          </p>

          {/* Call */}
          <a
            href="tel:+911234567890"
            className="flex items-center gap-3 rounded-xl bg-red-50 hover:bg-red-100 p-3 transition mb-3"
          >
            <FiPhoneCall className="text-red-600" size={22} />

            <div>
              <h3 className="font-semibold">Call Hospital</h3>
              <p className="text-xs text-gray-500">
                +91 12345 67890
              </p>
            </div>
          </a>

          {/* SMS */}
          <a
            href="sms:+911234567890?body=Emergency! Please send an ambulance."
            className="flex items-center gap-3 rounded-xl bg-blue-50 hover:bg-blue-100 p-3 transition"
          >
            <FiMessageCircle className="text-blue-600" size={22} />

            <div>
              <h3 className="font-semibold">Send Emergency SMS</h3>
              <p className="text-xs text-gray-500">
                Notify Hospital
              </p>
            </div>
          </a>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl animate-pulse flex items-center justify-center transition"
      >
        <FiPhoneCall size={30} />
      </button>

    </div>
  );
}