import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useHistory } from "react-router";
import { ProfileIcon } from "../icons/ProfileIcon";

export function NavBar() {
  return (
    <NavBarContainer>
      <LogoContainer>Project Capitalizer</LogoContainer>
      <LinkContainer>
        <Link path={"/dashboard"}>Dashboard</Link>

        <Link path={"/stocks"}>Stocks</Link>

        <Link path={"/profile"}>
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
  cursor: pointer;
`;

const Link = ({ path, children }) => {
  const history = useHistory();

  let handleClick = () => {
    history.push(path);
  };

  return <LinkWrapper onClick={handleClick}>{children}</LinkWrapper>;
};

Link.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};
