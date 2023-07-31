# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# React-Router for Navigation and State

# JSON file (API?) format:

Need District List

Site routing is simple with only three screens:

## Home 
### Page elements:
#### Map 
(assuming map is consistent, no need to rebuild for every instance): Displays 'hard-coded' district data and links
#### Table 
maps through all school and district data for table contents.
#### Search 
queries against generated list of names currently, should query JSON directly?

## District
### Page elements:
#### Header
District name

number of students 

address 

website
#### Map
(assuming map is consistent, no need to rebuild for every instance): Displays 'hard-coded' school data and links
#### School List
school name

school type

link 
#### Charts
District data and state average for categories

## School
### Page elements:
#### Header
School name

number of students

number of teachers

address

website
####
#### Charts
School data and state average for categories 



All display json data referenced by [ID]
Home searches json for query results and 
Home sends ID for school/district to District.jsx or School.jsx

screen gets data from json using id

District sends school id to School.jsx

School sends district id to District.jsx

No need to send data back to home??