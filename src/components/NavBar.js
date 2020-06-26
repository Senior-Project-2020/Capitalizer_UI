import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { ProfileIcon } from "../icons/ProfileIcon";

export function NavBar() {
  const history = useHistory();
  return (
    <NavBarContainer>
      <LogoContainer>Project Capitalizer</LogoContainer>
      <LinkContainer>
        <Link path={"/dashboard"} history={history}>
          Dashboard
        </Link>

        <Link path={"/stocks"} history={history}>
          Stocks
        </Link>

        <Link path={"/profile"} history={history}>
          <ProfileIcon></ProfileIcon>
        </Link>
      </LinkContainer>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.16);
  height: 100px;
  width: 100%;
`;

const LogoContainer = styled.div`
  padding-left: 30px;
  color: white;
  font-size: 45px;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
`;

const LinkWrapper = styled.div`
  color: white;
  font-size: 25px;
  padding: 30px;
`;

const Link = ({ path, history, children }) => {
  let handleClick = () => {
    history.push(path);
  };

  return <LinkWrapper onClick={handleClick}>{children}</LinkWrapper>;
};
