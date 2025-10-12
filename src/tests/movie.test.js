const request = require('supertest');
const app = require('../app'); // import app chính

describe('Movie API', () => {
  it('GET /movies - should return list of movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /movies/:slug - should return a movie', async () => {
    const slug = 'breaking-bad'; // ví dụ slug
    const res = await request(app).get(`/movies/${slug}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.slug).toBe(slug);
  });
});
