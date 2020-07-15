import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useHistory } from "react-router";

export function NonauthNavBar() {
  return (
    <NavBarContainer>
      <LogoLink path={"/"}>Project Capitalizer</LogoLink>
      <LinkContainer>
        <Link path={"/login"}>Login</Link>
        <Link path={"/signup"}>Sign up</Link>
      </LinkContainer>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.16);
  padding: 1% 0;
  width: 100%;
`;

const LogoContainer = styled.div`
  padding-left: 3%;
  color: white;
  font-size: 4.6vw;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 3%;
`;

const LinkWrapper = styled.div`
  color: white;
  font-size: 2.6vw;
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

const LogoLink = ({ path, children }) => {
  const history = useHistory();

  let handleClick = () => {
    history.push(path);
  };

  return <LogoContainer onClick={handleClick}>{children}</LogoContainer>;
}

Link.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};
