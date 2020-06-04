import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = '/';
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1 style={{ marginTop: 0 }}>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to="/"
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to="/"
          >
            {title}
          </Link>
        </h3>
      );
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          ©
          {' '}
          {new Date().getFullYear()}
          , Built with
          {' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    );
  }
}

Layout.propTypes = {
  location: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

export default Layout;
