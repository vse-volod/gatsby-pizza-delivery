import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';

const FooterContainer = styled.div`
  ${tw`text-center text-sm pt-24`}
  > a {
    ${tw`font-bold hover:opacity-75`}
  }
`;

const Footer = () => (
  <FooterContainer>
    Gatsby Starter Pizza by
    {' '}
    <a href="https://gatsbytemplates.io/" target="_blank">GatsbyTemplates</a>
  </FooterContainer>
);

export default Footer;
