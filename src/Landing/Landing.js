import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export function Landing () {
    return (
        <LandingContainer>
            <WelcomeHeader>Welcome to Project Capitalizer</WelcomeHeader>
            <InfoContainer>
                <QuestionAnswer
                    question="What is Project Capitalizer?"
                    answer="Project Capitalizer is a stock prediction app. We harness the power of modern day AI to allow our users to make better informed decisions on how to invest their hard-earned money. Our goal is to bring accurate stock market predictions to everyday users."
                ></QuestionAnswer>
                <QuestionAnswer
                    question="How does Project Capitalizer work?"
                    answer="Every night, our machine learning model predicts the closing price for stocks in the S&P 500. Our software compares the predicted closing prices of all the stocks and shows our users the best and worst predicted performing stocks. Our users can then use that information to decide on which stocks to buy and sell."
                ></QuestionAnswer>
            </InfoContainer>
            <Signup></Signup>
        </LandingContainer>
    );
}

const LandingContainer = styled.section`
    margin: 3% 5%;
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
    margin: 3% 0 0 0;
    font-size: 4.5vw;
`;

const InfoContainer = styled.section`
    display: flex;
    align-items: baseline;
    padding: 1% 1% 0 1%;
    margin: 0 2%;
    border-style: solid;
    border-width: 0.25vw 0;
    border-color: white;
`;

const QuestionAnswerContainer = styled.article`
    margin: 2%;
    width: 50%;
`;

const QuestionWrapper = styled.header`
    border-style: solid;
    border-width: 0 0 0.01vw 0;
    border-color: white;
    font-size: 2vw;
    margin-bottom: 2%;
`;

const AnswerWrapper = styled.p`
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
    margin: 2% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SignupHeaderWrapper = styled.header`
    font-size: 2.25vw;
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
  font-size: 1.75vw;
  cursor: pointer;
`;

const SignupButton = () => {
  const history = useHistory();

  let handleClick = () => {
    history.push("/signup");
  };

  return <ButtonWrapper onClick={handleClick}>Sign Up</ButtonWrapper>;
};
