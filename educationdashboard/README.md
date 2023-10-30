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
maps through district data (SCHOOLTYPECD === "D") for map contents.

| Map Field Name               | Data source (spreadsheet)      | Tab/sheet                    | Cell/Field                     |
|------------------------------|--------------------------------|------------------------------|--------------------------------|
| Name                         | ReportCardData_forResearchers  | 1.MainPage                   | SchoolNm                       |
| SCHOOLTYPECD (not displayed) | ReportCardData_forResearchers  | 1.MainPage                   | Report Card Type (P,E,M,H,D)   |
| Graduation Rate              | ReportCardData_forResearchers  | 3.Graduate                   | GRADRATE(current year)         |
| Avg ACT Score                | ReportCardData_AdditionalInfo  | 4a.CCRPage_ACT_SAT_DUAL_AP_I | ACT_Avg_CompositeScore         | 
| Avg Teacher Salary           | ReportCardData_AdditionalInfo  | 6.ClassRoomEnvironmentPage   | TCHSALARY_AvgCurrYr            |
| 3-Yr Teacher Retention       | ReportCardData_AdditionalInfo  | 6.ClassRoomEnvironmentPage   | TCHRETURN3yrAvg_PctCurrYr      |
#### Table 
maps through all school data for table contents.

| Field Name              | Data source (spreadsheet)      | Tab/sheet                    | Cell/Field                     |
|-------------------------|--------------------------------|------------------------------|--------------------------------|
| Name                    | ReportCardData_forResearchers  | 1.MainPage                   | SchoolNm                       |
| Education Level         | ReportCardData_forResearchers  | 1.MainPage                   | Report Card Type (P,E,M,H,D)   |
| Graduation Rate         | ReportCardData_forResearchers  | 3.Graduate                   | GRADRATE(current year)         |
| Avg ACT Score           | ReportCardData_AdditionalInfo  | 4a.CCRPage_ACT_SAT_DUAL_AP_I | ACT_Avg_CompositeScore         | 
| Avg Teacher Salary      | ReportCardData_AdditionalInfo  | 6.ClassRoomEnvironmentPage   | TCHSALARY_AvgCurrYr            |
| 3-Yr Teacher Retention  | ReportCardData_AdditionalInfo  | 6.ClassRoomEnvironmentPage   | TCHRETURN3yrAvg_PctCurrYr      |
**** 3-yr Teacher Retention appears incorrect in original version?

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



All display json data referenced by ID (School Number)
Home searches json for query results and 
Home sends ID for school/district to DistrictDemographics.jsx or SchoolDemographics.jsx

screen gets data from json using id

District sends school id to SchoolDemographics.jsx

School sends district id to DistrictDemographics.jsx

No need to send data back to home??

# Data Gather

School and District data are found [here](https://screportcards.com/) under "Download Data" for the current year. 
### Two files are used:

#### Report Cards Data for Researchers {Current year}
#### Report Cards Data Additional Info for {Current year}
Main page for both sheets is identical, includes school info:
 * report card year
 * district Name
 * school name, 
* school number, 
* report card type (E - elementary, M - Middle, H - High School, D - District)
 * address, 
    * street
    * city 
    * state 
    * zip
* gradespan, 
* principal name, 
* enrollment numbers
* phone
* website url 
* superintendent (districts only)
* board chair name (districts only)
* teacher count


| Data from ReportCardData_forResearchers | sheet/tab                                    | Displayed on page |
|-----------------------------------------|----------------------------------------------|-------------------|
| graduation rate                         | 3.GRADRATE                                   | Home              | 
| English Language Learning Students      | 2d.Participation_bySubject/5.EnglishLearners | District/school   |
| Black/White/other                       | 2c.Participation                             | District/school   |
| Positive Reading/Science/Math Score     | 2d.Participation_bySubject                   | District/school   |
| On time Graduation Rate                 | 3.GradRatePage                               | District/school   |
| Drop out percentage                     | 3.GradRatePage                               | High School       |



(Additional Info = "Not ratings" per Cover sheet)


| Data from ReportCardData_AdditionalInfo | sheet/tab                     | Displayed on page |
|-----------------------------------------|-------------------------------|-------------------|
| Composite ACT score for school          | 4a.CCRPage_ACT_SAT_DUAL_AP_I  | Home              | 
| Average Teacher Salary                  | 6.ClassRoomEnvironmentPage    | Home              | 
| 3 yr Teacher retention                  | 6.ClassRoomEnvironmentPage    | Home              | 
| Teacher - "I feel Safe"                 | 7.SchoolSafetyPage            | District/school   | 
| Parent - "child feels Safe"             | 7.SchoolSafetyPage            | District/school   | 
| Number of Violent Assaults              | 7.SchoolSafetyPage            | District/school   | 
| Number of Incidents of Bullying         | 7.SchoolSafetyPage            | District/school   | 
| Students in Poverty                     | 8.FinancialDataPage           | District/school   | 
| Drop out percentage                     | 3.GradRatePage                | High School       |
| Students with Disabilities              | 5b.SchoolClimate_ChronicAbs   | District/school   | 
| Career ready diploma earners            | 4b.CCRPage_CareerReadiness    | High School       |
| College ready diploma earners           | 4a.CCRPage_ACT_SAT_DUAL_AP_IB | High School       |

