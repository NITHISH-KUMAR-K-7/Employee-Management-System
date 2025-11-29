

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import { useState } from "react";

function App() {
  const [employee, setEmployee] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  return (
    <div
      className="p-5 sm:p-8 md:p-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 xl:gap-20"
    >

      <div className="col-span-1 space-y-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-white font-bold">
          Employee Management
        </h1>
        
      {/* left side */}
        <EmployeeForm
          setEmployee={setEmployee}
          employee={employee}
          editEmployee={editEmployee}
          setEditEmployee={setEditEmployee}
        />
      </div>

     {/* Right side */}
      <div
        className="
          col-span-1
          md:col-span-1
          lg:col-span-2
        "
      >
        <EmployeeList
          setEmployee={setEmployee}
          employee={employee}
          setEditEmployee={setEditEmployee}
        />
      </div>
    </div>
  );
}

export default App;
