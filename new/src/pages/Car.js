import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Constant from '../Config/Color'
import PopupReply from '../components/PopupReply';
import Alert from '@mui/material/Alert';
import { Helmet } from 'react-helmet';
import DeleteIcon from '@mui/icons-material/Delete';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Edit } from '@mui/icons-material';
import PopupEditPlan from '../components/PopupEditPlan';
import Url from '../Config/Url';
import axios from 'axios';
import PopupAddPlan from '../components/PopupAddPlan';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import ActionPlan from '../components/ActionPlan';
import Language from '../Config/Language'

const rows = [
    {
        id: 1,
        sno: 1,
        Plan: 'Wedding',
        subPlan: 'Mehndi',
        createtime: "02 April 2023 09:30 am",
    },
    {
        id: 2,
        sno: 2,
        Plan: 'Birthday',
        subPlan: 'Brother birthday party',
        createtime: "02 April 2023 09:30 am",
    },
    {
        id: 3,
        sno: 3,
        Plan: 'Event',
        subPlan: 'Annual function',
        createtime: "02 April 2023 09:30 am",
    },

];

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


function stableSort(setSearch, array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    setSearch(false)

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'sno', numeric: false, label: 'S.NO.', minWidth: 100 },
    { id: 'action', numeric: false, label: 'Action', minWidth: 100 },
    { id: 'gb', numeric: false, label: 'GB', minWidth: 100 },

    { id: 'description', numeric: false, label: 'Description', minWidth: 100 },
    { id: 'amount', numeric: false, label: 'Amount', minWidth: 100 },
    { id: 'type', numeric: false, label: 'Type', minWidth: 100 },
    {
        id: 'createtime', numeric: false, label: 'Create Date & Time', minWidth: 100
    },

];


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead >
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
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Typography marginBottom={4} fontSize={18} color={'gray'}>Cars List</Typography>
    );
}



EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const SearchInput = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <TextField
            size='small'
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
        />
    );
};

export default function Car() {
    const [render, setRender] = useState(false)
    const [PlanList, setPlanList] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredRows, setFilteredRows] = useState(PlanList);
    const [search, setSearch] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = PlanList.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PlanList.length) : 0;


    const handleSearch = (searchTerm) => {
        setSearch(true)
        const filtered = PlanList.filter((row) =>
            (row.sno + row.gb + row.description + row.createtime).toLowerCase().includes(searchTerm.toLowerCase())

        );
        setFilteredRows(filtered);
    };
    const visibleRows = React.useMemo(
        () =>
            stableSort(setSearch, PlanList, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, PlanList, orderBy, page, rowsPerPage],
    );
    const [show, setShow] = useState(false)

    show && setTimeout(() => { setShow(false); }, 4000)

    const [show1, setShow1] = useState(false)

    show1 && setTimeout(() => { setShow1(false); }, 4000)

    const [show2, setShow2] = useState(false)

    show2 && setTimeout(() => { setShow2(false); }, 4000)


    const [show3, setShow3] = useState(false)

    show3 && setTimeout(() => { setShow3(false); }, 4000)
    React.useEffect(() => {
        const params = { action: 'get_all_plans' };

        axios.get(`${Url}/manage_controller/get_all_plans`, { params })
            .then(obj => {
                const res = obj.data;
                render ? setPlanList(res.data.plan_arr) : setPlanList(res.data.plan_arr);
            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [render])

    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Manage Cars</title>
            </Helmet>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 23, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.5} fontSize={20} >/</Typography>

                    <Typography marginTop={1.5} fontSize={20} >Manage Cars</Typography>

                </Box>
                {show &&
                    <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="success">
                        Car remove successfully
                    </Alert>
                }
                {show1 &&
                    <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="success">
                        Car updated successfully
                    </Alert>
                }
                {show2 &&
                    <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="success">
                        Car added successfully
                    </Alert>
                }
                {show3 &&
                    <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="success">
                        Car alredy present
                    </Alert>
                }
            </Box>
            <Box marginBottom={2} display={'flex'} justifyContent={'right'}>
                <Box>
                    <PopupAddPlan setMessage={setMessage} button='Add Car' message='Updated Successfully' path='/categories' setShow3={setShow3} setShow={setShow2} render={render} setRender={setRender} />
                </Box>
            </Box>
            <Paper sx={{ borderRadius: '10px', padding: '20px', bgcolor: Constant.color[1] }}>

                <Box display={'flex'} justifyContent={'space-between'}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <Box marginRight={1}>
                        <SearchInput onSearch={handleSearch} />
                    </Box>

                </Box>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={PlanList.length}
                        />
                        <TableBody>
                            {(search ? filteredRows : visibleRows).map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.sno}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}

                                    >
                                        <TableCell align="left">{row.s_no}</TableCell>

                                        <TableCell>
                                            <ActionPlan render={render} setRender={setRender} id={row.plan_id} setShow={setShow} setShow1={setShow1} title={row.gb} editIcon={<Edit sx={{ color: Constant.color[0] }} />} edit='Edit' url1='manage_controller/edit_plan' url='manage_controller/delete_plan' delete_flag='0' delete='Delete' deleteIcon={<DeleteIcon sx={{ Top: '5px', color: Constant.color[0] }} />} editText='Plan' />
                                        </TableCell>

                                        <TableCell align="left">{row.gb}</TableCell>

                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">{row.amount}</TableCell>

                                        <TableCell align="left">
                                            {row.type === 0 ? <Typography variant='outlined' size='small' style={{ height: '25px', color: '#00c853' }} >Free</Typography> :
                                                <Typography variant='outlined' size='small' style={{
                                                    height: '25px', color: '#00838f'
                                                }} >Premium</Typography>

                                            }
                                        </TableCell>

                                        <TableCell align="left">{row.createtime}</TableCell>

                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={PlanList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
