import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import AddUser from "./components/User/AddUser";
import UsersList from "./components/User/UsersList";

function App() {
    const [usersList, setUsersList] = useState([]);

    // Lifting the state up
    const getUserData = (userName, userAge) => {
        setUsersList((prevUsersList) => {
            // Updated state rely on previous state
            return [
                { id: uuidv4(), name: userName, age: userAge },
                ...prevUsersList,
            ];
        });
    };

    return (
        <div className="App">
            <AddUser getUserData={getUserData} />
            <UsersList users={usersList} />
        </div>
    );
}

export default App;
