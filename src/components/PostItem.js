import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Block, Flex } from 'glamor/jsxstyle'
import { formatDistance } from 'date-fns'
import { IoIosArrowThinRight } from 'react-icons/lib/io'
import { Card } from './Card'
import {
  GUTTER,
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  MIN_WIDTH,
} from '../utils/constants'

export const PostItem = ({
  id,
  slug,
  title,
  publishedDate,
  description,
  image,
  ...rest
}) => (
  <Card marginBottom="20px" lastChild={{ marginBottom: '0px' }}>
    <Flex flexDirection="column" media={[MIN_WIDTH, { flexDirection: 'row' }]}>
      {image && (
        <Img
          sizes={image.sizes}
          alt={image.description}
          css={{
            display: 'block',
            width: '100%',
            height: '390px',
            [`@media${MIN_WIDTH}`]: { width: '330px' },
            objectFit: 'cover',
          }}
        />
      )}
      <Block position="relative" padding={GUTTER.LG}>
        <Link to={slug} style={{ textDecoration: 'none' }}>
          <Block
            fontSize={FONT_SIZE.LG}
            fontWeight={FONT_WEIGHT.BOLD}
            color={COLOR.PRIMARY}
            paddingBottom={GUTTER.SM}
            hover={{ textDecoration: 'underline' }}
          >
            {title}
          </Block>
        </Link>
        <Block
          fontSize={FONT_SIZE.SM}
          color={COLOR.SECONDARY}
          paddingBottom={GUTTER.LG}
        >
          {formatDistance(new Date(publishedDate), new Date(), {
            addSuffix: true,
          })}
        </Block>
        <Block
          fontSize={FONT_SIZE.SM}
          color={COLOR.TERTIARY}
          lineHeight="20px"
          marginBottom={GUTTER.XL}
        >
          {description}
        </Block>
        <Link to={slug} style={{ textDecoration: 'none' }}>
          <Flex
            position="absolute"
            bottom={GUTTER.MD}
            right={GUTTER.MD}
            padding={GUTTER.SM}
            alignItems="center"
            fontSize={FONT_SIZE.XS}
            fontWeight={FONT_WEIGHT.BOLDER}
            color={COLOR.TERTIARY}
            textTransform="uppercase"
            hover={{ textDecoration: 'underline' }}
          >
            Read more
            <IoIosArrowThinRight size={30} />
          </Flex>
        </Link>
      </Block>
    </Flex>
  </Card>
)

export const query = graphql`
  fragment PostItem on ContentfulArticle {
    id
    slug
    title
    description
    publishedDate
    image {
      description
      fixed(width: 330, height: 390) {
        src
      }
      sizes {
        ...GatsbyContentfulSizes
      }
    }
  }
`
