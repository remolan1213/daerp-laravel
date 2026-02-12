import React, { useState } from "react";
import PersonFormLogic from "./PersonFormLogic";
import PersonFormDisplay from "./PersonFormDisplay";

const PersonForm = () => {
  const [message, setMessage] = useState(null);

  // Get the logic and handlers from PersonFormLogic
  const { formData, handleChange, handleSubmit, isSubmitting } = PersonFormLogic({ setMessage });

  return (
    <PersonFormDisplay
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      message={
        message
          ? {
              ...message,
              clear: () => setMessage(null),
            }
          : null
      }
    />
  );
};

export default PersonForm;
