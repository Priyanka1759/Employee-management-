import { useEffect, useState, SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import Button from "../components/Button";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import type { EmployeeForm } from "../types/Employee";
import Employees from "./Employees";

function EditEmployee() {
  const { id } = useParams();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [joining_date, setDate] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  const [alternate_contact, setAlternateContact] = useState("");
  const [profile_image, setProfileImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      const employee = await getEmployeeById(Number(id));

      setFirstName(employee.first_name);
      setLastName(employee.last_name);
      setEmail(employee.email);
      setPhone(employee.phone);
      setDepartment(employee.department);
      setDesignation(employee.designation);
      setDate(employee.joining_date);
      setAadhaar(employee.aadhaar);
      setAlternateContact(employee.alternate_contact);
      setDescription(employee.description);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("department", department);
    formData.append("designation", designation);
    formData.append("joining_date", joining_date);
    formData.append("aadhaar", aadhaar.replace(/\s/g, ""));
    formData.append("alternate_contact", alternate_contact);
    formData.append("description", description);
    if (profile_image) {
      formData.append("profile_image", profile_image);
    }
    if (password) {
      formData.append("password", password);
    }

    try {
      formData.append("_method", "PUT");
      console.log(Employees);
      await updateEmployee(Number(id), formData);
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Employee updated successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      navigate("/employees");
    } catch (error: any) {
  console.log(error.response?.data);
  alert(JSON.stringify(error.response?.data?.error));
  console.error(error);
}
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);
  console.log(FormData);
  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <fieldset>
        <h3 className="section-title">Edit Employee</h3>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Joining Date</label>
            <DatePicker
              selected={joining_date ? new Date(joining_date) : null}
              onChange={(selectedDate: Date | null) =>
                setDate(
                  selectedDate ? selectedDate.toISOString().split("T")[0] : "",
                )
              }
              dateFormat="dd-MM-yyyy"
              placeholderText="DD-MM-YYYY"
              className="datepicker-input"
            />
          </div>

          <div className="form-group">
            <label>Aadhaar Number</label>
            <input
              type="text"
              value={aadhaar}
              maxLength={12}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <h3 className="section-title">Employee Profiles</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Profile Image</label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfileImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="form-group">
            <label>Description</label>

            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="form-row">
            <div className="form-group">
              <label>Alternate Contact</label>

              <input
                type="text"
                placeholder="Enter Alternate Contact"
                value={alternate_contact}
                onChange={(e) => setAlternateContact(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Change Password</label>
              <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </fieldset>

      <div className="submit-btn">
        <Button text="SAVE EMPLOYEE" type="submit" />

        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditEmployee;
