import * as XLSX from 'xlsx';
import { expect } from '@playwright/test';

type KeyValuePair = { key: string; value: any; };

export class dataModel {

    public dataValue: KeyValuePair[] = [];
    private testCaseName: string;

    constructor(testCaseName:string){
        this.testCaseName = testCaseName;
    }

    readExcelFile(filePath: string = __dirname + '/testDataFile.xlsx') {
        let data: any[] = [];
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            data = XLSX.utils.sheet_to_json(sheet);
            let testData: KeyValuePair[] = [];
            for (let index in data) {
                testData.push({ key: data[index]['TestCaseName'], value: data[index] });
            }
            this.dataEncaps.set(testData);
        } catch (error: any) {
            console.error("Error message:", error.message);
            expect("data model class failed").toThrow();
        }
    }

    dataEncaps = {
        set: (setdata: KeyValuePair[]) => { this.dataValue = setdata },
        get: () => this.dataValue,
    }

    iterateTestDataCollection() {
        let readData = this.dataEncaps.get();
        readData.forEach(pair => {
            let rowData = pair.value;
            for (let eachKey in rowData) {
                console.log(`Key: ${eachKey}, Value: ${rowData[eachKey]}`);
            }
        });
    }

    fetch(field: string) {
        let readData: KeyValuePair[] = this.dataEncaps.get();
        let returnData;
        readData.forEach(pair => {
            if (pair.key === this.testCaseName) {
                let rowData = pair.value;
                returnData = rowData[field];
            }
        });
        return returnData;
    }


}

// let dataObj = new dataModel();
// dataObj.readExcelFile();
// // dataObj.iterateTestDataCollection();
// const fieldValue = dataObj.getSpecificFieldValue('TC02', 'Name');
// console.log(`the expected field value is ${fieldValue}`);