const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pizzaTemplate = path.resolve('./src/templates/Pizza.jsx');
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___title], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create pizza pages.
  const pizzas = result.data.allMdx.edges;

  pizzas.forEach((pizza) => {
    createPage({
      path: pizza.node.fields.slug,
      component: pizzaTemplate,
      context: {
        slug: pizza.node.fields.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value: `/pizza${value}`,
    });
    createNodeField({
      name: 'sku',
      node,
      value: `PZZA-${node.frontmatter.title.toUpperCase()}`,
    });
  }
};
