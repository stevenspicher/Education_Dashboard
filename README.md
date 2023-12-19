# Data Import

Client requested rebuild of previous dashboard which consisted of static html pages generated from a python script. 
data import was clunky and difficult to duplicate with errors. 
Original project requirements did not allow for live site updates, so in order to streamline data upload while still providing a contained build
a temporary local server/admin page was used for data import: 

/server/dataImport: 

* DataImport.jsx: Admin import page using xlsx to import state report card data from two excel files
* AdditionalInfoImport.js & ReportCardImport.js: extract json data into manageable objects
* mergeData.js: merge objects into school, district and state data by ID
* DataImport.jsx: data is passed back to dataImport.jsz to be posted to local express server 

/server/index.js:
* writes school, district, and state data files to /educationdashboard/src/dataimport
* also serves an API for both school data and geodata, which the dashboard can be configured to fetch - disabled 

Api would allow for live updating without a full site rebuild.
However, while creating the import functions it became clear the state provided data was inconsistent from year to year, meaning each yearly data update would require some level of data clean up. 
The client accepted the recommendation that I host the site under a maintenance contract allowing me to clean the data, import and rebuild the site. 

# Education Dashboard
## Home 
### Page elements:
#### Map  
Displays district data and links, Contents update based on search entry.

| Map Field Name               | Data source (spreadsheet)      | Tab/sheet                    | Cell/Field                     |
|------------------------------|--------------------------------|------------------------------|--------------------------------|
| Name                         | ReportCardData_forResearchers  | 1.MainPage                   | SchoolNm                       |
| SCHOOLTYPECD (not displayed) | ReportCardData_forResearchers  | 1.MainPage                   | Report Card Type (P,E,M,H,D)   |
| Graduation Rate              | ReportCardData_forResearchers  | 3.Graduate                   | GRADRATE(current year)         |
| Avg ACT Score                | ReportCardData_AdditionalInfo  | 4a.CCRPage_ACT_SAT_DUAL_AP_I | ACT_Avg_CompositeScore         | 
| Avg Teacher Salary           | ReportCardData_AdditionalInfo  | 6.ClassRoomEnvironmentPage   | TCHSALARY_AvgCurrYr            |
| 3-Yr Teacher Retention       | ReportCardData_AdditionalInfo  | 6.ClassRoomEnvironmentPage   | TCHRETURN3yrAvg_PctCurrYr      |

##### Heat Map
District map overlay adjustable to display heatmap of values for:
* Average salary
* teacher retention
* graduation rate
* act score

District popup data is also changed to display values for selected category

#### Table 
maps through all school and district data for table contents. Contents update based on search entry

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
Queries against full school and district lists, search results are displayed in the home page table and the district map.  

## District
### Page elements:
#### Header
* District name
* number of students 
* address 
* website
#### Map
Displays school marker and link to school page
#### School List
* school name
* school type
* link 
#### Charts
District data and state average for categories

## School
### Page elements:
#### Header
* School name,
* number of students,
* number of teachers,
* address
* website
####
#### Charts
School data and state average for categories

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

