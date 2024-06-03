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
import axios from 'axios';
import Url from '../Config/Url';
import Console from '../debug_log';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import ActionMusa from '../components/ActionMusa';
import Language from '../Config/Language'

const rows = [
    {
        user_id: 1,
        id: 1,
        sno: 1,
        title: 'New Journey',
        category: 'Wedding',
        subCategory: 'Mehndi',
        musaType: 0,
        postDate: "02 April 2023 09:30 am",
    },
    {
        user_id: 2,
        id: 2,
        sno: 2,
        title: 'Birthday Celebration',
        category: 'Birthday',
        subCategory: 'Brother birthday party',
        musaType: 1,
        postDate: "02 April 2023 09:30 am",
    },
    {
        user_id: 3,
        id: 3,
        sno: 3,
        title: 'School Event ',
        category: 'Event',
        subCategory: 'Annual function',
        musaType: 2,
        postDate: "02 April 2023 09:30 am",
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
    { id: 'name', numeric: false, label: 'Created By', minWidth: 100 },
    { id: 'description', numeric: false, label: 'Description', minWidth: 100 },

    { id: 'category_title', numeric: false, label: 'Category', minWidth: 100 },
    // { id: 'sub_category_title', numeric: false, label: 'Sub Category', minWidth: 100 },
    { id: 'musaType', numeric: false, label: 'Trip Type', minWidth: 100 },
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
        <Typography marginBottom={4} fontSize={18} color={'gray'}>Trips List</Typography>
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

export default function Trip() {
    const [trip, setTrip] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredRows, setFilteredRows] = useState(trip);
    const [search, setSearch] = useState(false)
    const navigate = useNavigate()
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = trip.map((n) => n.id);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trip.length) : 0;


    const handleSearch = (searchTerm) => {
        setSearch(true)
        const filtered = trip.filter((row) =>
            (row.sno + row.name + row.category_title + row.description + row.createtime).toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRows(filtered);
    };
    const visibleRows = React.useMemo(
        () =>
            stableSort(setSearch, trip, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, trip, orderBy, page, rowsPerPage],
    );
    const [show, setShow] = useState(false)

    show && setTimeout(() => { setShow(false); }, 4000)

    React.useEffect(() => {

        const params = { action: 'get_all_musas' };
        axios.get(`${Url}/manage_controller/all_musas`, { params })
            .then(obj => {
                const res = obj.data;

                setTrip(res.data.musa_arr);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Helmet>
                <title>{Language.APP_NAME}| Trips</title>
            </Helmet>
            {/* <Loader /> */}
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={2} gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 23, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.5} fontSize={20} >/</Typography>

                    <Typography marginTop={1.5} fontSize={20} >Manage Trips</Typography>
                </Box>
                {show &&
                    <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="success">
                        Trip deleted successfully
                    </Alert>
                }
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
                            rowCount={Trip.length}
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
                                            <ActionMusa setShow={setShow} view='View' viewPath={`/${APP_PREFIX_PATH}/viewtrip/`} id={row.musa_id} viewIcon={<RemoveRedEyeIcon sx={{ color: Constant.color[0] }} />} delete='Delete' deleteIcon={<DeleteIcon sx={{ Top: '5px', color: Constant.color[0] }} />} />
                                        </TableCell>
                                        <TableCell align="left">{row.name}</TableCell>

                                        {/* <TableCell align="left">{row.sub_category_title}</TableCell> */}
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">{row.category_title}</TableCell>

                                        <TableCell align="left">
                                            {row.type === 0 ? <Typography variant='outlined' size='small' style={{ height: '25px', color: '#00c853' }} >Public</Typography> :
                                                (row.type === 1 ? <Typography variant='outlined' size='small' style={{
                                                    height: '25px', color: '#00e5ff'
                                                }} >Contributtor</Typography> :
                                                    <Typography variant='outlined' size='small' style={{
                                                        height: '25px', color: '#00838f'
                                                    }} >Only me</Typography>
                                                )
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
                    count={trip.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
