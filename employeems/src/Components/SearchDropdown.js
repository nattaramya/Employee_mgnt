import React from 'react';

const SearchDropdown = ({ employees, onSelectEmployee }) => {
  const handleSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedEmployee = employees.find(emp => emp.id === selectedId);
    onSelectEmployee(selectedEmployee);
  };

  return (
    <select className="form-select" onChange={handleSelect}>
      <option value="">Select an employee</option>
      {employees.map(employee => (
        <option key={employee.id} value={employee.id}>{employee.name}</option>
      ))}
    </select>
  );
};

export default SearchDropdown;
