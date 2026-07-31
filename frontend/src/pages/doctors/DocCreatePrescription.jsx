import { useState } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";

export default function DocCreatePrescription({ onBack }) {

    const { id } = useParams();

    const [medicines, setMedicines] = useState([
        {
            name:"",
            dose:"",
            frequency:"",
            duration:""
        }
    ]);


    const addMedicine = () => {

        setMedicines([
            ...medicines,
            {
                name:"",
                dose:"",
                frequency:"",
                duration:""
            }
        ]);

    };


    const removeMedicine = (index)=>{

        const updated = medicines.filter(
            (_,i)=>i!==index
        );

        setMedicines(updated);

    };


    return (

        <div className="space-y-6">


            {/* Header */}

            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold">
                        Create Prescription
                    </h1>

                    <p className="text-gray-500">
                        Patient ID : {id}
                    </p>
                </div>


                <button
                    onClick={onBack}
                    className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                    ← Back
                </button>

            </div>



            {/* Patient Info */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-4">
                    Patient Details
                </h2>


                <div className="grid md:grid-cols-4 gap-5">

                    <input
                    className="border p-3 rounded-lg"
                    placeholder="Patient Name"
                    />


                    <input
                    className="border p-3 rounded-lg"
                    placeholder="Age"
                    />


                    <input
                    className="border p-3 rounded-lg"
                    placeholder="Gender"
                    />


                    <input
                    className="border p-3 rounded-lg"
                    value={id}
                    readOnly
                    />

                </div>

            </div>




            {/* Symptoms */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-3">
                    Symptoms
                </h2>


                <textarea
                className="border rounded-lg w-full p-3"
                rows="3"
                placeholder="Enter symptoms..."
                />

            </div>





            {/* Diagnosis */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-3">
                    Diagnosis
                </h2>


                <textarea
                className="border rounded-lg w-full p-3"
                rows="3"
                placeholder="Enter diagnosis..."
                />

            </div>






            {/* Medicines */}

            <div className="bg-white rounded-xl shadow p-6">


                <div className="flex justify-between mb-5">

                    <h2 className="text-xl font-bold">
                        Medicines
                    </h2>


                    <button
                    onClick={addMedicine}
                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg"
                    >

                    <FiPlus/>
                    Add Medicine

                    </button>


                </div>



                {
                medicines.map((medicine,index)=>(

                    <div
                    key={index}
                    className="grid md:grid-cols-5 gap-3 mb-3"
                    >


                    <input
                    className="border p-3 rounded-lg"
                    placeholder="Medicine"
                    />


                    <input
                    className="border p-3 rounded-lg"
                    placeholder="Dose"
                    />


                    <input
                    className="border p-3 rounded-lg"
                    placeholder="Frequency"
                    />


                    <input
                    className="border p-3 rounded-lg"
                    placeholder="Duration"
                    />


                    <button
                    onClick={()=>removeMedicine(index)}
                    className="bg-red-500 text-white rounded-lg flex justify-center items-center"
                    >

                    <FiTrash2/>

                    </button>


                    </div>

                ))
                }


            </div>





            {/* Advice */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-3">
                    Advice
                </h2>


                <textarea
                className="border rounded-lg w-full p-3"
                rows="3"
                placeholder="Doctor advice..."
                />


            </div>





            {/* Follow up */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-3">
                    Next Visit Date
                </h2>


                <input
                type="date"
                className="border p-3 rounded-lg"
                />


            </div>





            <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg"
            >

                Save Prescription

            </button>


        </div>

    );
}