
import React, { useState } from 'react';
import axios from 'axios'


function EmployeeForm({ setEmployee, employee }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("Frontend Developer");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.post("http://localhost:5000/employees", {
        name,
        email,
        salary,
        phone,
        position,
      });
      setEmployee([res.data, ...employee]);
      setName("");
      setEmail("");
      setSalary("");
      setPhone("");
      setPosition("Frontend Developer");
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Name"
          className="bg-blue-50 p-3 rounded w-full text-blue-950 outline-0"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="bg-blue-50 p-3 rounded w-full text-blue-950 outline-0"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Salary"
          className="bg-blue-50 p-3 rounded w-full text-blue-950 outline-0"
          value={salary}
          required
          onChange={(e) => setSalary(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="bg-blue-50 p-3 rounded w-full text-blue-950 outline-0"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          value={position}
          className="bg-blue-50 p-3 rounded w-full text-blue-950 outline-0 cursor-pointer"
          required
          onChange={(e) => setPosition(e.target.value)}
        >
          <option value="Frontend Developer" className="outline-0">
            Frontend Developer
          </option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 w-full p-3 rounded text-white hover:bg-blue-600 cursor-pointer transition mt-3"
        >
          {saving ? "Saving..." : "Add"}
        </button>
      </form>
    </div>
  );
}

 export default EmployeeForm

