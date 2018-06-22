import React from 'react'
import { Block } from 'glamor/jsxstyle'
import { PostItem } from '../components/PostItem'

import 'normalize.css'

const systemFonts =
  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;'

const Index = ({
  data: {
    site: {
      siteMetadata: { title },
    },
    allContentfulArticle: { edges },
  },
}) => (
  <Block maxWidth="750px" margin="0 auto" fontFamily={systemFonts}>
    <Block
      fontSize="30px"
      fontWeight="200"
      fontStyle="italic"
      textDecoration="underline"
      textAlign="center"
      padding="30px 0"
    >
      Low Stakes
    </Block>
    <Block margin="0 20px">
      {edges.map(({ node: article }) => (
        <PostItem key={article.id} {...article} marginBottom="20px" />
      ))}
    </Block>
  </Block>
)

export default Index

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulArticle(sort: { fields: [publishedDate], order: DESC }) {
      edges {
        node {
          id
          ...PostItem
        }
      }
    }
  }
`
