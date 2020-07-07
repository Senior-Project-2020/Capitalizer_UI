import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import axios from "axios";
import FormData from 'form-data';

export function SignupForm() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState("");
    const history = useHistory();

    const submitForm = (username, password1, password2) => {
        if (username === "" || password1 === "" || password2 === ""){
            setWarning(<WarningMessage>{"Fields cannot be empty"}</WarningMessage>);
        }
        else if (password1 !== password2){
            setWarning(<WarningMessage>{"Passwords must match"}</WarningMessage>);
        }
        else{
            const form = new FormData();
            form.append("username", username);
            form.append("email", "");
            form.append("password1", password1);
            form.append("password2", password2);

            axios.post("http://localhost:8000/api/v1/rest-auth/registration/", form).then((response) => {
                if (response.status === 201){
                    onFormSuccess();
                }
                else{
                    setWarning(<WarningMessage>{"Server error: Please try again later."}</WarningMessage>);
                }
            }).catch((err) => {
                const errors = [];
                
                // If there are username errors, then only display those
                if (err.response.data.username !== undefined){
                    for (const errIndex in err.response.data.username){
                        errors.push(<WarningMessage key={errIndex}>{err.response.data.username[errIndex]}</WarningMessage>);
                    }
                }
                // If there are no username errors, then display all other errors
                else {
                    for (const obj in err.response.data){
                        for (const errIndex in err.response.data[obj]){
                            const msg = err.response.data[obj][errIndex];
                            errors.push(<WarningMessage key={errIndex}>{msg}</WarningMessage>);
                        }
                    }
                }
                
                setWarning(errors);
            })
        }
    }
  
    const onFormSuccess = () => {
        history.push("/dashboard");
    };

    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault();
                submitForm(username, password1, password2);
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

            {warning !== "" &&
                <WarningMessageContainer>
                    {warning}
                </WarningMessageContainer>
            }

            <SubmitButtonContainer>
                <SubmitButtonInput type="submit" value="Sign up!"></SubmitButtonInput>
            </SubmitButtonContainer>
        </Form>
    );
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: -4% 0 -1% 0;
`;

const WarningMessage = styled.p`
    display: block;
    float: right;
    font-size: 18px;
    color: red;
    padding: 0;
    margin: 2% 0;
`;

const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-color: white;
    padding-top: 10px;
    margin-top: 1%;
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