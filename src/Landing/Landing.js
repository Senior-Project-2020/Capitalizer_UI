import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export function Landing () {
    return (
        <LandingContainer>
            <WelcomeHeader>Welcome to Project Capitalizer</WelcomeHeader>
            <InfoContainer>
                <QuestionAnswer
                    question="Lorem ipsum dolor?"
                    answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                ></QuestionAnswer>
                <QuestionAnswer
                    question="Lorem ipsum dolor?"
                    answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                ></QuestionAnswer>
                <Line></Line>
                <Signup></Signup>
            </InfoContainer>
        </LandingContainer>
    );
}

const LandingContainer = styled.section`
    margin: 5% 12%;
    color: white;
    background: rgba(255, 255, 255, 0.16);
    border-style: solid;
    border-width: 1px;
    border-color: black;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WelcomeHeader = styled.h1`
    margin: 5% 0 0 0;
    font-size: 5vw;
    border-style: solid;
    border-width: 0 0 0.25vw 0;
    border-color: white;
`;

const InfoContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2.5% 10%;
`;

const QuestionAnswerContainer = styled.article`
    margin: 3% 0;
`;

const QuestionWrapper = styled.header`
    border-style: solid;
    border-width: 0 0 0.01vw 0;
    border-color: white;
    font-size: 2vw;
    margin-bottom: 2%;
`;

const AnswerWrapper = styled.header`
    font-size: 1.5vw;
`;

const QuestionAnswer = ({ question, answer }) => {
    return(
        <QuestionAnswerContainer>
            <QuestionWrapper>{question}</QuestionWrapper>
            <AnswerWrapper>{answer}</AnswerWrapper>
        </QuestionAnswerContainer>
    );
}

const SignupContainer = styled.article`
    margin: 3% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SignupHeaderWrapper = styled.header`
    font-size: 2.5vw;
    margin-bottom: 2%;
`;

const Signup = () => {
    return (
        <SignupContainer>
            <SignupHeaderWrapper>Interested? Sign up now:</SignupHeaderWrapper>
            <SignupButton></SignupButton>
        </SignupContainer>
    )
}

const ButtonWrapper = styled.div`
  margin-top: 2%;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: white;
  padding: 2% 4%;
  background: rgba(0,0,0,0);
  color: white;
  font-size: 2vw;
  cursor: pointer;
`;

const SignupButton = () => {
  const history = useHistory();

  let handleClick = () => {
    history.push("/signup");
  };

  return <ButtonWrapper onClick={handleClick}>Sign Up</ButtonWrapper>;
};

const Line = styled.div`
    margin: 2.5% 0 0 0;
    width: 105%;
    border-style: solid;
    border-width: 0 0 0.25vw 0;
    border-color: white;
`;