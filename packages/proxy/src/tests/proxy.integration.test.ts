// test/proxy-server.integration.test.ts
import test, { describe } from 'node:test';
import * as assert from 'node:assert';
import Fastify from 'fastify';
import { buildServer } from '../index'; // Adjust to correct import path

describe('Proxy server', () => {
  let server;

  // Set up the server instance before running tests
  test.before(async () => {
    server = Fastify();
    await buildServer(server); // Assuming buildServer is your function to initialize routes/plugins
    await server.listen({ port: 3030 });
  });

  // Clean up the server instance after tests complete
  test.after(async () => {
    await server.close();
  });

  describe('validation errors', () => {
    test('should return status 400 for invalid request', async () => {
      // Act: Make a POST request to the /export route with invalid data
      const response = await server.inject({
        method: 'POST',
        url: '/export',
        payload: { blabla: 'invalid data' },
      });

      // Assert: Check that the response status code is 400
      assert.equal(response.statusCode, 400, 'Expected status code to be 400 for invalid request');
    });
  });
});
