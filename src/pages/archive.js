import React from 'react';
import { graphql } from 'gatsby';
import { PageWrapper } from '../components/PageWrapper';
import { PostItem } from '../components/PostItem';
import { SoundContext } from '../components/Sound/Provider';
import { __BROWSER__ } from '../utils/env';

const Archive = ({
  data: {
    allContentfulArticle: { edges },
    allContentfulPodcast: {
      edges: [
        {
          node: {
            title,
            audio: {
              file: { url },
            },
          },
        },
      ],
    },
  },
}) => (
  <PageWrapper>
    {edges.map(({ node: article }) => (
      <PostItem key={article.id} {...article} />
    ))}
    <SoundContext.Consumer>
      {({ title: currentTitle, setTrack }) => {
        if (__BROWSER__ && !currentTitle) {
          setTrack({ title, url });
        }

        return null;
      }}
    </SoundContext.Consumer>
  </PageWrapper>
);

export default Archive;

export const query = graphql`
  query ArchiveQuery {
    allContentfulArticle(sort: { fields: [publishedDate], order: DESC }) {
      edges {
        node {
          id
          ...PostItem
        }
      }
    }
    allContentfulPodcast(
      sort: { fields: [publishedDate], order: DESC }
      limit: 9
    ) {
      edges {
        node {
          title
          audio {
            file {
              url
            }
          }
        }
      }
    }
  }
`;
