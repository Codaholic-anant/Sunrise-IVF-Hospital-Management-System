// import DoctorLayout from "../../layouts/DoctorLayout";
import {
  FiUsers,
  FiCalendar,
  FiActivity,
  FiAlertTriangle,
} from "react-icons/fi";

export default function DoctorDashboards() {

  const cards = [
    {
      title: "Today's Patients",
      value: 24,
      icon: <FiUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Appointments",
      value: 18,
      icon: <FiCalendar />,
      color: "bg-green-500",
    },
    {
      title: "Pending Reports",
      value: 6,
      icon: <FiActivity />,
      color: "bg-orange-500",
    },
    {
      title: "Emergency",
      value: 2,
      icon: <FiAlertTriangle />,
      color: "bg-red-500",
    },
  ];

  return (
    <div>

      <h2 className="text-3xl font-bold text-slate-800">
        Welcome Back 👋
      </h2>

      <p className="text-slate-500 mt-2">
        Here's today's hospital overview.
      </p>

      {/* Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.color} w-14 h-14 rounded-xl text-white flex items-center justify-center text-2xl`}
              >
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Queue */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="font-bold text-xl mb-5">
            Today's Queue
          </h3>

          {[
            "Rahul Kumar",
            "Neha Sharma",
            "Aman Singh",
            "Rohit Verma",
          ].map((patient, index) => (

            <div
              key={patient}
              className="flex justify-between border-b py-3"
            >
              <span>
                {index + 1}. {patient}
              </span>

              <span className="text-teal-600 font-semibold">
                Waiting
              </span>

            </div>

          ))}

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="font-bold text-xl mb-5">
            Recent Activity
          </h3>

          <ul className="space-y-4">

            <li>✅ Prescription added for Rahul Kumar</li>

            <li>🧪 Blood Report uploaded</li>

            <li>📅 Appointment booked</li>

            <li>💊 Medicine prescribed</li>

          </ul>

        </div>

      </div>

    </div>
  );
}