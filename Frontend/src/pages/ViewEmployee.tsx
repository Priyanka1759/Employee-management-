import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/employeeService";

function ViewEmployee() {

  const [employee, setEmployee] = useState<any>(null);
  const { id } = useParams();

  const fetchEmployee = async () => {
    try {
      const data = await getEmployeeById(Number(id));

      console.log(data);

      setEmployee(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  
  if (!employee) {
  return <h3>Loading...</h3>;
}

console.log(employee.profile);
  return (
   
   <fieldset>
    <div className="details-container">

  <div className="profile-header">
    <img
    className="profile-image"
  src={`http://127.0.0.1:8000/uploads/${employee.profile_image}`}
  alt="  "  />

    <div>
      <h2>
        {employee.first_name} {employee.last_name}
      </h2>

      <p>Employee ID : {employee.id}</p>
    </div>

  </div>

  <div className="info-card">

    {/* <h3>Personal Information</h3> */}

    <div className="info-row">
      <label>Name</label>
      <span>:</span>
      <span>
        {employee.first_name} {employee.last_name}
      </span>
    </div>

    <div className="info-row">
      <label>Email</label>
      <span>:</span>
      <span>{employee.email}</span>
    </div>

    <div className="info-row">
      <label>Phone</label>
      <span>:</span>
      <span>{employee.phone}</span>
    </div>

    <div className="info-row">
      <label>Aadhaar Number</label>
      <span>:</span>
      <span>{employee.aadhaar}</span>
    </div>

    <div className="info-row">
      <label>Alternate Contact</label>
      <span>:</span>
      <span>{employee.alternate_contact}</span>
    </div>

  </div>

  <div className="info-card">

    {/* <h3>Employment Information</h3> */}

    <div className="info-row">
      <label>Department</label>
      <span>:</span>
      <span>{employee.department}</span>
    </div>

    <div className="info-row">
      <label>Designation</label>
      <span>:</span>
      <span>{employee.designation}</span>
    </div>

    <div className="info-row">
      <label>Joining Date</label>
      <span>:</span>
      <span>{employee.joining_date}</span>
    </div>

  </div>

  <div className="info-card">

    {/* <h3>Profile Information</h3> */}

    <div className="info-row">
      <label>Description</label>
      <span>:</span>
      <span>{employee.description}</span>
    </div>

  </div>

</div>
</fieldset>
);
}

export default ViewEmployee;
