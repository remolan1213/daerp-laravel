import { useState } from "react";

const PersonFormLogic = ({ setMessage }) => {
  // State for storing form inputs
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    idNumber: "",
    department: "",
    bankAccount: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission and send data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_WORKERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Person added successfully!");
      } else {
        setMessage("Failed to add Person. Please try again.");
      }
    } catch (error) {
      setMessage("Error: Failed to connect to the server.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default PersonFormLogic;
