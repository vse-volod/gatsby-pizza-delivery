import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import tw, { GlobalStyles } from 'twin.macro';
import styled from '@emotion/styled';
import { CartProvider } from '../utils/useCart';
import Cart from './Cart';
import Header from './Header';

const Container = styled.div`
  ${tw`container mx-auto py-12 sm:py-24 px-2 sm:px-0`}
`;

const CartFrame = styled.div`
  background-color: #bcb8b4db;
  ${tw`rounded-bl-lg`}
`;

const LayoutSection = styled.section`
  ${tw`relative overflow-hidden`}
`;

const Motion = styled(motion.div)`
  ${tw`flex`}
`;

const CartContainer = styled.div`
  ${tw`absolute top-0 right-0`}
  display: ${(p) => (p.cartOpened ? 'block' : 'none')};
`;

const Layout = ({ children }) => {
  const [cartOpened, setCartOpen] = useState(false);
  const cartFrameVariants = {
    open: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 300 },
  };
  return (
    <CartProvider>
      <GlobalStyles />
      <Header cartHandler={setCartOpen} cartOpened={cartOpened} />
      <LayoutSection>
        <Container>
          {children}
          <Motion
            initial="hidden"
            animate={cartOpened ? 'open' : 'hidden'}
          >
            <CartContainer cartOpened={cartOpened}>
              <Motion variants={cartFrameVariants}>
                <CartFrame>
                  <Cart />
                </CartFrame>
              </Motion>
            </CartContainer>
          </Motion>
        </Container>
      </LayoutSection>
    </CartProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
