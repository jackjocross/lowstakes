import React from 'react';
import Link from 'gatsby-link';
import { Block, Flex } from 'glamor/jsxstyle';
import { formatDistance } from 'date-fns';
import { IoIosArrowThinRight } from 'react-icons/lib/io';
import { GUTTER, COLOR, FONT_SIZE, FONT_WEIGHT } from '../utils/constants';

export const PostSummary = ({
  slug,
  title,
  publishedDate,
  description,
  color,
}) => (
  <Block
    position="relative"
    padding={GUTTER.LG}
    maxHeight={`calc(100% - ${2 * GUTTER.LG}px)`}
  >
    <Link to={slug} style={{ textDecoration: 'none' }}>
      <Block
        fontSize={FONT_SIZE.LG}
        fontWeight={FONT_WEIGHT.BOLD}
        color={color || COLOR.PRIMARY}
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
      color={color || COLOR.TERTIARY}
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
        color={color || COLOR.TERTIARY}
        textTransform="uppercase"
        hover={{ textDecoration: 'underline' }}
      >
        Read more
        <IoIosArrowThinRight size={30} />
      </Flex>
    </Link>
  </Block>
);
