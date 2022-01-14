// generates expected text files for test.js
// do not run when testing changes beacuse old baseline will be rewritten

const gets = require('../src/get_data');
const fs = require('fs');
const { formatWithOptions } = require('util');

async function get_baseline() {
    // current terms
    let a_term;
    await gets.get_cur_terms_promise()
    .then(cur_terms => {
        fs.writeFileSync('./cur-terms.txt', cur_terms.toString());
        a_term = cur_terms[0];
    })

    // current departments
    let a_dept;
    await gets.get_cur_depts_promise()
    .then(cur_depts => {
        fs.writeFileSync('./cur-depts.txt', cur_depts.toString());
        a_dept = cur_depts[0];
    })

    // get courses for first department/term
    let a_course;
    await gets.get_courses(a_term, a_dept)
    .then(cur_courses => {
        fs.writeFileSync('./cur-courses.txt', cur_courses.toString());
        a_course = cur_courses[0];
    })

    // get sections for 1st course in 1st department/term
    await gets.get_sections_promise(a_course, a_term)
    .then(cur_sections => {
        fs.writeFileSync('./cur-sections.txt', JSON.stringify(cur_sections));
    })

}

get_baseline();