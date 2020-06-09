import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { useStaticQuery, graphql } from 'gatsby';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { useCart } from '../utils/useCart';

const HeaderSection = styled.section`
  ${tw`flex justify-start sm:justify-center items-center w-full relative text-center`}
  height: 130px;
  background-color: #D45D27;
  color: #F2E0AB;
`;

const Title = styled.h1`
  ${tw`text-4xl sm:text-6xl pl-4 sm:pl-0`}
  font-family: 'Pacifico';
`;

const SubTitle = styled.p`
  ${tw`text-xs`}
  font-family: 'Oxygen Mono';
`;

const HeaderButtons = styled.div`
  ${tw`absolute right-0 h-full pr-8 
  sm:pr-16 flex items-center justify-between`}
`;

const Button = styled.button`
    ${tw`relative pl-8 focus:outline-none`}
`;

const QtyIndicator = styled.div`
    background-color: #FF5E15;
    right: -1.4rem;
    ${tw`text-white text-sm font-semibold rounded-full 
    w-6 h-6 leading-6 inline-block text-center absolute bottom-0`}
`;

const Header = ({ cartHandler, cartOpened }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `,
  );
  const { itemsCount } = useCart();
  const { title, description } = data.site.siteMetadata;
  return (
    <HeaderSection>
      <Link to="/">
        <Title>{title}</Title>
        <SubTitle>{description}</SubTitle>
      </Link>
      <HeaderButtons>
        <Button type="button" onClick={() => cartHandler(!cartOpened)}>
          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.06257 0C1.51554 0 0.990919 0.198319 0.604112 0.551328C0.217306 0.904338 0 1.38312 0 1.88235C0 2.38158 0.217306 2.86037 0.604112 3.21338C0.990919 3.56639 1.51554 3.76471 2.06257 3.76471H4.5789L5.20799 6.06494C5.21424 6.09143 5.22111 6.11779 5.22861 6.144L8.02958 16.3652L6.18771 18.0442C3.58887 20.416 5.42868 24.4706 9.10418 24.4706H26.8134C27.3604 24.4706 27.885 24.2723 28.2719 23.9193C28.6587 23.5662 28.876 23.0875 28.876 22.5882C28.876 22.089 28.6587 21.6102 28.2719 21.2572C27.885 20.9042 27.3604 20.7059 26.8134 20.7059H9.10418L11.1667 18.8235H24.7508C25.1338 18.8233 25.5091 18.7259 25.8348 18.542C26.1604 18.3582 26.4236 18.0952 26.5948 17.7826L32.7825 6.48847C32.9396 6.20156 33.0137 5.88278 32.9979 5.56236C32.9821 5.24195 32.8768 4.93054 32.6921 4.65768C32.5074 4.38482 32.2493 4.15957 31.9424 4.00328C31.6355 3.847 31.29 3.76488 30.9385 3.76471H8.8278L8.1884 1.42494C8.07666 1.01789 7.8191 0.656581 7.45661 0.39841C7.09413 0.140239 6.64751 1.10314e-05 6.18771 0H2.06257ZM28.876 29.1765C28.876 29.9253 28.55 30.6435 27.9698 31.173C27.3896 31.7025 26.6027 32 25.7821 32C24.9616 32 24.1746 31.7025 23.5944 31.173C23.0142 30.6435 22.6883 29.9253 22.6883 29.1765C22.6883 28.4276 23.0142 27.7094 23.5944 27.1799C24.1746 26.6504 24.9616 26.3529 25.7821 26.3529C26.6027 26.3529 27.3896 26.6504 27.9698 27.1799C28.55 27.7094 28.876 28.4276 28.876 29.1765ZM9.28156 32C10.1021 32 10.889 31.7025 11.4692 31.173C12.0495 30.6435 12.3754 29.9253 12.3754 29.1765C12.3754 28.4276 12.0495 27.7094 11.4692 27.1799C10.889 26.6504 10.1021 26.3529 9.28156 26.3529C8.46102 26.3529 7.67409 26.6504 7.09387 27.1799C6.51366 27.7094 6.18771 28.4276 6.18771 29.1765C6.18771 29.9253 6.51366 30.6435 7.09387 31.173C7.67409 31.7025 8.46102 32 9.28156 32Z" fill="#F2E0AB" />
          </svg>
          {itemsCount > 0 && (
          <QtyIndicator>
            {itemsCount}
          </QtyIndicator>
          )}
        </Button>
      </HeaderButtons>
    </HeaderSection>
  );
};

Header.propTypes = {
  cartHandler: PropTypes.func.isRequired,
  cartOpened: PropTypes.bool.isRequired,
};

export default Header;
