import { test, expect } from '@playwright/test';
import { ApiHelpers } from '../helpers/api-helpers';

test.describe('API tests', () => {
  let apiHelpers: ApiHelpers;

  test.beforeAll(async ({ playwright }) => {
    const apiContext = await playwright.request.newContext();
    apiHelpers = new ApiHelpers(apiContext);
  });

  test('GET request to retrieve posts', async () => {
    const response = await apiHelpers.makeRequest('GET', 'http://localhost:3000/users');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    console.log({posts})
    expect(posts[0].name).toContain('User One')
    expect(posts).not.toHaveLength(0);
  });
  
  test('Create a new user', async () => {
    const newUserResponse = await apiHelpers.makeRequest('POST', 'http://localhost:3000/users', 
        { name: 'New User', email: 'newuser@example.com' }
      );
      expect(newUserResponse.status()).toBe(201);
      const posts = await newUserResponse.json();

      console.log(JSON.stringify(posts))
  })

  // test('POST request to create a post', async () => {
  //   const postData = {
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1,
  //   };
  //   const response = await apiHelpers.makeRequest('POST', 'https://jsonplaceholder.typicode.com/posts', postData);
  //   expect(response.status()).toBe(201);
  //   const post = await response.json();
  //   expect(post).toHaveProperty('id');
  //   expect(post.title).toBe(postData.title);
  //   expect(post.body).toBe(postData.body);
  //   expect(post.userId).toBe(postData.userId);
  // });
});
