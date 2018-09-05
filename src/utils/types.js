import PropTypes from 'prop-types';

// @todo probably just move to TypeScript

export const Article = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  body: PropTypes.string,
  image: PropTypes.shape({
    description: PropTypes.string.isRequired,
    sizes: PropTypes.object.isRequired,
  }).isRequired,
};

export const Podcast = {
  title: PropTypes.string.isRequired,
  audio: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
