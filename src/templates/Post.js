import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Block } from 'glamor/jsxstyle'
import PageWrapper from '../components/PageWrapper'
import { Card } from '../components/Card'
import { GUTTER, FONT_SIZE } from '../utils/constants'

const Post = ({
  data: {
    contentfulArticle: {
      image,
      title,
      body: { body },
    },
  },
}) => (
  <PageWrapper>
    <Card>
      {image && (
        <Img
          sizes={image.sizes}
          alt={image.description}
          css={{ width: '100%', height: '400px', objectFit: 'cover' }}
        />
      )}
      <Block padding={GUTTER.LG}>
        <Block paddingBottom={GUTTER.LG} fontSize={FONT_SIZE.XL}>
          {title}
        </Block>
        <Block>{body}</Block>
      </Block>
    </Card>
  </PageWrapper>
)

export default Post

export const query = graphql`
  query PostQuery($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      id
      title
      description
      body {
        body
      }
      publishedDate
      image {
        description
        sizes {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`
