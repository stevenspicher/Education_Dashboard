import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Box, Link,
    Paper, Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel, Typography
} from "@mui/material";
import {visuallyHidden} from "@mui/utils";
import schoolData from "../../../dataImport/homeSchoolData.json";


const SchoolTable = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('schoolName');
    // const [schoolDataAPI, setSchoolDataAPI] = useState(undefined)
    // if (api.api !== undefined) setSchoolDataAPI(api.api.homeSchoolInfo)


    const headCells = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'level',
            numeric: false,
            disablePadding: false,
            label: 'Education Level',
        },
        {
            id: 'gradRate',
            numeric: true,
            disablePadding: false,
            label: 'Graduation Rate',
        },
        {
            id: 'act',
            numeric: true,
            disablePadding: false,
            label: 'AVG ACT Score',
        },
        {
            id: 'salary',
            numeric: true,
            disablePadding: false,
            label: 'AVG Teacher Salary',
        },
        {
            id: 'retention',
            numeric: true,
            disablePadding: false,
            label: '3 YR Teacher Retention',
        },
    ];

    // console.log(districtData)
    // const trimmedSchoolList = [];
    // dataFile.home.map((school) => {
    //     if (school[1].schoolType !== "District")
    //         trimmedSchoolList.push({
    //             name: school[1].schoolName,
    //             id: school[0],
    //             type: school[1].schoolType ?? "",
    //             gradRate: school[1].gradRate ?? "",
    //             act:school[1].academicPerformance.ACTCompositeAVG ?? "",
    //             salary: school[1].avgTeacherSalary ?? "",
    //             returnRate: school[1].teacherReturnRate ?? ""
    //         })
    // })
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    const visibleRows = useMemo(
        () =>

            Object.values(schoolData).slice().sort(getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, order, orderBy],
    );

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={Object.entries(schoolData).length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                    <TableRow>

                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>

                    {schoolData === undefined ? <></> :
                        visibleRows.map((school, index) => {
                            return (
                                <TableRow
                                    key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography>
                                            <Link onClick={() =>  {navigate(`/school/${school.schoolId}+${school.schoolCode}`)}}>
                                                {school.schoolName}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography>{school.schoolType}</Typography>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography>{school.gradRate ?? ""}</Typography>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography>{school.ACTCompositeAVG ?? ""}</Typography>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography>{school.avgTeacherSalary ?? ""}</Typography>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography>{school.teacherReturnRate ?? ""}</Typography>
                                    </TableCell>

                                </TableRow>
                            )
                        })
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SchoolTable