import { test, expect } from '@playwright/test';
import { ApiHelpers } from '../helpers/api-helpers';

test.describe('API tests', () => {
  let apiHelpers: ApiHelpers;

  test.beforeAll(async ({ playwright }) => {
    const apiContext = await playwright.request.newContext();
    apiHelpers = new ApiHelpers(apiContext);
  });

  test('GET request to retrieve posts', async () => {
    const response = await apiHelpers.makeRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts).not.toHaveLength(0);
  });

  test('POST request to create a post', async () => {
    const postData = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    const response = await apiHelpers.makeRequest('POST', 'https://jsonplaceholder.typicode.com/posts', postData);
    expect(response.status()).toBe(201);
    const post = await response.json();
    expect(post).toHaveProperty('id');
    expect(post.title).toBe(postData.title);
    expect(post.body).toBe(postData.body);
    expect(post.userId).toBe(postData.userId);
  });
});
