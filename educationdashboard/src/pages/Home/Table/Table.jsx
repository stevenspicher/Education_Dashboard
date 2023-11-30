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
    TableSortLabel, Typography, Stack
} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import {visuallyHidden} from "@mui/utils";
import {allSchools, fullSearchList, searchInput, topSearchResults, visibleRows} from "../../../store/signalStore"
import {navigateToPage} from "../../../utils/functions.js";
import home from "../../../assets/home.png";


const SchoolTable = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('schoolName');
    let schoolList = allSchools.value


    const headCells = [
        {
            id: 'schoolName',
            numeric: false,
            disablePadding: false,
            label: 'Name',
            width: '250px'
        },
        {
            id: 'schoolType',
            numeric: false,
            disablePadding: false,
            label: 'Education Level',
            width: '105px'
        },
        {
            id: 'gradRate',
            numeric: true,
            disablePadding: false,
            label: 'Graduation Rate',
            width: '175px'
        },
        {
            id: 'ACTCompositeAVG',
            numeric: true,
            disablePadding: false,
            label: 'AVG ACT Score',
            width: '175px'
        },
        {
            id: 'avgTeacherSalaryLastYr',
            numeric: true,
            disablePadding: false,
            label: 'AVG Teacher Salary',
            width: '175px'
        },
        {
            id: 'teacherReturnRate',
            numeric: true,
            disablePadding: false,
            label: '3 YR Teacher Retention',
            width: '160px'
        },
    ];

    // console.log(districtData)
    // const trimmedSchoolList = [];
    // dataFile.home.map((school) => {
    //     if (school[1].schoolCode !== "District")
    //         trimmedSchoolList.push({
    //             name: school[1].schoolName,
    //             id: school[0],
    //             type: school[1].schoolCode ?? "",
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
    let aTemp;
    let bTemp;

    function descendingComparator(a, b, orderBy) {
        aTemp = a[orderBy];
        bTemp = b[orderBy];

        if (a[orderBy] === "*") {
            aTemp = 0
        }
        if (b[orderBy] === "*") {
            bTemp = 0
        }
        if (bTemp < aTemp) {
            return -1;
        }
        if (bTemp > aTemp) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    let visibleRows = useMemo(
        () =>

            Object.values(schoolList).slice().sort(getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, order, orderBy]
    );
    let visibleSearchRows = useMemo(
        () =>
            topSearchResults.value.slice().sort(getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, order, orderBy]
    );

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const searchName = (e) => {
        let result;

        if (fullSearchList.value !== undefined) {
            result = fullSearchList.value.filter((school) =>
                school.schoolName.toLowerCase().includes(e.target.value.toLowerCase()))


            const resultsSort = result?.sort((a, b) => a.schoolName.localeCompare(b.schoolName))
            topSearchResults.value = resultsSort
            visibleRows.value = resultsSort
        }
        handleRequestSort(e, "schoolName")
    }

    return (
        <TableContainer component={Paper} sx={{padding: "5px"}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>

                    </TableRow>

                    <TableRow>
                        <TableCell colSpan={3}
                                   style={{
                                       borderLeft: '1px solid black',
                                       borderTop: '1px solid black',
                                       borderBottom: '1px solid black',
                                       fontWeight: "bold"
                                   }}>
                            <input style={{width: "100%", fontWeight: "bold", fontSize:"20px"}} id="fill-box" type="text"
                                   placeholder="Search school or district ..."
                                   onChange={(e) => {
                                       searchName(e)
                                   }}/>
                        </TableCell>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={topSearchResults.value.length !== 0 ? topSearchResults.value.length : Object.entries(allSchools.value).length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{
                                borderTop: '1px solid black',
                                borderRight: '1px solid black',
                                borderBottom: '1px solid black',
                                fontWeight: "bold"
                            }}
                        />
                    </TableRow>
                    <TableRow>

                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                                width={headCell.width}
                                style={{border: '1px solid black', fontWeight: "bold"}}
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

                    {topSearchResults.value.length !== Object.keys(allSchools.value).length && topSearchResults.value.length > 0 ?
                        visibleSearchRows.map((school, index) => {
                            return (
                                <TableRow
                                    key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell
                                        style={{border: '1px solid black'}}
                                        component="th" scope="row">
                                        <Typography>
                                            <Link onClick={() => {
                                                navigateToPage(school, navigate)
                                                topSearchResults.value = []
                                            }}>
                                                {school.schoolName}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.schoolType}</Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.gradRate !== "*" ? school.gradRate + "%" : "*"}</Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.ACTCompositeAVG ?? "*"}</Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.avgTeacherSalaryLastYr !== "*" ? "$" + school.avgTeacherSalaryLastYr : "*"}</Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.teacherReturnRate !== "*" ? school.teacherReturnRate + "%" : "*"}</Typography>
                                    </TableCell>

                                </TableRow>
                            )
                        }) :
                        visibleRows.map((school, index) => {
                            return (
                                <TableRow
                                    key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell
                                        style={{border: '1px solid black'}}
                                        component="th" scope="row">
                                        <Typography>
                                            <Link onClick={() => {
                                                navigateToPage(school, navigate)
                                            }}>
                                                {school.schoolName}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.schoolType}</Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.gradRate !== "*" ? school.gradRate + "%" : "*"}</Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.ACTCompositeAVG ?? "*"}</Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.avgTeacherSalaryLastYr !== "*" ? "$" + school.avgTeacherSalaryLastYr : "*"}</Typography>
                                    </TableCell>
                                    <TableCell
                                        style={{border: '1px solid black'}} component="th" scope="row">
                                        <Typography>{school.teacherReturnRate !== "*" ? school.teacherReturnRate + "%" : "*"}</Typography>
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