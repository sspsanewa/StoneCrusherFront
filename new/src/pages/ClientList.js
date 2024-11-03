import * as React from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Avatar, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Constant from '../Config/Color';
import EditIcon from '@mui/icons-material/Edit';
import PopupReply from '../components/PopupReply';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Helmet } from 'react-helmet';
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpg';
import profile3 from '../assets/profile3.jpg';
import profile4 from '../assets/profile4.jpg';
import { useState } from 'react';
import axios from 'axios';
import Url from '../Config/Url';
import moment from 'moment';
// import Date from '../components/Date';
import Console from '../debug_log';
import { APP_PREFIX_PATH, IMAGE_PATH } from '../Config/AppConfig';
import PopupImage from '../components/PopupImage';
import Modal from '@mui/material/Modal';
import ActionUserList from '../components/ActionUserList';
import Language from '../Config/Language';
import New from './New';
import Edit from '@mui/icons-material/Edit';
import Loader from '../components/Loader';
import NoDataFound from '../components/NoDataFound';
import Load from '../components/Load';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    bgcolor: Constant.color[0]
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


function stableSort(setSearch, array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    setSearch(false);

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
    { id: 'sno', numeric: false, label: 'S.NO.', minWidth: 20 },
    { id: 'action', numeric: false, label: 'Action', minWidth: 50 },
    { id: 'name', numeric: false, label: 'Name', minWidth: 100 },
    { id: 'village', numeric: false, label: 'Village', minWidth: 100 },
    // { id: 'email', numeric: false, label: 'Email', minWidth: 100 },

    { id: 'mobile', numeric: false, label: 'Mobile', minWidth: 100 },
    { id: 'remainingAmount', numeric: false, label: 'Remaining Amount', minWidth: 100 },
    { id: 'totalAmount', numeric: false, label: 'Total Amount', minWidth: 100 },

    // { id: 'status', numeric: false, label: 'Status', minWidth: 100 },
    { id: 'paymentStatus', numeric: false, label: 'Payment Status', minWidth: 100 },

    {
        id: 'date', numeric: false, label: 'Date', minWidth: 100
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
        <Typography marginBottom={4} fontSize={18} color={'gray'}>Clients List</Typography>
    );
}



EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const SearchInput = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

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

export default function ClientList() {

    const [render, setRender] = useState(false);
    const [userList, setUserList] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filteredRows, setFilteredRows] = React.useState(userList);
    const [search, setSearch] = React.useState(false);
    const [clickImage, setClickImage] = useState(false);
    const [popImage, setPopImage] = useState('');

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setClickImage(false); };
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = userList.map((n) => n.id);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;


    const handleSearch = (searchTerm) => {
        setSearch(true);
        const filtered = userList.filter((row) =>
            (row.f_name + row.l_name + row.mobile + row.createtime + row.email).toLowerCase().includes(searchTerm.toLowerCase())

        );
        setFilteredRows(filtered);
    };
    const visibleRows = React.useMemo(
        () =>
            stableSort(setSearch, userList, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, userList, orderBy, page, rowsPerPage],
    );
    const [show, setShow] = React.useState(false);

    show && setTimeout(() => { setShow(false); }, 4000);


    const [show1, setShow1] = React.useState(false);

    show1 && setTimeout(() => { setShow1(false); }, 4000);


    React.useEffect(() => {
        const params = { action: 'get_all_users', delete_flag: 0 };
        Console("users");


        axios.get(`${Url}/api/v1/client`, { params })
            .then(res => {
                if (res.status === 200) {
                    setLoading(false);
                    console.log("Users fetched successfully:", res);
                    render ? setUserList(res.data) : setUserList(res.data);
                }
            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [render]);

    // const handleClick1 = (id) => {
    //     const params = { action: 'get_popup_image', user_id: id };
    //     Console("users")

    //     axios.get(`${Url}/user_controller/image`, { params })
    //         .then(obj => {
    //             const res = obj.data;
    //             setPopImage(res.data.user_image)
    //             setClickImage(true)
    //         })
    //         .catch(err => console.error("Error fetching users:", err));
    //     // .then(err => console.log("eoeee", err))
    // }

    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >

            <Helmet>
                <title>{Language.APP_NAME} | Manage Users | Users List</title>
            </Helmet>
            {loading ?

                < Load />
                :

                <>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Box marginBottom={2} gap={1} display={'flex'}>
                            <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                                Dashboard
                            </Button>

                            <Typography marginTop={1.2} fontSize={20} >/</Typography>

                            <Typography marginTop={1.2} fontSize={20} >Manage Clients List</Typography>
                        </Box>
                        {show &&
                            <Alert sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', bgcolor: '#ffffff', zIndex: 10, marginBottom: '5px', position: 'fixed', top: '48%', left: '45%' }} variant="outlined" severity="success">
                                Client deleted successfully
                            </Alert>
                        }
                        {show1 &&
                            <Alert sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', bgcolor: '#ffffff', zIndex: 10, marginBottom: '5px', position: 'fixed', top: '48%', left: '45%' }} variant="outlined" severity="success">
                                Status updated successfully
                            </Alert>
                        }

                    </Box>
                    <Box marginBottom={2} display={'flex'} justifyContent={'right'}>
                        <Box onClick={() => navigate(`/${APP_PREFIX_PATH}/addclient`)}>
                            <New name='Add Client' />
                            {/* <PopupAddPlan setMessage={setMessage} button='Add Subscription' message='Updated Successfully' path='/categories' setShow3={setShow3} setShow={setShow2} render={render} setRender={setRender} /> */}
                        </Box>
                    </Box>
                    <Paper sx={{ borderRadius: '10px', padding: '20px', bgcolor: Constant.color[1] }}>

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <EnhancedTableToolbar numSelected={selected.length} />
                            <Box marginRight={1}>
                                <SearchInput onSearch={handleSearch} />
                            </Box>
                        </Box>
                        {
                            (userList && userList.length <= 0) ? <NoDataFound />
                                :
                                <>
                                    <TableContainer>
                                        <Table
                                            sx={{ minWidth: 800 }}
                                            aria-labelledby="tableTitle"
                                        >
                                            <EnhancedTableHead
                                                numSelected={selected.length}
                                                order={order}
                                                orderBy={orderBy}
                                                onSelectAllClick={handleSelectAllClick}
                                                onRequestSort={handleRequestSort}
                                                rowCount={userList.length}
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
                                                            <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                                                            <TableCell  >
                                                                <ActionUserList bill='yes' render={render} setRender={setRender} view='View' viewPath={`/${APP_PREFIX_PATH}/viewclient/`} id={row.id} viewIcon={<RemoveRedEyeIcon sx={{ color: Constant.color[0] }} />} statusValue={row.active_flag} status={row.active_flag === 1 ? 'Deactive' : 'Active'} url1='user_controller/active_deactive_status' statusIcon={<AirplanemodeActiveIcon sx={{ color: Constant.color[0] }} />} delete='Delete' url='api/v1/client' delete_flag='0' deleteIcon={<DeleteIcon sx={{ color: Constant.color[0] }} />} setShow={setShow} setShow1={setShow1} editUrl='editclient' editIcon={<Edit sx={{ color: Constant.color[0] }} />} edit='Edit' />
                                                            </TableCell>

                                                            <TableCell
                                                                component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                align="left"
                                                            >
                                                                {(row.firstName + ' ' + row.lastName) ? (row.firstName + ' ' + row.lastName) : "NA"}
                                                            </TableCell>
                                                            {/* <TableCell align="left">

                                            <Avatar src={`${IMAGE_PATH}` + row.image} alt={row.name && row.name.charAt(0).toUpperCase()} />

                                        </TableCell> */}
                                                            <TableCell align="left">{row.village ? row.village : 'NA'}</TableCell>



                                                            <TableCell align="left">{row.mobile ? row.mobile : 'NA'}</TableCell>
                                                            {/* <TableCell align="left">
                                            {row.active_flag === 1 ? <Typography variant='outlined' size='small' style={{ height: '25px', color: '#00c853' }} >Active</Typography> : <Typography variant='outlined' size='small' style={{
                                                height: '25px', color: '#f44336'
                                            }} >Deactive</Typography>}
                                        </TableCell> */}
                                                            <TableCell align="left">{row.remainingAmount}</TableCell>
                                                            <TableCell align="left">{row.totalAmount}</TableCell>

                                                            <TableCell align="left">{row.paymentStatus}</TableCell>

                                                            <TableCell align="left">{row.date}</TableCell>

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
                                        rowsPerPageOptions={[25, 10, 5]}
                                        component="div"
                                        count={userList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </>
                        }
                    </Paper>
                </>
            }
        </Box>
    );
}
