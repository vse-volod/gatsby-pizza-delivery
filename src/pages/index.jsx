import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import ItemControls from '../components/ItemControls';


const PizzaDeliveryIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const pizzas = data.allMdx.nodes;
  console.log('pizzas:', pizzas);
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All pizzas" />
      {pizzas.map((node) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
            <ItemControls price={node.frontmatter.price} sku={node.fields.sku} />
          </article>
        );
      })}
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
        }
      }
    }
  }
`;
