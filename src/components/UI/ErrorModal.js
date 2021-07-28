import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

const Backdrop = (props) => {
    return (
        <div
            className={classes.backdrop}
            onClick={props.errorModalHandler}
        ></div>
    );
};

const ModalOverlay = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.errorModalHandler}>Okay</Button>
            </footer>
        </Card>
    );
};

export default function ErrorModal(props) {
    return (
        <React.Fragment>
            {/* ReactDOM.createPortal rendering the HTML content to somewhere else typically use for Modal... */}
            {ReactDOM.createPortal(
                <Backdrop errorModalHandler={props.errorModalHandler} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    errorModalHandler={props.errorModalHandler}
                />,
                document.getElementById("overlay-root")
            )}
        </React.Fragment>
    );
}
