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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      const response = await fetch(import.meta.env.VITE_WORKERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Person added successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to add Person. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error: Failed to connect to the server." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
};

export default PersonFormLogic;
