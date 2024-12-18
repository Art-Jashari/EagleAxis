import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser"

export const ApplicationModal = ({ position, id }) => {
  useEffect(() => {
    // Check URL parameters on component mount
    const urlParams = new URLSearchParams(window.location.search);
    const modalToOpen = urlParams.get('modal');
    
    if (modalToOpen === id) {
      document.getElementById(id).showModal();
    }
  }, [id]);

  // State to hold form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zip: "",
    cellphone: "",
    option: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Configure EmailJS parameters
    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      zip: formData.zip,
      cellphone: formData.cellphone,
      option: formData.option,
      toEmail: process.env.REACT_APP_EMAIL_RECIPIANT,
      position: position
    };

    // Send the email using EmailJS
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,  
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, 
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY 
      )
      .then(
        (response) => {
          console.log('Application sent successfully!', response.status, response.text);
          alert('Application sent successfully!');
          document.getElementById(id).close(); // Close modal after submit
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send application.');
        }
      );
  };

  return (
    <div style={{ fontFamily: "Comfortaa" }}>
      <button
        className={`btn inline-block w-full uppercase mt-5 px-12 py-3 text-white rounded-xl bg-primaryYellow text-xl font-semibold transform transition-all border-[1px] border-transparent duration-300 ease-in-out hover:scale-105 hover:bg-transparent hover:border-primaryYellow hover:text-primaryYellow`}
        onClick={() => document.getElementById(id).showModal()}
      >
        {position}
      </button>
      <dialog id={id} className="modal" >
        <div className="modal-box bg-black">
          <form method="dialog" onSubmit={handleSubmit}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 text-primaryYellow text-lg top-2"
              type="button"
              onClick={() => document.getElementById(id).close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-center text-xl">
              {position} Application
            </h3>
            <p className=" mt-5 text-lg text-center">
              <span className="text-primaryYellow">Join our team</span> and
              become part of a movement to transform the trucking industry.
            </p>

            {/* Form Fields */}
            <div className="py-4">
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input bg-slate-900	 input-bordered w-full"
              />

              <label className="block mt-4 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input bg-slate-900	input-bordered w-full"
              />

              <label className="block mt-4 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input bg-slate-900 input-bordered w-full"
              />

              <label className="block mt-4 mb-2">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                className="input bg-slate-900 input-bordered w-full"
              />

              <label className="block mt-4 mb-2">Cellphone Number</label>
              <input
                type="tel"
                name="cellphone"
                value={formData.cellphone}
                onChange={handleChange}
                required
                className="input bg-slate-900 input-bordered w-full"
              />

              <label className="block  mt-4 mb-2">Select Position</label>
              <select
                name="option"
                value={formData.option}
                onChange={handleChange}
                required
                className="select select-bordered bg-slate-900 w-full"
              >
                <option value="" disabled>
                  What is your CDL-A Experience?
                </option>
                <option value="Less than 2 years">Less than 2 years</option>
                <option value="2+ years">2+ years</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn inline-block w-full uppercase mt-5 px-12 py-3 text-white rounded-xl bg-primaryYellow text-lg font-semibold transform transition-all border-[1px] border-transparent duration-300 ease-in-out hover:scale-105 hover:bg-transparent hover:border-primaryYellow hover:text-primaryYellow"
            >
              Submit Application
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
