import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import 'antd/dist/antd.min.css';
import ArticleListPage from '../Pages/ArticleListPage';
import ArticlePage from '../Pages/ArticlePage';
import NotFoundPage from '../Pages/NotFoundPage';
import SignInPage from '../Pages/SignInPage';
import ProfilePage from '../Pages/ProfilePage';
import SignUpPage from '../Pages/SignUpPage';
import Header from '../Header';
import ProtectedRoute from '../ProtectedRoute';
import AuthProvider from '../AuthProvider';
import BlogServicesProvider from '../BlogServicesProvider';
import FormArticlePage from '../Pages/FormArticlePage';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <BlogServicesProvider>
          <AuthProvider>
            <Header />
            <main className="app__content">
              <Routes>
                <Route path="/" element={<Navigate to="/articles" />} />
                <Route
                  path="articles/*"
                  element={<ArticleListPage currentPage={currentPage} onChangePage={onChangePage} />}
                />
                <Route path="articles/:slug" element={<ArticlePage />} />
                <Route
                  path="articles/:slug/edit"
                  element={
                    <ProtectedRoute>
                      <FormArticlePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route path="sign-in" element={<SignInPage />} />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new-article"
                  element={
                    <ProtectedRoute>
                      <FormArticlePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </AuthProvider>
        </BlogServicesProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
