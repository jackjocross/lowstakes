import React from 'react';
import Link from 'gatsby-link';
import { formatDistance } from 'date-fns';
import { IoIosArrowThinRight } from 'react-icons/lib/io';
import { GUTTER, COLOR, FONT_SIZE, FONT_WEIGHT } from '../utils/constants';
import { Article } from '../utils/types';

export const PostSummary = ({
  slug,
  title,
  publishedDate,
  description,
  color,
}) => (
  <div
    css={{
      position: 'relative',
      padding: GUTTER.LG,
      maxHeight: `calc(100% - ${2 * GUTTER.LG}px)`,
    }}
  >
    <Link to={slug} style={{ textDecoration: 'none' }}>
      <div
        css={{
          fontSize: FONT_SIZE.LG,
          fontWeight: FONT_WEIGHT.BOLD,
          color: color || COLOR.PRIMARY,
          paddingBottom: GUTTER.SM,
          ':hover': { textDecoration: 'underline' },
        }}
      >
        {title}
      </div>
    </Link>
    <div
      css={{
        fontSize: FONT_SIZE.SM,
        color: COLOR.SECONDARY,
        paddingBottom: GUTTER.LG,
      }}
    >
      {formatDistance(new Date(publishedDate), new Date(), {
        addSuffix: true,
      })}
    </div>
    <div
      css={{
        fontSize: FONT_SIZE.SM,
        color: color || COLOR.TERTIARY,
        lineHeight: '20px',
        marginBottom: GUTTER.XL,
      }}
    >
      {description}
    </div>
    <Link to={slug} style={{ textDecoration: 'none' }}>
      <div
        css={{
          display: 'flex',
          position: 'absolute',
          bottom: GUTTER.MD,
          right: GUTTER.MD,
          padding: GUTTER.SM,
          alignItems: 'center',
          fontSize: FONT_SIZE.XS,
          fontWeight: FONT_WEIGHT.BOLDER,
          color: color || COLOR.TERTIARY,
          textTransform: 'uppercase',
          ':hover': { textDecoration: 'underline' },
        }}
      >
        Read more
        <IoIosArrowThinRight size={30} />
      </div>
    </Link>
  </div>
);

PostSummary.propTypes = Article;
