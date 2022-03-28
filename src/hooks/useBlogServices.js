import { createContext, useContext } from 'react';

export const BlogServicesContext = createContext();

export const useBlogServices = () => useContext(BlogServicesContext);
