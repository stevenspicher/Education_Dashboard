const SchoolHeader = ({school}) => {
    return (
        <div id="title">
            <div className={"h1"}>{school.schoolName}</div>
            <div className={"h3"}>{school.districtName}</div>
            <div className={"h4"}>{school.street}, {school.city}</div>
            <div
                className={"h4"}>{school.totalStudents} students, {school.teacherCount} teachers
            </div>
        </div>
    )
}

export default SchoolHeader