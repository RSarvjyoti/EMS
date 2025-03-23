import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const EmployeePage = () => (
  <div className="employee-page">
    <EmployeeForm />
    <EmployeeList />
  </div>
);

export default EmployeePage;
