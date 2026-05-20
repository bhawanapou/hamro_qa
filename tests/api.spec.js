import { test, expect } from './testSetup.js';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('API Tests @api @regression', () => {
  const endpoints = testData.api.endpoints;
  const maxResponseTime = testData.api.maxResponseTime;
  const acceptableStatuses = [200, 301, 302, 403, 404];

  for (const [name, url] of Object.entries(endpoints)) {
    test(`should validate response for ${name} endpoint`, async ({ request }) => {
      const startTime = Date.now();
      const response = await request.get(url, { timeout: maxResponseTime });
      const responseTime = Date.now() - startTime;

      expect(acceptableStatuses).toContain(response.status());
      expect(responseTime).toBeLessThan(maxResponseTime);
      expect(response.headers()['content-type']).toBeTruthy();

      const contentType = response.headers()['content-type'] || '';
      if (contentType.includes('application/json')) {
        const body = await response.json();
        expect(typeof body).toBe('object');
      } else {
        const textBody = await response.text();
        expect(textBody.length).toBeGreaterThan(30);
      }
    });
  }

  test('should return a valid status for a missing page', async ({ request }) => {
    const response = await request.get(`${endpoints.homepage}/nonexistent-page-12345`, {
      timeout: maxResponseTime,
    });

    expect([200, 301, 302, 403, 404]).toContain(response.status());
  });
});
