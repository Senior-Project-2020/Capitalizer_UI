import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useHistory } from "react-router";
import { StockInfo } from "./StockInfo";

export function StockDetail({ stock, price }) {
    return (
        <StockDetailContainer>
            <DetailHeader data={stock}></DetailHeader>
            <InfoContainer>
                <StockInfo data={price}></StockInfo>
            </InfoContainer>
        </StockDetailContainer>
    );
}

StockDetail.propTypes = {
    stock: PropTypes.shape({
        name: PropTypes.string,
        symbol: PropTypes.string,
    }).isRequired,
    price: PropTypes.object.isRequired,
}

const StockDetailContainer = styled.div`
    padding: 0px 15px;
`;

const HeaderContainer = styled.header`
    font-size: 35px;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
`;

const LinkWrapper = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

const DetailHeader = ({ data }) => {
    return (
        <HeaderContainer>
            <Link path={"/stocks/" + data["symbol"]}>
                {data["name"] + " (" + data["symbol"] + ")"}
            </Link>
        </HeaderContainer>
    );
}

DetailHeader.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        symbol: PropTypes.string,
    }).isRequired,
}

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