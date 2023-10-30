const DistrictHeader = ({district}) => {
    return (
        <div className="title-text">
        <h1>{ district.schoolName}</h1>
        <h2>{ district.totalStudents} students</h2>
        <h4>{ district.street}, { district.city}</h4>
        <h4>{ district.schoolPhone}, <a href={ district.url} target="_blank">website</a></h4>
    </div>
    )
}

export default DistrictHeader