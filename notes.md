data heirarchy:
- term(s)
- dept(s)
- course(s)
will need indiv request for each course. see link below
- section(s)
- professor, total seats, open seats, waitlist, holdfile

food for thought
would it be more efficient to store only list of section objects with metadata
instead of heirical data?
Maybe for small datasets
Probably not for large amounts of data, n vs log(n)

what language?

python:
nice syntax
neat? 

js:
promises and ez async for concurrent scraping

idk python async so I'm going to go with js

to build this we need dynamic info:
1. term (202201)
2. course_id (AASP100H)

order to write and test subroutines:
1. get_cur_depts() X
2. get_cur_terms() X
3. get_courses(dept_id, term_id) X
3. .5 num_courses(semester_id, dept_id optional)
4. get_sections(course_id, term_id) X
5. scrape(), will need to figure out persistent storage

extra todo:
make methods that send requests return promises
validate input for get_courses
add @param and jsdoc comments 
