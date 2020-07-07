import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { InterestSelector } from "../components/InterestSelector";
import { SignupForm } from "../components/SignupForm";

export function SignupPage() {
    const [signedUp, setSignedUp] = useState(false);
    const [selectedEntries, updateState] = useState([]);

    useEffect(() => {
        console.log(signedUp);
    })

    return(
        <SignupPageContainer>
            {signedUp 
              ? <InterestSelector></InterestSelector>
              : <SignupForm
                    setSignedUp={setSignedUp}
                ></SignupForm>
            }
        </SignupPageContainer>
    );
}

const SignupPageContainer = styled.section`

`;