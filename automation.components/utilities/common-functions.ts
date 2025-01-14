import {test, Locator} from '@playwright/test';

export async function waitForElement(page:any, elementLocator:string, timeOut:number = 10000):Promise<Locator> 
{
        let returnData:any;
        try {
            await page.locator(elementLocator).waitFor({timeout:timeOut}); 
            returnData = await page.locator(elementLocator);
            console.log(`Element: ${elementLocator} located successfully!`);      
        } catch (error:any) {
            console.error(`Error: ${error.message}`);
            returnData = '';
        }
        return returnData;
}