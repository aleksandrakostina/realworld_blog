import React from 'react';
import PropTypes from 'prop-types';
import BlogServices from '../../services/BlogServices';
import { BlogServicesContext } from '../../hooks/useBlogServices';

const blog = new BlogServices();

const BlogServicesProvider = ({ children }) => (
  <BlogServicesContext.Provider value={blog}>{children}</BlogServicesContext.Provider>
);

BlogServicesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogServicesProvider;
