module.exports = {
  siteMetadata: {
    title: 'Saint Pizza',
    author: 'Vsevolod',
    description: 'pizza & pasta',
    siteUrl: 'https://gatsbytemplates.io/',
    social: {
      twitter: 'gatsbytemplates',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pizza`,
        name: 'pizza',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Pizza Delivery',
        short_name: 'PizzaPizza',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#D45D27',
        display: 'minimal-ui',
        icon: 'content/assets/pizza-icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        whitelist: ['CURRCONV_API_KEY', 'GETFORM_API_KEY'],
      },
    },
    'gatsby-plugin-preload-fonts',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-anchor-links',
  ],
};
