import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "../redux/actions/employeeActions";
import { FiUser, FiBriefcase, FiPhone, FiImage, FiSave } from "react-icons/fi";

const EmployeeForm = ({ employee, onSave }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: employee ? employee.name : "",
    position: employee ? employee.position : "",
    contact: employee ? employee.contact : "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("position", formData.position);
    data.append("contact", formData.contact);
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }

    try {
      if (employee) {
        await dispatch(updateEmployee(employee.id, data));
      } else {
        await dispatch(addEmployee(data));
      }
      setFormData({
        name: "",
        position: "",
        contact: "",
        profilePic: null,
      });
      if (onSave) onSave();
    } catch (error) {
      console.error("Error saving employee data", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex items-center border rounded-lg focus-within:border-indigo-500 px-3 py-2">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-lg focus-within:border-indigo-500 px-3 py-2">
            <FiBriefcase className="text-gray-400 mr-2" />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              required
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-lg focus-within:border-indigo-500 px-3 py-2">
            <FiPhone className="text-gray-400 mr-2" />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
              required
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-lg focus-within:border-indigo-500 px-3 py-2">
            <FiImage className="text-gray-400 mr-2" />
            <input
              type="file"
              name="profilePic"
              onChange={handleChange}
              className="w-full outline-none file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          <FiSave className="text-lg" />
          <span>Save Employee</span>
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
