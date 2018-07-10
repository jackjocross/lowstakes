import React from 'react'
import { graphql } from 'gatsby'
import PageWrapper from '../components/PageWrapper'
import { PostItem } from '../components/PostItem'

const Index = ({
  data: {
    allContentfulArticle: { edges },
  },
}) => (
  <PageWrapper>
    {edges.map(({ node: article }) => (
      <PostItem key={article.id} {...article} />
    ))}
  </PageWrapper>
)

export default Index

export const query = graphql`
  query IndexQuery {
    allContentfulArticle(
      sort: { fields: [publishedDate], order: DESC }
      limit: 10
    ) {
      edges {
        node {
          id
          ...PostItem
        }
      }
    }
  }
`
