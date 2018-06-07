import React from 'react'
import Helmet from 'react-helmet'

const IndexPage = ({ data }) => (
  <div>
    <Helmet
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      defaultTitle={data.site.siteMetadata.title}
    />

    <div>{JSON.stringify(data, null, 2)}</div>
  </div>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulArticle {
      edges {
        node {
          id
        }
      }
    }
  }
`
