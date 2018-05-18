import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) =>
  console.log({ data }) || (
    <div>
      <h1>Low Stakes</h1>
    </div>
  )

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
