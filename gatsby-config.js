module.exports = {
  siteMetadata: {
    title: `kedypaint`,
    description: `Estimate the amount of paint you need.`,
    author: `@keevnx`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `kedypaint`,
        short_name: `kedypaint`,
        start_url: `/`,
        background_color: `#2A82F0`,
        theme_color: `#2A82F0`,
        display: `standalone`,
        icon: `src/images/bykevin-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
