import {test, Locator, Page} from '@playwright/test';


// Getter and Setters
// ======================================================================================================================================
let testCaseName: string;
let className: string;

export let testCaseNameGetSet = {
    set: (setdata: string) => { testCaseName = setdata },
    get: () => testCaseName,
}

export let ClassNameGetSet = {
    set: (setdata: string) => { className = setdata },
    get: () => className,
}

// ========================================================================================================================================

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