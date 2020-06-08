import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import ItemControls from '../components/ItemControls';

const MenuGrid = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}
`;

const MenuItem = styled.article`
  ${tw`border border-solid px-8 py-10`}
  border-color: #333;
  border-radius: 1rem;
`;

const MenuItemText = styled.header`
  min-height: 100px;
  ${tw`flex flex-col`}
`;

const MenuItemControls = styled.div`
  color: #333;
  ${tw`flex justify-between text-xl font-semibold`};
  font-family: 'Montserrat';
`;

const PizzaTitle = styled.h3`
  color: #333;
  ${tw`font-bold text-lg uppercase pb-1`};
`;

const PizzaDescriptionSection = styled.section`
  flex: 1;
  ${tw`flex flex-col justify-between`};
  p {
    ${tw`text-xs text-black`}
  }
`;

const PizzaDeliveryIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const pizzas = data.allMdx.nodes;
  console.log('pizzas:', pizzas);
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All pizzas" />
      <MenuGrid>
        {pizzas.map((node) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <MenuItem key={node.fields.slug}>
              <Img
                alt={title}
                fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
              />
              <MenuItemText>
                <PizzaTitle>
                  {title}
                </PizzaTitle>
                <PizzaDescriptionSection>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                  <MenuItemControls>
                    <div>
                      $
                      {node.frontmatter.price}
                    </div>
                    <ItemControls sku={node.fields.sku} />
                  </MenuItemControls>
                </PizzaDescriptionSection>
              </MenuItemText>
            </MenuItem>
          );
        })}
      </MenuGrid>
    </Layout>
  );
};


PizzaDeliveryIndex.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default PizzaDeliveryIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___title], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
          sku
        }
        frontmatter {
          title
          price
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
