const payrollData = [
    {
        employees: 
        [
        {
            name: "Armando Lanugon",
            idNumber: "2021-0126-001",
            bankAccount: "AUB 916-10-55635-1",
            departmentid: "1G",
            department: "Graphics A",
            rate: 0.70,
            recordid: "1W"
        },

        {
            name: "Jake Gaviola",
            idNumber: "2020-0105-004",
            bankAccount: "AUB 327-011-000114-7",
            departmentid: "1G",
            rate: 0.05,
            recordid: "1S"
        },
        ],


        records: 
        [
        {
            recordid: "1S",
            payrollPeriod: "December 1-31, 2024",
            payrollDate: "January 13, 2025",
            client: "Graphics Design Work",
        // client2: "  ",
            grossAmount: 13995.60,
        // grossAmount2: "35,466.24",
            netAmount: 699.78,
        // netAmount2: "1,773.31",
            deductions: "None",
            deductionAmount: "0.00",
            totalAmount: 699.78,
        },
        {
            payrollPeriod: "December 1-31, 2024",
            payrollDate: "January 13, 2025",
            client: "Graphics Design Work",
            // client2: "  ",
            grossAmount: 13995.60,
            // grossAmount2: "35,466.24",
            netAmount: 699.78,
            // netAmount2: "1,773.31",
            deductions: "None",
            deductionAmount: "0.00",
            totalAmount: 699.78,

        }
    ]
    }
]

export const fetchPayrollDataByName = (name,)
//     "firstName": "Jake",
//     "lastName": "Gaviola",
//     "middleName": "Bungaos",
//     "department": "Graphics A"
//       },
//       {  
//     "idNumber": "2021-0126-001",
//     "firstName": "Armando",
//     "lastName": "Lanugon",
//     "middleName": "Luib",
//     "department": "Graphics A"
//       }