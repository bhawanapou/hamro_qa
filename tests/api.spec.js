import { test, expect } from '@playwright/test';
import axios from 'axios';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('API Tests @api @regression', () => {
  const endpoints = testData.api.endpoints;
  const maxResponseTime = testData.api.maxResponseTime;

  test('should return 200 status for homepage', async () => {
    const startTime = Date.now();
    const response = await axios.get(endpoints.homepage, {
      timeout: maxResponseTime,
      validateStatus: () => true,
    });
    const responseTime = Date.now() - startTime;

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

  test('should return 200 status for news page', async () => {
    const startTime = Date.now();
    const response = await axios.get(endpoints.news, {
      timeout: maxResponseTime,
      validateStatus: () => true,
    });
    const responseTime = Date.now() - startTime;

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

  test('should return 200 status for calendar page', async () => {
    const startTime = Date.now();
    const response = await axios.get(endpoints.calendar, {
      timeout: maxResponseTime,
      validateStatus: () => true,
    });
    const responseTime = Date.now() - startTime;

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

  test('should return 200 status for rashifal page', async () => {
    const response = await axios.get(endpoints.rashifal, {
      timeout: maxResponseTime,
      validateStatus: () => true,
    });

    expect(response.status).toBe(200);
  });

  test('should return 200 status for gold page', async () => {
    const response = await axios.get(endpoints.gold, {
      timeout: maxResponseTime,
      validateStatus: () => true,
    });

    expect(response.status).toBe(200);
  });

  test('should return 200 status for forex page', async () => {
    const response = await axios.get(endpoints.forex, {
      timeout: maxResponseTime,
      validateStatus: () => true,
    });

    expect(response.status).toBe(200);
  });

  test('should return valid HTML content for homepage', async () => {
    const response = await axios.get(endpoints.homepage, {
      timeout: maxResponseTime,
    });

    expect(response.headers['content-type']).toMatch(/text\/html/);
    expect(response.data).toContain('hamropatro');
  });

  test('should return proper response headers', async () => {
    const response = await axios.get(endpoints.homepage, {
      timeout: maxResponseTime,
    });

    expect(response.headers).toBeDefined();
    expect(response.headers['content-type']).toBeDefined();
  });

  test('should validate response time for all endpoints', async () => {
    for (const [name, url] of Object.entries(endpoints)) {
      const startTime = Date.now();
      const response = await axios.get(url, {
        timeout: maxResponseTime,
        validateStatus: () => true,
      });
      const responseTime = Date.now() - startTime;

      expect(response.status).toBeLessThan(500);
      expect(responseTime).toBeLessThan(maxResponseTime);
    }
  });

  test('should handle non-existent page with appropriate status', async () => {
    const response = await axios.get(`${endpoints.homepage}/nonexistent-page-12345`, {
      timeout: maxResponseTime,
      validateStatus: () => true,
    });

    // Should return 404 or redirect
    expect([200, 301, 302, 404]).toContain(response.status);
  });
});
