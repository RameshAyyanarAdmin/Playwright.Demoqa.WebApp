import * as XLSX from 'xlsx';
import { expect } from '@playwright/test';
import { ClassNameGetSet, ExecutorGetSet, testCaseNameGetSet } from '../utilities/common-functions';

type KeyValuePair = {key: string; value: any;};
type TestExecuteStatus = {key: string; value: string;};

export class dataModel {

    public TestExecuteStatus: KeyValuePair[] = [];
    public dataValue: {[sheetName: string]: KeyValuePair[]} = {};

    readExcelFile(filePath: string = __dirname + '/testDataFile.xlsx') 
    {
        try {
            const workbook = XLSX.readFile(filePath);
            let testData: {[sheetName: string]: KeyValuePair[]} = {};
            workbook.SheetNames.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                const range = XLSX.utils.decode_range(sheet['!ref']!);
                let sheetData: KeyValuePair[] = [];
                for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
                    let row: any = {};
                    for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                        const cellAddress = { c: colNum, r: rowNum };
                        const cellRef = XLSX.utils.encode_cell(cellAddress);
                        const cell = sheet[cellRef];
                        if (cell) {
                            const headerCellAddress = { c: colNum, r: range.s.r };
                            const headerCellRef = XLSX.utils.encode_cell(headerCellAddress);
                            const headerCell = sheet[headerCellRef];
                            if (headerCell) {
                                row[headerCell.v] = cell.v;
                            }
                        }
                    }
                    if (row['TestCaseName']) {
                        sheetData.push({key: row['TestCaseName'], value: row});
                    }
                }
                testData[sheetName] = sheetData;
            });
            this.dataEncaps.set(testData);
        } catch (error: any) {
            console.error("Error message:", error.message);
            expect("data model class failed").toThrow();
        }
    }

    readTestExecutor(filePath: string = __dirname + '/testDataFile.xlsx') {
        let data: any[] = [];
        let testData: TestExecuteStatus[] = [];
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            data = XLSX.utils.sheet_to_json(sheet);
            for (let index in data) 
                {
                 let keyValue:string = data[index]['Scenario']
                 let pairValue:string = data[index]['ExecuteFlag']
                 console.log("Key Value is: ", keyValue, " Pair Value is: ", pairValue);
                 testData.push({key: keyValue, value: pairValue});
                }
        } catch (error: any) {
            console.error("Error message:", error.message);
            expect("data model class failed").toThrow();
        }
        ExecutorGetSet.set(testData);
    }

    dataEncaps = {
        set: (setdata:{[sheetName: string]: KeyValuePair[]}) => {this.dataValue=setdata},
        get: () => this.dataValue,
    }

    fetch(field: string) {
        let testData = this.dataEncaps.get();
        let returnData;
        for (let sheetName in testData) {
            if (sheetName === ClassNameGetSet.get()) {
                let sheetData = testData[sheetName];
                sheetData.forEach(pair => {                    
                    if (pair.key === testCaseNameGetSet.get()) {
                        let rowData = pair.value;
                        returnData = rowData[field];
                    }
                });
            }
        }
        return returnData;
    }
}