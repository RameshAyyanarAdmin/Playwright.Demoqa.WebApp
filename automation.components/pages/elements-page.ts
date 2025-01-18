import { Page } from "playwright";
import { expect } from '@playwright/test';
import { waitForElement, ClassNameGetSet } from '../utilities/common-functions';

export class ElementsPage {
    page: Page;
    textBoxTab: string;
    fullName_Editbox: string;
    email_Editbox: string;
    currentAddress_Textarea: string;
    permanentAddress_Textarea: string;
    submit_Button: string;
    currentClassName: string;

    constructor(page: Page) 
    {
        this.currentClassName = this.constructor.name;
        ClassNameGetSet.set(this.currentClassName);
        this.page = page;
        this.textBoxTab = 'xpath=//span[text()="Text Box"]/parent::li';
        this.fullName_Editbox = 'xpath=//label[text()="Full Name"]/parent::div/following-sibling::div/input[@id="userName"]';
        this.email_Editbox = 'xpath=//label[text()="Email"]/parent::div/following-sibling::div/input[@id="userEmail"]';
        this.currentAddress_Textarea = 'xpath=//label[text()="Current Address"]/parent::div/following-sibling::div/*[@id="currentAddress"]';
        this.permanentAddress_Textarea = 'xpath=//label[text()="Permanent Address"]/parent::div/following-sibling::div/*[@id="permanentAddress"]';
        this.submit_Button = 'xpath=//button[text()="Submit"]';
    }

    async textBox_HappyPathValidation(name:any, email:any, currentAddress:any, permAddress:any) {
        try 
        {
            (await waitForElement(this.page,this.textBoxTab)).click();
            (await waitForElement(this.page,this.fullName_Editbox)).fill(name);
            (await waitForElement(this.page,this.email_Editbox)).fill(email);
            (await waitForElement(this.page,this.currentAddress_Textarea)).fill(currentAddress);
            (await waitForElement(this.page,this.permanentAddress_Textarea)).fill(permAddress);
            (await waitForElement(this.page,this.submit_Button)).click();
        }
        catch (error: any) 
        {
            console.error(`Error: ${error.message}`);
            expect("").toThrow();
        }
    }
}