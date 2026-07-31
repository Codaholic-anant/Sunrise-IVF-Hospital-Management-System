import {
  FiHome,
  FiCheckCircle,
  FiXCircle,
  FiActivity,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Hospitals",
    value: 12,
    icon: FiHome,
    color: "bg-cyan-500",
  },
  {
    title: "Active",
    value: 10,
    icon: FiCheckCircle,
    color: "bg-green-500",
  },
  {
    title: "Inactive",
    value: 2,
    icon: FiXCircle,
    color: "bg-red-500",
  },
  {
    title: "Total Beds",
    value: 1450,
    icon: FiActivity,
    color: "bg-purple-500",
  },
];

export default function HospitalStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center`}
              >
                <Icon className="text-white text-2xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}