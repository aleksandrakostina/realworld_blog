import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import 'antd/dist/antd.min.css';
import ArticleListPage from '../ArticleListPage';
import ArticlePage from '../ArticlePage';
import BlogServicesContext from '../BlogServicesContext/BlogServicesContext';
import BlogServices from '../../services/BlogServices';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import Profile from '../Profile';
import SignUp from '../SignUp';
import Header from '../Header';
import ProtectedRoute from '../ProtectedRoute';
import AuthProvider from '../AuthProvider';
import NewArticle from '../NewArticle';
import EditArticle from '../EditArticle';

const blog = new BlogServices();

const App = () => (
  <div className="app">
    <BrowserRouter>
      <BlogServicesContext.Provider value={blog}>
        <AuthProvider>
          <Header />
          <main className="app__content">
            <Routes>
              <Route path="/" element={<Navigate to="/articles" />} />
              <Route path="articles/*" element={<ArticleListPage />} />
              <Route
                path="articles/:slug"
                element={
                  <ProtectedRoute>
                    <ArticlePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="articles/:slug/edit"
                element={
                  <ProtectedRoute>
                    <EditArticle />
                  </ProtectedRoute>
                }
              />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new-article"
                element={
                  <ProtectedRoute>
                    <NewArticle />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </AuthProvider>
      </BlogServicesContext.Provider>
    </BrowserRouter>
  </div>
);

export default App;
