import React from 'react';
import { graphql } from 'gatsby';
import { PageWrapper } from '../components/PageWrapper';
import { PostItem } from '../components/PostItem';
import { SoundContext } from '../components/Sound';

const Archive = ({
  data: {
    allContentfulArticle: { edges },
    allContentfulPodcast: {
      edges: [
        {
          node: {
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
      {({ playStatus, setUrl, play }) => {
        if (playStatus !== 'PLAYING') {
          setUrl(url);
          play();
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
