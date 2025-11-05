import React, { useState } from "react";

const ControlledForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    role: "user",   
    gender: "",
    interests: []
  });

  // Handle text, textarea, select, and radio
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox separately
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, interests: [...formData.interests, value] });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter((interest) => interest !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Controlled Form Example</h2>
      <form onSubmit={handleSubmit}>
        {/* Text Input */}
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        {/* Textarea */}
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        {/* Select Dropdown */}
        <label>
          Role:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </label>
        <br /><br />

        {/* Radio Buttons */}
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        /> Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        /> Female
        <input
          type="radio"
          name="gender"
          value="other"
          checked={formData.gender === "other"}
          onChange={handleChange}
        /> Other
        <br /><br />

        {/* Checkboxes */}
        <label>Interests:</label>
        <input
          type="checkbox"
          value="coding"
          checked={formData.interests.includes("coding")}
          onChange={handleCheckboxChange}
        /> Coding
        <input
          type="checkbox"
          value="music"
          checked={formData.interests.includes("music")}
          onChange={handleCheckboxChange}
        /> Music
        <input
          type="checkbox"
          value="sports"
          checked={formData.interests.includes("sports")}
          onChange={handleCheckboxChange}
        /> Sports
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ControlledForm;
