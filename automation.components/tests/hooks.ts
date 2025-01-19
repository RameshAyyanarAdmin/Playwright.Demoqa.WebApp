import { test } from '@playwright/test';
import {testCaseNameGetSet } from '../utilities/common-functions';
import { Page } from '../pages/page-objects';

export const setupHooks = () => {
  // Runs before each test
  test.beforeEach(async ({ page }) => {
    console.log('Setting up before each test');
        const testCaseName = test.info().title;
        testCaseNameGetSet.set(testCaseName);
        await page.goto('https://demoqa.com/', {timeout:60000});
        console.log('Page loaded!');
  });

  // Runs after each test
  test.afterEach(async ({ page }) => {
    console.log('Cleaning up after each test');
    await page.close();
  });

  // Runs before all tests
  test.beforeAll(async () => {
    console.log('Setting up before all tests');
    // Example: Initialize global resources here
    Page.data.readExcelFile();
  });

  // Runs after all tests
  test.afterAll(async () => {
    console.log('Cleaning up after all tests');
    // Example: Clean up global resources here
  });
};
