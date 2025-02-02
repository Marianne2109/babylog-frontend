import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChildContext } from '../contexts/ChildContext';
import { useUserAuthContext } from '../contexts/UserAuthContext';

function NewChildProfile() {
    const navigate = useNavigate();
    const { currentUser } = useUserAuthContext();
    const { addChildProfile } = useChildContext();

    const [childName, setChildName] = useState("");
    const [dob, setDob] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [weightAtBirth, setWeightAtBirth] = useState("");
    const [heightAtBirth, setHeightAtBirth] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

       //New child profile object. Vaccination status will be calculated on the backend based on the child's DOB.
       const NewChildProfile = {
           childName,
           dob,
           dueDate,
           weightAtBirth: Number(weightAtBirth),
           heightAtBirth: Number(heightAtBirth),
           headCircumference: Number(headCircumference),
           createdBy: currentUser.id,
       };

       console.log("New Child Profile:", NewChildProfile);

       try {
           const response = await fetch(`${import.meta.env.VITE_API_URL}/child`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   Authorization: `Bearer ${currentUser.jwt}`,
               },
               body: JSON.stringify(NewChildProfile),
           });

           if (!response.ok) {
               const errorData = await response.text();
               console.error("Server Error:", errorData);
               throw new Error(`Failed to add child profile: ${errorData}`);
           }

           const createdChild = await response.json();
           console.log("Child profile created successfully:", createdChild);
           addChildProfile(createdChild); //add new child profile to context
           navigate('/user'); //redirect to user dashboard after adding child profile
       } catch (error) {
           console.error("Failed to add child profile:", error.message);
           setError("Failed to add child profile. Check your backend and try again later.");
       } finally {
           setLoading(false);
       }        
    };

    return (
        <div style={styles.container}>  
           <h2 style={styles.heading}>Create a New Child Profile</h2>
              <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                     Child Name:
                     <input
                          type="text"
                          name="childName"
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          style={styles.input}
                          required
                     />
                </label>
                <label style={styles.label}>
                     Date of Birth:
                     <input
                          type="date"
                          name="dob"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          style={styles.input}
                          required
                     />
                </label>
                <label styles={styles.label}>
                     Due Date:
                     <input
                          type="date"
                          name="dueDate"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          style={styles.input}
                     />
                </label>
                <label>
                     Weight at Birth (kg):
                     <input
                          type="number"
                          name="weightAtBirth"
                          value={weightAtBirth}
                          onChange={(e) => setWeightAtBirth(e.target.value)}
                          style={styles.input}
                     />
                </label>
                <label styles={styles.label}>
                     Height at Birth (cm):
                     <input
                          type="number"
                          name="heightAtBirth"
                          value={heightAtBirth}
                          onChange={(e) => setHeightAtBirth(e.target.value)}
                          styles={styles.input}
                     />
                </label>
                <label style={styles.label}>
                     Head Circumference (cm):
                     <input
                          type="number"
                          name="headCircumference"
                          value={headCircumference}
                          onChange={(e) => setHeadCircumference(e.target.value)}
                          style={styles.input}    
                     />
                </label>

                <p style={styles.note}>
                    Note: Vaccination status will be calculated based on the child's Date of Birth (DOB) and the Australian Immunisation Program.
                </p>

                <button type="submit" style={styles.submitButton} disabled={loading}>
                     {loading ? 'Creating...' : 'Create Child Profile'}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#F6F5F3",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      },
      heading: {
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#373B2D",
      },
      form: {
        display: "flex",
        flexDirection: "column",
      },
      label: {
        marginBottom: "10px",
        fontWeight: "bold",
        color: "#373B2D",
      },
      input: {
        width: "100%",
        padding: "8px",
        marginTop: "4px",
        marginBottom: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
      },
      button: {
        padding: "10px",
        backgroundColor: "#E9BA84",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "10px",
      },
    };

    export default NewChildProfile;