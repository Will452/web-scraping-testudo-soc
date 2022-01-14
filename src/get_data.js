const axios = require('axios');

exports.get_cur_terms_promise = () => {
    return new Promise((resolve, reject) => {
        const url = 'https://app.testudo.umd.edu/soc/';
        console.log('getting current terms');

        //get html source
        axios.get(url)
        .then(response => {
            let source_html = response.data; //readability

            let terms = [];
            // match term ids using regex
            // the 6 digits in following regex are term id
            const re_term_id = /<option value="(\d{6})"[a-z "=]*?>[A-Za-z0-9 ]+?<\/option>/g;
            while( match = re_term_id.exec(source_html))
                terms.push(match[1]);
            console.log(`got ${terms.length} current terms`)
            //console.log(terms.join(' '));
            resolve(terms);

        }).catch(error => { console.log(error); reject(err) });
    });
}

exports.get_cur_terms = () => {
    const url = 'https://app.testudo.umd.edu/soc/';
    console.log('getting current terms');

    //get html source
    axios.get(url)
    .then(response => {
        let source_html = response.data; //readability

        let terms = [];
        // match term ids using regex
        // the 6 digits in following regex are term id
        const re_term_id = /<option value="(\d{6})"[a-z "=]*?>[A-Za-z0-9 ]+?<\/option>/g;
        while( match = re_term_id.exec(source_html))
            terms.push(match[1]);
        console.log(`got ${terms.length} current terms`)
        //console.log(terms.join(' '));
        return terms;

    }).catch(error => { console.log(error); });
    return []; //return empty arr in case of error
}

exports.get_cur_depts_promise = () => {
    return new Promise((resolve, reject) => {
        const url = 'https://app.testudo.umd.edu/soc/';
        console.log('getting current departments');

        // get html source
        axios.get(url)
        .then(response => {
            let source_html = response.data; //readability

            let depts = [];
            // match department ids using regex
            const re_dept_id = /<a href="\d{6}\/([A-Z]{4})" class="clearfix">/g
            while( match = re_dept_id.exec(source_html))
                depts.push(match[1]);
            console.log(`got ${depts.length} current departments`)
            //console.log(depts.join(' '));
            resolve(depts);

        }).catch(error => { console.log(error); reject(error) });
    
    });

}

exports.get_cur_depts = () => {
    const url = 'https://app.testudo.umd.edu/soc/';
    console.log('getting current departments');

    // get html source
    axios.get(url)
    .then(response => {
        let source_html = response.data; //readability

        let depts = [];
        // match department ids using regex
        const re_dept_id = /<a href="\d{6}\/([A-Z]{4})" class="clearfix">/g
        while( match = re_dept_id.exec(source_html))
            depts.push(match[1]);
        console.log(`got ${depts.length} current departments`)
        //console.log(depts.join(' '));
        return depts;

    }).catch(error => { console.log(error); });
    return []; //return empty arr in case of error
}

/**
 * @param {String} term_id eg. '202201' for Spring 2022
 * @param {String} dept_id eg. 'MATH' or 'ENGL'
 * @returns promise with array of course name Strings or empty array on fail
 */
 exports.get_courses_promise = (term_id, dept_id) => {
    return new Promise((resolve, reject) => {
        //https://app.testudo.umd.edu/soc/202201/AASP
        const url = `https://app.testudo.umd.edu/soc/${term_id}/${dept_id}`
        console.log(`getting courses for department ${dept_id} during term ${term_id}`);
    
        //get html source
        return axios.get(url)
        .then(response => {
            let source_html = response.data; //readability
    
            let courses = [];
            // match course ids using regex
            const re_course_id = /<div id="([A-Z]{4}\d{3}[A-Z]?)" class="course">/g;
            while( match = re_course_id.exec(source_html))
                courses.push(match[1]);
            console.log(`got ${courses.length.toString().padEnd(3)} courses in ${dept_id} term ${term_id}`)
            //console.log(courses.join(' '));
            resolve(courses);
        }).catch(error => { 
            console.log(`404 page not found 
        for department ${dept_id} term ${term_id}`/*error*/);
            resolve(error);
        });
    });
}

/**
 * @param {String} term_id eg. '202201' for Spring 2022
 * @param {String} dept_id eg. 'MATH' or 'ENGL'
 * @returns promise with array of course name Strings or empty array on fail
 */
exports.get_courses = (term_id, dept_id) => {
//https://app.testudo.umd.edu/soc/202201/AASP
    const url = `https://app.testudo.umd.edu/soc/${term_id}/${dept_id}`
    console.log(`getting courses for department ${dept_id} during term ${term_id}`);

    //get html source
    return axios.get(url)
    .then(response => {
        let source_html = response.data; //readability

        let courses = [];
        // match course ids using regex
        const re_course_id = /<div id="([A-Z]{4}\d{3}[A-Z]?)" class="course">/g;
        while( match = re_course_id.exec(source_html))
            courses.push(match[1]);
        console.log(`got ${courses.length} courses in ${dept_id} term ${term_id}`)
        //console.log(courses.join(' '));
        return courses;
    }).catch(error => { 
        console.log(`404 page not found 
    for department ${dept_id} term ${term_id}`/*error*/);
        return []; //return empty arr in case of error
    });
}

/**
 * @param {String} course_id 'MATH240' or 'ENGL101'
 * @param {String} term_id eg. '202201' for Spring 2022
 * @returns promise with array of objects or empty array on failure
*/
exports.get_sections_promise = (course_id, term_id) => {
    console.log(`getting sections for course ${course_id} during term ${term_id}`);
    return new Promise((resolve, reject) => {
        //  todo find a way to store term_id for input validation
        if (!valid_course_id(course_id)) {
            console.log(`invalid iput: ${course_id} is not a valid course id`);
            return []; //invalid input
        }

        let dept = course_id.substring(0,4);
        const url = `https://app.testudo.umd.edu/soc/${term_id}/sections?courseIds=${course_id}`;

        return axios.get(url)
        .then(response => {
            let source_html = response.data; //readability
            let sections = [];

            // todo this https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
            const re_section = /<span class="section-id">\s*(\d{4})[\sa-z<\/>="-]*<span class="section-instructor">([A-Za-z ]*)[\sA-Za-z<\/>="-\\]*total-seats-count">(\d*)[\sA-Za-z<\/>="-\\]*open-seats-count">(\d*)[\sA-Za-z<\/>="-\\]*?waitlist-count">(\d*)([\sA-Za-z<\/>="-\\]*waitlist-count">(\d*))?/g;
            while( match = re_section.exec(source_html)) {
                let cur_section = {};
                cur_section.section_number = match[1];
                cur_section.professor = match[2];
                cur_section.seats_total = match[3];
                cur_section.seats_open = match[4];
                cur_section.seats_waitlist = match[5];
                if(match[7])
                    cur_section.seats_holdfile = match[7];
                else
                    cur_section.seats_holdfile = null;
                sections.push(cur_section);
            }
            console.log(`got ${sections.length} sections for course ${course_id} term ${term_id}`);
            //console.log(sections);
            resolve(sections);
        }).catch(error => { 
            console.log(`404 sections not found for course ${course_id} term ${term_id}`/*error*/);
            reject(error);
        });
    });
}


/**
 * @param {String} course_id 'MATH240' or 'ENGL101'
 * @param {String} term_id eg. '202201' for Spring 2022
 * @returns promise with array of objects or empty array on failure
*/
exports.get_sections = (course_id, term_id) => {
    console.log(`getting sections for course ${course_id} during term ${term_id}`);
    //  todo find a way to store term_id for input validation
    if (!valid_course_id(course_id)) {
        console.log(`invalid iput: ${course_id} is not a valid course id`);
        return []; //invalid input
    }

    let dept = course_id.substring(0,4);
    const url = `https://app.testudo.umd.edu/soc/${term_id}/sections?courseIds=${course_id}`;

    return axios.get(url)
    .then(response => {
        let source_html = response.data; //readability
        let sections = [];

        // todo this https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
        const re_section = /<span class="section-id">\s*(\d{4})[\sa-z<\/>="-]*<span class="section-instructor">([A-Za-z ]*)[\sA-Za-z<\/>="-\\]*total-seats-count">(\d*)[\sA-Za-z<\/>="-\\]*open-seats-count">(\d*)[\sA-Za-z<\/>="-\\]*?waitlist-count">(\d*)([\sA-Za-z<\/>="-\\]*waitlist-count">(\d*))?/g;
        while( match = re_section.exec(source_html)) {
            let cur_section = {};
            cur_section.section_number = match[1];
            cur_section.professor = match[2];
            cur_section.seats_total = match[3];
            cur_section.seats_open = match[4];
            cur_section.seats_waitlist = match[5];
            if(match[7])
                cur_section.seats_holdfile = match[7];
            else
                cur_section.seats_holdfile = null;
            sections.push(cur_section);
        }
        console.log(`got ${sections.length} sections for course ${course_id} term ${term_id}`);
        console.log(sections);
        return sections;
    }).catch(error => { 
        console.log(`404 sections not found for course ${course_id} term ${term_id}`/*error*/);
        return []; //return empty arr in case of error
    });
}

// timestamp based on https://usefulangle.com/post/187/nodejs-get-date-time
exports.get_timestamp = () => {
    let date_ob = new Date();
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    return timestamp;
}

exports.get_insertion_query = (section, term_id, dept_id, course_id) => {
    let str = `INSERT INTO sections VALUES (null, `
        + `'${term_id}', `
        + `'${dept_id}', `
        + `'${course_id}', `
        + `${section.section_number}, `
        + `'${section.professor}', `
        + `${section.seats_total}, `
        + `${section.seats_open}, `
        + `${section.seats_waitlist}, `
        + `${section.seats_holdfile}, `
        + `'${exports.get_timestamp()}'`
        + `);`;
        console.log(str);
    return str;
}

function valid_course_id(course_id) {
    return /[A-Z]{4}\d{3}[A-Z]?/g.test(course_id);
}

// debug & testing
// exports.get_cur_depts();
// exports.get_cur_terms();
// exports.get_courses('202201', 'MATH');