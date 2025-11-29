

import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import NoData from "./NoData";

function EmployeeList({ setEmployee, employee }) {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Position");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const query = `?position=${filter}&search=${search}`;
        const res = await axios.get(`http://localhost:5000/employees${query}`);
        setEmployee(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchEmployee();
  }, [filter, search, setEmployee]);

  const handlePositionChange = async (id, position) => {
    try {
      await axios.put(`http://localhost:5000/employees/${id}`, { position });
      setEmployee((prev) =>
        prev.map((emp) => (emp._id === id ? { ...emp, position } : emp))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure want to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        setEmployee((prev) => prev.filter((emp) => emp._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="mt-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="p-3 rounded bg-blue-800 text-white cursor-pointer outline-0"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Position</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or position"
          className="p-3 rounded bg-blue-50 outline-0 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader />
      ) : employee.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          {employee.map((emp) => (
            <div
              key={emp._id}
              className="bg-blue-50 rounded-lg p-5 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-bold text-blue-900">{emp.name}</h3>
                <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium">
                  ₹ {emp.salary}
                </p>
              </div>

              <div className="text-gray-700 border p-3 rounded mb-4 flex flex-col gap-2">
                <p>📩 {emp.email}</p>
                <p>📞 {emp.phone}</p>
              </div>

              <div className="flex justify-between items-center">
                <select
                  value={emp.position}
                  className="p-2 text-sm rounded shadow outline-0 cursor-pointer"
                  onChange={(e) =>
                    handlePositionChange(emp._id, e.target.value)
                  }
                >
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                </select>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  onClick={() => handleDelete(emp._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
