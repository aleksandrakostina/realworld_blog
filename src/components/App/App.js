import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import "./App.scss";
import ArticleListPage from '../ArticleListPage';
import ArticlePage from '../ArticlePage';
import BlogServicesContext from '../BlogServicesContext/BlogServicesContext';
import BlogServices from '../../services/BlogServices';
import NotFound from '../NotFound';

const blog = new BlogServices();

const App = () => (
  <div className='app'>
		<header className='header app__header'>
			<a href='#' className='app__title'><h1>Realworld Blog</h1></a>
			<div className='header__btns'>
				<button type='button' className='header__btn'>Sign In</button>
				<button type='button' className='header__btn--active header__btn'>Sign Up</button>
			</div>
		</header>
		<main className='app__content'>
			<BlogServicesContext.Provider value={blog}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navigate to="/articles" />} />
						<Route path='articles/*' element={<ArticleListPage />} />
						<Route path='articles/:slug' element={<ArticlePage />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</BlogServicesContext.Provider>
		</main>
  </div>
);

export default App;
