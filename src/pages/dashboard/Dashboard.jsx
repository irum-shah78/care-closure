// import React from "react";
// import Header from "../../components/header/Header";
// import Sidebar from "../../components/sidebar/Sidebar";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       <Sidebar />
//       <main className="flex-1">
//         <Header />
//         <div className="px-8">
//           <h2 className="text-2xl font-bold mt-4">Dashboard</h2>
//           <p>Welcome to the dashboard!</p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="px-8 py-4">
          {/* Dashboard Header */}
          <h2 className="text-3xl font-bold mt-4">Welcome to CareFlow</h2>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Total Patients</h3>
              <p className="text-4xl font-extrabold text-indigo-600 mt-2">1248</p>
              <p className="text-sm text-green-500 mt-1">+20% from last month</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Appointments Today</h3>
              <p className="text-4xl font-extrabold text-indigo-600 mt-2">42</p>
              <p className="text-sm text-purple-500 mt-1">12 Remaining</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Compliance Score</h3>
              <p className="text-4xl font-extrabold text-indigo-600 mt-2">98%</p>
              <p className="text-sm text-green-500 mt-1">+2% from last week</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">January - 2024</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Mon - Sun</p>
                {/* Add calendar component or styling */}
              </div>
            </div>
          </div>

          {/* Next Patient Section */}
          <div className="mt-10 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800">Next Patient</h3>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                  CM
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-800">Mr. Chris Mathews</h4>
                  <p className="text-sm text-gray-500">Male, 54 Years</p>
                  <p className="text-sm text-gray-500">2nd Appointment</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-indigo-500 font-semibold">Waiting</p>
                <p className="text-lg font-bold text-gray-800">10:00 AM</p>
                <p className="text-sm text-gray-500">11 Nov 2014</p>
              </div>
            </div>
          </div>

          {/* Patient Queue Table */}
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800">Patient Queue</h3>
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="text-left text-sm font-semibold text-gray-600 border-b">
                  <th className="py-2">ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Appointment</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with dynamic data */}
                {[
                  { id: "#214", name: "Christopher", age: 32, gender: "Male", appointment: "First Appointment", time: "10:00 AM", status: "In Progress", date: "Aug 12, 24", action: "Check In" },
                  { id: "#215", name: "Emily", age: 56, gender: "Female", appointment: "Second Appointment", time: "11:00 AM", status: "Waiting", date: "Aug 12, 24", action: "Check Out" },
                ].map((patient, index) => (
                  <tr key={index} className="text-sm text-gray-800 border-b">
                    <td className="py-2">{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.appointment}</td>
                    <td>{patient.time}</td>
                    <td>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white ${
                          patient.status === "In Progress" ? "bg-indigo-500" : "bg-yellow-500"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td>{patient.date}</td>
                    <td>
                      <button className="text-indigo-600 hover:underline">{patient.action}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
