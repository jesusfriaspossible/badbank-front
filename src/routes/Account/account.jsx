import React, { useState, useEffect } from "react";

function Account() {
    const baseUrl = 'https://jesus-frias-backbankingapplication.onrender.com/api/users/';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        validateForm();
      };
    
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
        validateForm();
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        validateForm();
      };
    
      const validateForm = () => {
        setIsFormValid(name && email && password);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(baseUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                password
              }),
            });
      
            if (response.ok) {
              setSubmitted(true);
              setSuccessMessage('Success');
              alert('Success');
              setTimeout(() => setSubmitted(false), 2000);
            } else {
              console.log("Failed to submit data.");
            }
          } catch (error) {
            console.log(error);
          }
        };
        
    
  
  


        return (
            <div>
            <h2>Create Account</h2>
            <div className='card account-card'>
        
                {successMessage && <p>{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button class="btn btn-primary" type="submit" disabled={!isFormValid}>Submit</button>
                </form>
                {successMessage && <button class="btn btn-success" onClick={()=> setSuccessMessage('')}>Add Another
                Account</button>}
            </div>
        
            </div>
        );
    }



      
    // return (
    //   <div>
        
  
    //     <form onSubmit={addNote}>
    //       <div className="single-note">
    //         <div>
    //           <input
    //             type="text"
    //             value={title}
    //             onChange={(e) => setTitle(e.target.value)}
    //             placeholder="Title"
    //             className="title"
    //           />
    //         </div>
  
    //         <div>
    //           <textarea
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             placeholder="Description"
    //             rows="4"
    //             cols="50"
    //             className="description"
    //           ></textarea>
    //         </div>
    //       </div>
    //       <input
    //         type="submit"
    //         value={submitted ? "Saving note..." : "💾 Save Note"}
    //         disabled={submitted}
    //       />
  
    //       <p className="text-center">
    //         {submitted && (
    //           <div className="success-message">Note has been added!</div>
    //         )}
    //       </p>
    //     </form>
    //   </div>
    // );
  

export default Account

