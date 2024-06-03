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
import Url from '../Config/Url';
import axios from 'axios';
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';
import { Replay, Reply } from '@mui/icons-material';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import ActionContactUs from '../components/ActionContactUs';
import Language from '../Config/Language'

const rows = [
    {
        id: 1,
        sno: 1,
        name: 'Jhon Rose',
        email: 'Abcc@gmail.com',
        message: 'HIOO',
        replyDate: "27 May 2024 08:30 pm",
        status: 1,
        createDate: "02 April 2023 09:30 pm",
    },
    {
        id: 2,
        sno: 2,
        name: 'Ram',
        email: 'ram@gmail.com',
        message: 'HIOO',
        replyDate: "27 May 2024 08:30 am",
        status: 0,
        createDate: "02 April 2023 09:30 am",
    },
    {
        id: 3,
        sno: 3,
        name: 'Carry mate',
        email: 'Carry@gmail.com',
        message: 'HIOO',
        replyDate: "27 May 2024 08:30 pm",
        status: 1,
        createDate: "02 April 2023 09:30 am",
    },
    {
        id: 4,
        sno: 4,
        name: 'Cat jhonson',
        email: 'Cat@gmail.com',
        message: 'HIOO',
        replyDate: "27 May 2024 08:30 pm",
        status: 0,
        createDate: "02 April 2023 09:30 am",
    },
    {
        id: 5,
        sno: 5,
        name: 'David Miller',
        email: 'David@gmail.com',
        message: 'HIOO',
        replyDate: "27 May 2024 08:30 am",
        status: 1,
        createDate: "02 April 2023 09:30 pm",
    },
    {
        id: 6,
        sno: 6,
        name: 'Tim David',
        email: 'Tim@gmail.com',
        message: 'HIOO',
        replyDate: "27 May 2024 08:30 am",
        status: 0,
        createDate: "02 April 2023 09:30 am",
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
    { id: 'name', numeric: false, label: 'Name', minWidth: 100 },

    { id: 'email', numeric: false, label: 'Email', minWidth: 100 },
    { id: 'message', numeric: false, label: 'Message', minWidth: 100 },

    {
        id: 'replyDate', numeric: false, label: 'Reply  Date & Time', minWidth: 100,
    },
    { id: 'status', numeric: false, label: 'Status', minWidth: 100 },

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
        <Typography marginBottom={4} fontSize={18} color={'gray'}>Contacts List</Typography>
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

export default function ContactUs() {
    const [render, setRender] = useState(false)
    const [contactList, setContactList] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredRows, setFilteredRows] = useState(contactList);
    const [search, setSearch] = useState(false)
    const navigate = useNavigate()
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = contactList.map((n) => n.id);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contactList.length) : 0;


    const handleSearch = (searchTerm) => {
        setSearch(true)
        const filtered = contactList.filter((row) =>
            (row.name + row.reply_datetime + row.email + row.message).toLowerCase().includes(searchTerm.toLowerCase())

        );
        setFilteredRows(filtered);
    };
    const visibleRows = React.useMemo(
        () =>
            stableSort(setSearch, contactList, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, contactList, orderBy, page, rowsPerPage],
    );

    const [show, setShow] = useState(false)
    show && setTimeout(() => { setShow(false); }, 4000)

    const [show1, setShow1] = useState(false)
    show1 && setTimeout(() => { setShow1(false); }, 4000)

    React.useEffect(() => {
        const params = { action: 'get_all_contactus' };

        axios.get(`${Url}/common_controller/contactus`, { params })
            .then(obj => {
                const res = obj.data;
                render ? setContactList(res.data.contactus_arr) : setContactList(res.data.contactus_arr);
            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [render])
    console.log(contactList)
    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Contacts Us</title>
            </Helmet>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={2} gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.2} fontSize={20} >/</Typography>

                    <Typography marginTop={1.2} fontSize={20} >Manage Contacts Us</Typography>

                </Box>                {show &&
                    <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="success">
                        Contact deleted successfully
                    </Alert>
                }
                {show1 &&
                    <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="success">
                        Reply sent successfully
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
                            rowCount={contactList.length}
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
                                            <ActionContactUs render={render} setRender={setRender} id={row.contact_id} email={row.email} delete='Delete' url='common_controller/delete_contactus' delete_flag='0' deleteIcon={<DeleteIcon sx={{ color: Constant.color[0] }} />} setShow={setShow} setShow1={setShow1} replyIcon={<Reply sx={{ color: Constant.color[0] }} />} reply='Reply' />
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align="left"
                                        >
                                            {row.name ? row.name : 'NA'}
                                        </TableCell>
                                        <TableCell align="left">{row.email ? row.email : 'NA'}</TableCell>

                                        <TableCell align="left">{row.message ? row.message : 'NA'}</TableCell>
                                        <TableCell style={{ whiteSpace: 'nowrap' }} align="left">{row.reply_date_time}</TableCell>
                                        <TableCell align="left">
                                            {row.status === 1 ? <Typography variant='outlined' size='small' style={{ height: '25px', color: '#00c853' }} >Replied</Typography> : <Typography variant='outlined' size='small' style={{
                                                height: '25px', color: '#f44336'
                                            }} >Pending</Typography>}
                                        </TableCell>
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
                    count={contactList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
