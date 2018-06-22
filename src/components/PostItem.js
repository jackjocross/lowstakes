import React from 'react'
import Link from 'gatsby-link'
import { Block, Flex } from 'glamor/jsxstyle'
import { formatDistance } from 'date-fns'
import { IoIosArrowThinRight } from 'react-icons/lib/io'

import { PRIMARY, SECONDARY, TERTIARY } from '../utils/colors'
import { LARGE, MEDIUM, SMALL } from '../utils/fontSizes'

export const PostItem = ({
  id,
  title,
  publishedDate,
  description,
  image,
  ...rest
}) => (
  <Flex
    {...rest}
    boxShadow="0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);"
  >
    {image && (
      <img
        src={image.fixed.src}
        alt={image.description}
        style={{ display: 'block', maxWidth: '50%', objectFit: 'cover' }}
      />
    )}
    <Block position="relative" width="100%" padding="30px">
      <Block
        fontSize={LARGE}
        fontWeight="700"
        color={PRIMARY}
        paddingBottom="10px"
      >
        {title}
      </Block>
      <Block fontSize={MEDIUM} color={SECONDARY} paddingBottom="30px">
        {formatDistance(new Date(publishedDate), new Date(), {
          addSuffix: true,
        })}
      </Block>
      <Block
        fontSize={MEDIUM}
        color={TERTIARY}
        lineHeight="20px"
        marginBottom="50px"
      >
        {description}
      </Block>
      <Link to={`/post/${id}`}>
        <Flex
          position="absolute"
          bottom="20px"
          right="20px"
          padding="10px"
          alignItems="center"
          fontSize={SMALL}
          fontWeight="800"
          color={TERTIARY}
          textTransform="uppercase"
          hover={{ textDecoration: 'underline' }}
        >
          Read more
          <IoIosArrowThinRight size={30} />
        </Flex>
      </Link>
    </Block>
  </Flex>
)

export const query = graphql`
  fragment PostItem on ContentfulArticle {
    id
    title
    description
    publishedDate
    image {
      description
      fixed(width: 330, height: 390) {
        src
      }
    }
  }
`
