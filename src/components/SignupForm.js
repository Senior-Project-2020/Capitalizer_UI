import React, { useState } from "react";
import styled from "styled-components";

export function SignupForm() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    useEffect(() => {
        console.log(username + " " + password1 + " " + password2);
    });

    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault();
                }
            }}
        >
            <HeaderContainer>
                <Header>Sign Up</Header>
            </HeaderContainer>
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

            <SubmitButtonContainer>
                <SubmitButtonInput type="submit" value="Sign up!"></SubmitButtonInput>
            </SubmitButtonContainer>
        </Form>
    );
}

const submitForm = (username, password1, password2) => {
    console.log("SUBMIT: " + username + " " + password1 + " " + password2);
    return true;
}
const Form = styled.form`
    background: rgba(255, 255, 255, 0.16);
    width: 375px;
    border-radius: 10px;
    padding: 1%;
`;

const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    border-style: solid;
    border-width: 0px 0px 1px 0px;
    border-color: white;
`;

const Header = styled.h1`
    margin: 10px;
    font-size: 35px;
`;

const FormFieldContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5%;
    font-size: 20px;
`;

const WarningMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: -4% 0 -1% 0;
`;

const WarningMessage = styled.p`
    display: block;
    float: right;
    font-size: 18px;
    color: red;
`;

const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-color: white;
    padding-top: 10px;
`;

const SubmitButtonInput = styled.input`
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: white;
    padding: 5px 10px;
    margin: 10px;
    background: rgba(0,0,0,0);
    color: white;
    font-family: 'Iceland Regular';
    font-size: 25px;
    cursor: pointer;
`;