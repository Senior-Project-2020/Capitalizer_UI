import React from "react";
import styled from "styled-components";
import { SignupForm } from "../components/SignupForm";

export function SignupPage() {
    return(
        <SignupPageContainer>
                <SignupForm></SignupForm>
        </SignupPageContainer>
    );
}

const SignupPageContainer = styled.section`
    color: white;
    display: flex;
    margin-top: 80px;
    justify-content: center;
    font-size: 18px;
`;