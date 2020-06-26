import React from 'react';
import styled from 'styled-components';

export function NavBar() {
    return (
        <NavBarContainer>
            <LogoContainer>Project Capitalizer</LogoContainer>
            <LinkContainer>
                <Link>Dashboard</Link>
                <Link>Stocks</Link>
            </LinkContainer>
        </NavBarContainer>
    );
}

const NavBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, .16);
    height: 100px;
    width: 100%;
`;

const LogoContainer = styled.div`
    padding-left: 30px;
    color: white;
    font-size: 45px
`;

const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    padding-right: 30px;
`

const Link = styled.a`
    color: white;
    font-size: 25px;
    padding: 20px;
`;
