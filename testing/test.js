// regresion tests for gets_data.js promises.
// if testudo has been updated (new semester) run baseline.js using a working
// build to generate new expected output text files (cur-depts.txt, cur-terms... etc) 
const gets = require('../src/get_data');
const fs = require('fs');

const sample_section =   {
    section_number: '0205',
    professor: 'Ilchul Yoon',
    seats_total: '30',
    seats_open: '11',
    seats_waitlist: '0',
    seats_holdfile: null
}


// test getting current terms
function test_get_terms() {
    const url = 'https://app.testudo.umd.edu/soc/';
    
}


//const db = require('./db');

//let query = gets.get_insertion_query(sample_section, '202201', 'CMSC', '131');
// let query = "SELECT * FROM sections;"
// db.execute(query);

//gets.get_cur_depts();
//gets.get_cur_terms();
//gets.get_courses('202201', 'MATH');
//gets.get_sections('CMSC131', '202201');

/*gets.get_cur_terms_promise()
.then(res => console.log(res))
.catch(err => console.log(err));*/

/*gets.get_cur_depts_promise()
.then(res => console.log(res))
.catch(err => console.log(err));*/

/*gets.get_courses('202201', 'MATH')
.then(res => console.log(res))
.catch(err => console.log(err));*/

/*gets.get_sections('CMSC131', '202201')
.then(res => console.log(res))
.catch(err => console.log(err));*/

console.log(gets.get_timestamp());
