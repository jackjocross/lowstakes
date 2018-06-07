import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery } from 'gatsby'
// import Link from 'gatsby-link'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        allContentfulArticle {
          edges {
            node {
              id
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
        />

        <div>{JSON.stringify(data, null, 2)}</div>
      </>
    )}
  />
)
