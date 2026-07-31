import { useState } from "react";
import DocCreatePrescription from "./DocCreatePrescription";
// import DocPrescription from "./DocPrescription";
export default function DocPrescriptions() {

    const [showForm, setShowForm] = useState(false);

    const prescriptions = [
        {
            id:1,
            date:"22 Jul 2026",
            diagnosis:"Fever",
            doctor:"Dr. Sharma"
        },
        {
            id:2,
            date:"18 Jul 2026",
            diagnosis:"Hypertension",
            doctor:"Dr. Sharma"
        }
    ];

    if(showForm){
        return <DocCreatePrescription />;
    }

    return (

        <div>

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">
                    Prescription History
                </h2>

                <button
                    onClick={()=>setShowForm(true)}
                    className="bg-teal-600 text-white px-5 py-2 rounded-lg"
                >
                    + New Prescription
                </button>

            </div>

            <table className="w-full">

                <thead className="bg-teal-600 text-white">

                    <tr>

                        <th className="p-3">Date</th>
                        <th>Diagnosis</th>
                        <th>Doctor</th>

                    </tr>

                </thead>

                <tbody>

                    {prescriptions.map((item)=>(

                        <tr key={item.id} className="border-b">

                            <td className="p-3">{item.date}</td>

                            <td>{item.diagnosis}</td>

                            <td>{item.doctor}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}