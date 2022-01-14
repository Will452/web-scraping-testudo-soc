const gets = require('./src/get_data');

const term = '202201';

// get list of departments
dept_promise_arr = [];
gets.get_cur_depts_promise()
.then(depts => {
    //console.log(depts);
    let progress = 0;
    let total_depts = depts.length;
    console.log('here');
    for(let i = 1; i < total_depts; i++){
        cur_dept = depts[i];
        dept_promise_arr
        .push(gets.get_courses_promise(term, cur_dept)
            .then(() => {
                progress++;
                process.stdout.write(`${progress} of ${total_depts} `);
            })
        );
        if(i > 1)
            break;
    }

    Promise.allSettled(dept_promise_arr)
    .then( course_dept_arr => {
        console.log('Done with all departments');
        console.log(course_dept_arr.length);
    })
    .catch(err => console.log(err))
})
.catch(err => console.log(err))

