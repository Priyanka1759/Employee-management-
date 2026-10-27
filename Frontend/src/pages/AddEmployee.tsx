import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEmployee } from "../services/employeeService";
import Swal from "sweetalert2";

function AddEmployee() {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [joining_date, setDate] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [aadhaarError, setAadhaarError] = useState("");

  const [alternate_contact, setAlternateContact] = useState("");
  const [profile_image, setProfileImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [profileImageError, setProfileImageError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setEmailError("");
    setPhoneError("");
    setProfileImageError("");

    if (!/^\d{4}\s\d{4}\s\d{4}$/.test(aadhaar)) {
      setAadhaarError("Aadhaar Number must contain exactly 12 digits");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError(
        "Please enter a valid email address. Example: abc@gmail.com",
      );
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number must contain exactly 10 digits");
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Password must be at least 6 characters",
      });
      return;
    }
    if (alternate_contact && !/^\d{10}$/.test(alternate_contact)) {
      Swal.fire({
        icon: "error",
        title: "Alternate contact must contain exactly 10 digits",
      });
      return;
    }
    if (!joining_date) {
      Swal.fire({
        icon: "error",
        title: "Please select joining date",
      });
      return;
    }
    if (
      profile_image &&
      !["image/jpeg", "image/png"].includes(profile_image.type)
    ) {
      setProfileImageError(
        "Please upload a image in .jpg, .jpeg, .png format.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("department", department);
    formData.append("designation", designation);
    formData.append("joining_date", joining_date);
    formData.append("aadhaar", aadhaar);
    formData.append("alternate_contact", alternate_contact);
    formData.append("description", description);
    formData.append("password", password);
    if (profile_image) {
      formData.append("profile_image", profile_image);
    }

    try {
      await addEmployee(formData);
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Employee added successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      navigate("/employees");
    } catch (error: any) {
      console.log(error.response?.data);

      if (error.response?.data?.error?.email) {
        setEmailError(error.response.data.error.email[0]);
      }

      if (error.response?.data?.error?.phone) {
        setPhoneError(error.response.data.error.phone[0]);
      }

      const errorMessage =
        error?.response?.data?.message || "Failed to add employee";
      Swal.fire({
        toast: true,
        position: "top-end",
        title: errorMessage,
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <fieldset>
        <h3 className="section-title">Employee Details</h3>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
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
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(value);
                setPhoneError("");
              }}
            />
            {phoneError && <span className="error-message">{phoneError}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              placeholder="Enter Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              placeholder="Enter Designation"
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
              className="aadhar-input"
              placeholder="XXXX XXXX XXXX"
              value={aadhaar}
              maxLength={14}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                const formatted = value.replace(
                  /(\d{4})(\d{4})(\d{0,4})/,
                  "$1 $2 $3",
                );
                setAadhaar(formatted.trim());
              }}
              required
            />
            {aadhaarError && (
              <span className="error-message">{aadhaarError}</span>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <h3 className="section-title">Employee Profiles</h3>

        <div className="form-group">
          <label>Profile Image</label>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfileImage(e.target.files[0]);
                setProfileImageError("");
              }
            }}
          />
          {profileImageError && (
            <span className="error-message">{profileImageError}</span>
          )}
        </div>

        <div>
          <div className="form-row">
            <div className="form-group">
              <label>Alternate Contact</label>

              <input
                type="tel"
                placeholder="Enter Alternate Contact"
                value={alternate_contact}
                onChange={(e) =>
                  setAlternateContact(
                    e.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
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
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </fieldset>
      <div className="submit-btn">
        <Button text="ADD EMPLOYEE" type="submit" />
      </div>
    </form>
  );
}

export default AddEmployee;
