import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {allSchools, fullSearchList, searchQuery, topSearchResults} from "../../../store/signalStore"
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
import {navigateToPage} from "../../../utils/functions.js";
import {formatPercent, formatSalary, getSalary, isReported, num} from "../../../utils/values.js";

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

//// value a row is sorted by; null = not reported
const sortValue = (school, orderBy) => {
    if (orderBy === 'schoolName' || orderBy === 'schoolType') return school[orderBy] ?? null;
    // salary sorts by the same figure that is displayed
    if (orderBy === 'avgTeacherSalaryLastYr') return getSalary(school).value;
    return num(school[orderBy]);
};

//// rows with no reported value always sort to the bottom
const getComparator = (order, orderBy) => (a, b) => {
    const aValue = sortValue(a, orderBy);
    const bValue = sortValue(b, orderBy);
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;
    const result = typeof aValue === "string" ? aValue.localeCompare(bValue) : aValue - bValue;
    return order === 'desc' ? -result : result;
};

const cellStyle = {border: '1px solid black'};

const SchoolTable = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('schoolName');

    const searching = searchQuery.value.trim() !== "";
    const searchResults = topSearchResults.value;
    const schoolList = allSchools.value;

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

    const rows = useMemo(
        () => (searching ? searchResults : Object.values(schoolList)).slice().sort(getComparator(order, orderBy)),
        [searching, searchResults, schoolList, order, orderBy]
    );
    const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const searchName = (e) => {
        const query = e.target.value;
        searchQuery.value = query;
        topSearchResults.value = fullSearchList.value.filter((school) =>
            school.schoolName.toLowerCase().includes(query.trim().toLowerCase()))
        setPage(0);
    }

    return (
        <TableContainer component={Paper} sx={{padding: "5px"}}>
            <Table sx={{minWidth: 650}} aria-label="schools and districts">
                <TableHead>
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
                                   value={searchQuery.value}
                                   onChange={(e) => {
                                       searchName(e)
                                   }}/>
                        </TableCell>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={rows.length}
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
                    {visibleRows.length === 0 ?
                        <TableRow>
                            <TableCell colSpan={headCells.length} style={cellStyle}>
                                <Typography>No schools or districts match &quot;{searchQuery.value}&quot;</Typography>
                            </TableCell>
                        </TableRow>
                        :
                        visibleRows.map((school) => (
                            <TableRow
                                key={school.schoolId} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell style={cellStyle} component="th" scope="row">
                                    <Typography>
                                        <Link onClick={() => {
                                            navigateToPage(school, navigate)
                                            topSearchResults.value = []
                                            searchQuery.value = ""
                                        }}>
                                            {school.schoolName}
                                        </Link>
                                    </Typography>
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Typography>{school.schoolType}</Typography>
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Typography>{isReported(school.gradRate) ? formatPercent(school.gradRate) : "*"}</Typography>
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Typography>{isReported(school.ACTCompositeAVG) ? school.ACTCompositeAVG : "*"}</Typography>
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Typography>{getSalary(school).value !== null ? formatSalary(school) : "*"}</Typography>
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Typography>{isReported(school.teacherReturnRate) ? formatPercent(school.teacherReturnRate) : "*"}</Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SchoolTable
