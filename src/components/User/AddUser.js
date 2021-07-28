import React, { useState, useRef } from "react";
import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

export default function AddUser(props) {
    // Rarely useRef to manipulate the DOM let React do that.
    // In this case we not really manipulate the DOM just change the input value so that is OK.
    // And this case we just want to read the value from the input useRef is much better than useState which requires writting lines of code.
    const userName = useRef();
    const userAge = useRef();
    const [error, setError] = useState();
    const addUserHandler = () => {
        console.log(userName);
        if (
            userName.current.value.trim().length === 0 ||
            userAge.current.value.trim().length === 0
        ) {
            setError({
                title: "Invalid input",
                message:
                    "Please enter a valid name and age (non-empty values).",
            });
            return;
        }
        if (+userAge.current.value <= 0) {
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (> 0).",
            });
            return;
        }
        props.getUserData(userName.current.value, userAge.current.value);
        userName.current.value = "";
        userAge.current.value = "";
    };

    const errorModalHandler = () => {
        setError(null);
    };

    return (
        // React.Fragment is used for not rendering unnecessary elements
        // How it works under the hood: Wrapper component in Helpers file
        <React.Fragment>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    errorModalHandler={errorModalHandler}
                />
            )}
            <Card className={classes.input}>
                <div>
                    <form onSubmit={addUserHandler}>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" ref={userName} />
                        <label htmlFor="age">Age (Years)</label>
                        <input id="age" type="number" ref={userAge} />
                        <Button onClick={addUserHandler}>Add User</Button>
                    </form>
                </div>
            </Card>
        </React.Fragment>
    );
}
