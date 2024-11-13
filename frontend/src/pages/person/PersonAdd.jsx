import React, { useState } from "react";
import PersonFormLogic from "./PersonFormLogic";
import PersonFormDisplay from "./PersonFormDisplay";

const PersonForm = () => {
  const [message, setMessage] = useState("");

  // Get the logic and handlers from PersonFormLogic
  const { formData, handleChange, handleSubmit } = PersonFormLogic({ setMessage });

  return (
    <PersonFormDisplay
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      message={message}
    />
  );
};

export default PersonForm;
