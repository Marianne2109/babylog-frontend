import { useEffect, useState } from "react";    

function UserDashboard() {
    const [children, setChildren] = useState([]);
    const [usersWithAccess, serUsersWithAccess] = useState([]);     

    useEffect(() => {
        fetch('/api/children')
            .then((res) => res.json())
            .then((data) => setChildren(data.children));
    }, []);

}