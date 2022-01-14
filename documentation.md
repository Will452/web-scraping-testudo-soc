## get_cur_terms()

Returns an array of all term id numbers currently present at 
https://app.testudo.umd.edu/soc/
eg. ['202201', ...]; 202201 is for spring 2022 

## get_cur_depts()

Returns an array of all departement codes currently present at 
https://app.testudo.umd.edu/soc/
eg. ['AASP', 'AAST', ... , 'WMST']

## get_courses(dept)

dept - four letter code for department where to search
Returns an array of all course ids in the specifed department
eg. ['AASP100', 'AASP100H', ... , 'AASP498I']
