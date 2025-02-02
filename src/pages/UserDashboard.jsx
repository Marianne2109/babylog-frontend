import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useUserAuthContext } from "../contexts/UserAuthContext";
import { useChildContext } from "../contexts/ChildContext";

export default function UserDashboard() {
    const navigate = useNavigate();
    const { currentUser, loadingAuth } = useUserAuthContext(); //authenticated user
    const {childProfiles, setChildProfiles} = useChildContext(); //child profiles and users with access

    const [userChildren, setUserChildren] = useState([]); //children profiles of the authenticated user
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!loadingAuth && !currentUser) {
            navigate('/auth/login'); //redirect to login if user is not authenticated
        }
    }, [currentUser, loadingAuth, navigate]);
       
    useEffect(() => {
        //fetch from backend
      const fetchChildren = async () => {
         try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/child`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentUser.jwt}`,   
                },
        });

            if(!response.ok) {
                throw new Error("An error occurred while fetching child profiles.");
            }

            const data = await response.json();
            setChildProfiles(data); 
         } catch (error) {
            console.error("Error fetching child profiles:", error);
            setError(error.message);
         } finally {
            setLoading(false);
        }
        };

        if (currentUser) { 
           fetchChildren();
        }
    }, [currentUser, navigate, setChildProfiles]);

    useEffect(() => {
        
        if (currentUser && childProfiles) {
            //children of the authenticated user
            const children = childProfiles.filter(child => String(child.createdBy._id) === String(currentUser.id));
            setUserChildren(children);
        }
    }, [currentUser, childProfiles]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>An error occurred: {error}</p>;
       

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Hello, {currentUser?.firstName} {currentUser?.lastName} </h2>

            <button style={styles.addButton} onClick={() => navigate('/add-child')}>
                + Add a new child profile
            </button>

             <h3 style={styles.sectionTitle}>Current profiles</h3>
             {userChildren.length > 0 ? (   
                 userChildren.map(child => (
                     <div key={child.id} style={styles.childCard}>
                         <h4 style={styles.childName}>
                            {child.childName} (Born: {new Date(child.dob).toLocaleDateString()})
                        </h4>
                        <p><strong>Weight at Birth:</strong> {child.weightAtBirth} kg</p>
                        <p><strong>Height at Birth:</strong> {child.heightAtBirth} cm</p>
                        <p><strong>Head Circumference:</strong> {child.headCircumferenceAtBirth} cm</p>

                        <h5 style={styles.subTitle}>Vaccination Status:</h5>
                        {child.vaccinationStatus.length > 0 ? (
                            child.vaccinationStatus.map((vaccine, index) => (
                                <div key={index} style={styles.vaccineCard}>
                                    <p><strong>Schedule ID:</strong> {vaccine.scheduleId}</p>
                                    <p><strong>Status:</strong> {vaccine.status}</p>
                                    <p><strong>Received On:</strong> {vaccine.receiveDate ? new Date(vaccine.receiveDate).toLocaleDateString() : "Not Yet"}</p>
                                    <p><strong>Reminder Date:</strong> {vaccine.reminderDate ? new Date(vaccine.reminderDate).toLocaleDateString() : "No Reminder"}</p>
                                </div>
                            ))
                        ) : (
                            <p>No vaccinations recorded.</p>
                        )}

                        <h5 style={styles.subTitle}>Users with Access:</h5>
                        {child.permissions.length > 0 ? (
                            <ul>
                                {child.permissions.map((perm, index) => (
                                    <li key={index}>{perm.user.name} ({perm.role})</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No other users have access.</p>
                    )}

                    <button style={styles.viewButton} onClick={() => navigate(`/child/${child.id}`)}>
                        View Profile
                    </button>
                </div>
            ))
        ) : (
            <p>No child profiles found. Click "Add New Child Profile" to get started.</p>
        )}
    </div>
    );
};

//CSS styles
const styles = {
    container: {
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "F6F5F3",
    },
    heading: {
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#373B2D",
    },
    addButton: {
        display: "block",
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        backgroundColor: "#E9BA84",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "20px",
    },
    sectionTitle: {
        fontSize: "20px",
        marginBottom: "10px",
        color: "#373B2D",
    },
    childCard: {
        border: "1px solid #BCA446",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "15px",
        backgroundColor: "#F0DBD8",
    },
    childName: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#373B2D",
    },
    subTitle: {
        fontSize: "16px",
        marginTop: "10px",
        color: "#373B2D",
    },
    vaccineCard: {
        border: "1px solid #E9BA84",
        padding: "10px",
        marginBottom: "5px",
        backgroundColor: "#F6F5F3",
        borderRadius: "5px",
    },
    viewButton: {
        marginTop: "10px",
        padding: "10px 15px",
        backgroundColor: "#BCA446",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

