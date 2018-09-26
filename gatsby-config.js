require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Low Stakes',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-glamor',
    'gatsby-plugin-less',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};
