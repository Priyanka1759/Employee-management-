import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getEmployees } from "../services/employeeService";
import { deleteEmployee } from "../services/employeeService";
import type { Employee } from "../types/Employee";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); //Track current page and records per page.

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(currentPage, searchTerm);
      setEmployees(data.employees);
      setLastPage(data.lastPage);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This employee record will be permanently deleted.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      width: "350px",
      padding: "1rem",
    });

    if (result.isConfirmed) {
      await deleteEmployee(id); //Deletes employee from database.Reloads employee list from MySQL.
      fetchEmployees();

      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Employee deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const fullName =
      `${employee.first_name} ${employee.last_name}`.toLowerCase();

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]);

  return (
    <div className="employee-section">
      <div className="section-header">
        <button
          className="add-employee-btn"
          onClick={() => navigate("/employees/add")}
        >
          + Add Employee
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Employee..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <h2 className="employee-list-title">Employee List</h2>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Joining Date</th>
              <th>Aadhaar</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/employees/view/${employee.id}`)}
                    >
                      View
                    </button>
                  </td>

                  <td>
                    {employee.first_name} {employee.last_name}
                  </td>

                  <td>{employee.email}</td>

                  <td>{employee.phone}</td>

                  <td>{employee.department}</td>

                  <td>{employee.designation}</td>

                  <td>{formatDate(employee.joining_date)}</td>

                  <td>{employee.aadhaar}</td>

                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => {
                  
                        navigate(`/employees/edit/${employee.id}`);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(lastPage)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Employees;
