import React from 'react'
import Link from 'gatsby-link'

import logo from './sheerlogo.png'
import chitlin from './chitlin.png'

const IndexPage = ({ data }) =>
  console.log({ data }) || (
    <div>
      <div className="o-wrapper o-grid c-nav ">
        <div className="c-nav__brand o-grid__cell">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="c-nav__logo"
              style={{ width: '100px', height: '100px' }}
            />
          </Link>
        </div>
        <div>
          <div className="c-nav__open-button ">
            <span className="c-nav__open-button__icon" />
            <span className="c-nav__open-button__icon" />
            <span className="c-nav__open-button__icon" />
          </div>
          <ul className="c-nav__items nav-collapse o-grid__cell o-type--medium">
            <li className="c-nav__link">
              <Link to="/shows">Shows</Link>
            </li>
            <li className="c-nav__link">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="o-wrapper u-flex">
        <div className="c-cal">
          <div className="c-cal__day">
            {data.allMarkdownRemark.edges.map(
              ({
                node: {
                  frontmatter: { title, tags, date, description },
                  excerpt,
                },
              }) => (
                <div className="c-event-listing c-event-listing--featured vevent">
                  <div className="c-event-listing__info o-type--small">
                    <p className="c-event-listing__time">{tags[0]}</p>
                    <span
                      className="o-icon c-event-listing__meta-icon"
                      style={{ color: '#9E68FC' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#9E68FC"
                        viewBox="0 0 55.3 64"
                      >
                        <path d="M37.1 30.4c-2.8 2.2-21.2 17-25.4 20.4l-7.2-7.2 20.4-25.3 12.2 12.1zM51.2 4.1c-5.5-5.5-14.4-5.5-19.8 0-3.6 3.6-3.9 7.6-4.1 9l15 15c1.3-.1 5.3-.5 9-4.1 5.4-5.5 5.4-14.4-.1-19.9zM25 52c-6.1 0-8.9 3.8-12.8 6.3-2.8 1.7-5.4.9-6.7-.7-.5-.6-1.8-2.7.4-5l-.3-.3-3-2.9c-3.7 3.8-3 8.3-.7 11.1 2.6 3.2 7.8 4.8 12.8 1.7 4.2-2.7 6.1-5.6 10.4-5.6 2.8 0 5.3 1.2 9.3 7.4l3.9-2.5C34.5 55.8 30.8 52 25 52z" />
                      </svg>

                      <Link className="o-link--category category" to="/">
                        Audio
                      </Link>
                    </span>

                    <span className="location">
                      <Link
                        to="/"
                        className="o-link--generic c-event-listing__space"
                      >
                        {date}
                      </Link>
                    </span>
                  </div>
                  <Link to="/">
                    <div className="c-image c-image--square c-event-listing__image">
                      <img src={chitlin} />
                    </div>
                  </Link>

                  <div className="c-event-listing__detail">
                    <Link to="/">
                      <h1 className="c-event-listing__title o-type--medium summary">
                        {title}
                      </h1>

                      <h4 className="c-event-listing__presenter o-type--small">
                        {description}
                      </h4>
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`
