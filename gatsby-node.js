const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    {
      allContentfulArticle {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allContentfulArticle.edges.forEach(edge => {
    createPage({
      path: edge.node.slug,
      component: path.resolve('src/templates/Post.js'),
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
