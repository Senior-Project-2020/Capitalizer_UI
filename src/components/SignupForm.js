import React, { useState, useEffect } from "react";
import styled from "styled-components";

export function SignupForm({ setSignedUp }) {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    useEffect(() => {
        console.log(username + " " + password1 + " " + password2);
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                if (submitForm(username, password1, password2)) {
                    setSignedUp(true);
                }
            }}
            style={{ "backgroundColor": "black", "color": "white", "width": "20%" }}
        >
            <FormFieldContainer>
                <label>Username: </label>
                <input 
                    type="text" 
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                ></input>
            </FormFieldContainer>
            <FormFieldContainer>
                <label>Password: </label>
                <input 
                    type="password" 
                    onChange={(event) => {
                        setPassword1(event.target.value);
                    }}
                ></input>
            </FormFieldContainer>
            <FormFieldContainer>
                <label>Confirm Password: </label>
                <input 
                    type="password" 
                    onChange={(event) => {
                        setPassword2(event.target.value);
                    }}
                ></input>
            </FormFieldContainer>

            <input type="submit" value="Signup!"></input>
        </form>
    );
}

const submitForm = (username, password1, password2) => {
    console.log("SUBMIT: " + username + " " + password1 + " " + password2);
    return true;
}

const FormFieldContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5%;
`;