export default class BlogServices {
  baseUrl = 'https://kata.academy:8021/api';

  articlesOnPage = 5;

  getResponse = (url) => (
    fetch(`${this.baseUrl}/${url}`).then(response => {
      if(!response.ok) {  
        throw new Error('Could not get data');
      }
      return response.json();
    })
  );

  getArticles = (page) => {
    const offset = this.articlesOnPage * (page - 1);
    return this.getResponse(`articles?limit=${this.articlesOnPage}&offset=${offset}`);
  };

  getArticle = (id) => this.getResponse(`articles/${id}`);
}
