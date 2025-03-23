import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees, updateEmployee } from "../redux/actions/employeeActions";
import { FiEdit2, FiTrash2, FiUsers, FiAlertCircle, FiLoader } from "react-icons/fi";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { loading, employees, error } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <FiLoader className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-600">
        <FiAlertCircle className="w-6 h-6 mr-2" />
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <FiUsers className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">Employee List</h2>
      </div>

      {Array.isArray(employees) && employees.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No employees found.</p>
      ) : (
        <div className="space-y-4">
          {Array.isArray(employees) &&
            employees.map((employee) => (
              <div
                key={employee._id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 flex items-center"
              >
                <img
                  src={employee.profilePic || "https://via.placeholder.com/100"}
                  alt={employee.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                  <p className="text-sm text-gray-500">{employee.contact}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="flex items-center px-3 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors duration-200"
                  >
                    <FiEdit2 className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="flex items-center px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200"
                  >
                    <FiTrash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;