import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { ElementsPage } from '../pages/elements-page';
import { setupHooks } from './hooks';
import { Page } from '../pages/page-objects';
import { ExecutorGetSet, testCaseNameGetSet } from '../utilities/common-functions';

// Apply hooks
setupHooks();

if (ExecutorGetSet.get().find((element) => element.key === test.info().title)?.value === 'Y') 
{
    test('TC01', async ({ page }) => {        
        let homePage = new HomePage(page);
        let elementsPage = new ElementsPage(page);
        homePage.navigateToElements(30000);
        elementsPage.textBox_HappyPathValidation(Page.data.fetch('Name'), Page.data.fetch('Email'), Page.data.fetch('Current Address'), Page.data.fetch('Permanent Address'));
        await page.waitForTimeout(6000);
    });
}

// if ('Y' === 'Y') {
//     test('TC02', async ({ page }) => {
//         let homePage = new HomePage(page);
//         let elementsPage = new ElementsPage(page);
//         homePage.navigateToElements(30000);
//         elementsPage.textBox_HappyPathValidation(Page.data.fetch('Name'), Page.data.fetch('Email'), Page.data.fetch('Current Address'), Page.data.fetch('Permanent Address'));
//         await page.waitForTimeout(6000);
//     });
// }

// if ('Y' === 'Y') {
//     test('TC03', async ({ page }) => {
//         let homePage = new HomePage(page);
//         let elementsPage = new ElementsPage(page);
//         homePage.navigateToElements(30000);
//         elementsPage.textBox_HappyPathValidation(Page.data.fetch('Name'), Page.data.fetch('Email'), Page.data.fetch('Current Address'), Page.data.fetch('Permanent Address'));
//         await page.waitForTimeout(6000);
//     });
// }

// if ('Y' === 'Y') {
//     test('TC04', async ({ page }) => {
//         let homePage = new HomePage(page);
//         let elementsPage = new ElementsPage(page);
//         homePage.navigateToElements(30000);
//         elementsPage.textBox_HappyPathValidation(Page.data.fetch('Name'), Page.data.fetch('Email'), Page.data.fetch('Current Address'), Page.data.fetch('Permanent Address'));
//         await page.waitForTimeout(6000);
//     });
// }