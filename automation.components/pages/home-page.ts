import { Page } from "playwright";
import { expect } from '@playwright/test';
import { waitForElement } from '../utilities/common-functions';

export class HomePage {
    page: Page;
    elementIcon: string;
    forms: string;
    alerts: string;
    widgets: string;
    interactions: string;

    constructor(page: Page) {
        this.page = page;
        this.elementIcon = 'xpath=//h5[text()="Elements"]'
        this.forms = 'xpath=//h5[text()="Forms"]'
        this.alerts = 'xpath=//h5[text()="Alerts, Frame & Windows"]'
        this.widgets = 'xpath=//h5[text()="Widgets"]'
        this.interactions = 'xpath=//h5[text()="Interactions"]'
    }

    async navigateToElements(timeOut: number) {
        try 
        {
            (await waitForElement(this.page,this.elementIcon,timeOut)).click();
        }
        catch (error: any) 
        {
            console.error(`Error: ${error.message}`);
            expect("").toThrow();
        }
    }
}