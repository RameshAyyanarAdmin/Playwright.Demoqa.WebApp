import { test, Locator, expect } from '@playwright/test';
import { dataModel } from '../utilities/data-model';
import { HomePage } from '../pages/home-page';
import { ElementsPage } from '../pages/elements-page';

test('TC01', async ({ page }) => {
    const testName = test.info().title;
    let data = new dataModel(testName);
    data.readExcelFile();
    let homePage = new HomePage(page);
    let elementsPage = new ElementsPage(page);

    await page.goto('https://demoqa.com/', {timeout:60000});
    console.log('Page loaded!');
    homePage.navigateToElements(30000);
    elementsPage.textBox_HappyPathValidation(data.fetch('Name'), data.fetch('Email'), data.fetch('Current Address'), data.fetch('Permanent Address'));
    await page.waitForTimeout(6000);         
});

test('TC02', async ({ page }) => {
    const testName = test.info().title;
    let data = new dataModel(testName);
    data.readExcelFile();
    let homePage = new HomePage(page);
    let elementsPage = new ElementsPage(page);

    await page.goto('https://demoqa.com/', {timeout:60000});
    console.log('Page loaded!');
    homePage.navigateToElements(30000);
    elementsPage.textBox_HappyPathValidation(data.fetch('Name'), data.fetch('Email'), data.fetch('Current Address'), data.fetch('Permanent Address'));
    await page.waitForTimeout(6000);         
});