/* eslint-disable space-in-parens */
/* eslint-disable quote-props */
require( '../../app' );
const file = require('../../test.csv');
const csv = require('csv-parser');
const { AddressService } = require( '../../src/services/Address' );
const { Address } = require( '../../src/models/Address' );
const addressService = new AddressService(
    new Address().getInstance()
);
const { BankService } = require( '../../src/services/BankInfo' );
const { BankInfo } = require( '../../src/models/BankInfo' );
const bankService = new BankService(
    new BankInfo().getInstance()
);
const { EmployeeService } = require( '../../src/services/EmployeeService' );
const { Employee } = require( '../../src/models/Employee' );
const employeeService = new EmployeeService(
    new Employee().getInstance()
);
// const { CompanyService } = require( './src/services/CompanyService' );
// const { Company } = require( './src/models/Company' );
// const companyService = new CompanyService(
//     new Company().getInstance()
// );
const fs = require('fs');

fs.createReadStream( file )
    .pipe(csv())
    .on('data', async( data ) => {
        console.log(data);
        // insert bank details
        const bankData = {
            'bankName': data.bankName.trim(),
        };
        const bankInfo = await bankService.createBank(bankData);

        // const comp = {
        //     'companyName': data.companyName
        // };
        // const company = companyService.createCompany(comp);
        //  insert address details
        const addData = {
            'addressLine1': data.addressLine1.trim(),
            'addressLine2': data.addressLine2.trim(),
            'city': data.city,
            'province': data.province,
            'country': data.country,
            'postalCode': data.postalCode
        };
        const address = await addressService.createAddress(addData);

        console.log(address.data.id);
        const empData = {
            'firstName': data.firstName,
            'lastName': data.lastName,
            'dob': data.dob,
            'reference': data.reference,
            'employeeAddress': address.data.id,
            'employeeBank': bankInfo.data.id,
        };
        const employee = await employeeService.createEmployee(empData);

        console.log(employee);
    })
    .on('end', () => {
        console.log('finished');
    });
