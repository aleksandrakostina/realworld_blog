import React from "react";
import './Article.scss';
import PropTypes from 'prop-types';
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

const Article = ({ article, isShort }) => (
  <article className="post">
		<div className="post__header">
			<div className="post__header-left">
				{isShort ? <Link to={`${article.slug}`}><h3 className="post__title">{article.title}</h3></Link> : <h3 className="post__title">{article.title}</h3>}
				<button className="post__btn-like btn-like" type="button">
					<HeartOutlined />
					<span className="btn-like__text">{article.favoritesCount}</span>
				</button> 
				<ul className="post__tags">
					{[...new Set(article.tagList)].map(tag => <li key={tag} className="post__tag">{tag}</li>)}
				</ul>
			</div>
			<div className="post__header-right">
				<div className="post__info">
					<h5 className="post__author">{article.author.username}</h5>
					<p className="post__date">{format(new Date(article.createdAt), 'MMMM d, yyyy')}</p>
				</div>
				<div className="post__avatar">
					{article.author.image ? <Avatar src={article.author.image} size={46} alt='avatar' /> : <Avatar icon={<UserOutlined />} size={46} alt='avatar' />}
				</div>
			</div>
		</div>
		<div className="post__body">
			<p className="post__text">
				{article.description} 
			</p>
			{!isShort && <ReactMarkdown>{article.body}</ReactMarkdown>}
		</div>	
  </article>
);

Article.propTypes = {
	article: PropTypes.shape({
		favoritesCount: PropTypes.number,
		author: PropTypes.shape({
			username: PropTypes.string,
			image: PropTypes.string,
		}),
		tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
		title: PropTypes.string,
		createdAt: PropTypes.string,
		description: PropTypes.string,
		slug: PropTypes.string,
		body: PropTypes.string,
	}).isRequired,
	isShort: PropTypes.bool.isRequired,
}

export default Article;