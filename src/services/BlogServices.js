import { getToken } from '../utils/token';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export default class BlogServices {
  baseUrl = 'https://kata.academy:8021/api';

  articlesOnPage = 5;

  getResponse = (url, options, resp = true) =>
    fetch(`${this.baseUrl}/${url}`, options).then((response) => {
      if (!response.ok) {
        throw new Error('Could not get data');
      }
      if (!resp) {
        return true;
      }
      return response.json();
    });

  getOptions = (options) => {
    const { method, token, body } = options;

    const objOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      objOptions.headers.Authorization = `Token ${getToken()}`;
    }
    if (body) {
      objOptions.body = JSON.stringify(body);
    }
    return objOptions;
  };

  getArticles = (page) => {
    const offset = this.articlesOnPage * (page - 1);
    const options = this.getOptions({ method: GET, token: true });
    return this.getResponse(`articles?limit=${this.articlesOnPage}&offset=${offset}`, options);
  };

  getArticle = (id) => {
    const options = this.getOptions({ method: GET, token: true });
    return this.getResponse(`articles/${id}`, options);
  };

  registerUser = (user) => {
    const options = this.getOptions({ method: POST, body: user });
    return this.getResponse(`users`, options);
  };

  loginUser = (user) => {
    const options = this.getOptions({ method: POST, body: user });
    return this.getResponse(`users/login`, options);
  };

  updateUser = (user) => {
    const options = this.getOptions({ method: PUT, body: user, token: true });
    return this.getResponse(`user`, options);
  };

  getCurrentUser = () => {
    const options = this.getOptions({ method: GET, token: true });
    return this.getResponse(`user`, options);
  };

  createArticle = (article) => {
    const options = this.getOptions({ method: POST, body: article, token: true });
    return this.getResponse(`articles`, options);
  };

  deleteArticle = (id) => {
    const options = this.getOptions({ method: DELETE, token: true });
    return this.getResponse(`articles/${id}`, options, false);
  };

  updateArticle = (id, article) => {
    const options = this.getOptions({ method: PUT, body: article, token: true });
    return this.getResponse(`articles/${id}`, options);
  };

  favoriteArticle = (id) => {
    const options = this.getOptions({ method: POST, token: true });
    return this.getResponse(`articles/${id}/favorite`, options);
  };

  unFavoriteArticle = (id) => {
    const options = this.getOptions({ method: DELETE, token: true });
    return this.getResponse(`articles/${id}/favorite`, options);
  };
}
