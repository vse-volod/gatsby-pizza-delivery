import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

const PizzaTemplate = ({ data, location }) => {
  const pizza = data.mdx;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={pizza.frontmatter.title}
        description={pizza.frontmatter.description || pizza.excerpt}
      />
      <article>
        <header>
          <h1>
            {pizza.frontmatter.title}
          </h1>
          <p
            style={{ display: 'block' }}
          >
            {pizza.frontmatter.price}
          </p>
        </header>
        <MDXRenderer>{pizza.body}</MDXRenderer>
      </article>
    </Layout>
  );
};

PizzaTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default PizzaTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        price
        description
      }
    }
  }
`;
