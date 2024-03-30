// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { Autocomplete, Box, TextField, Typography } from '@mui/material';
// import ActionList from '../ActionList';
// import axios from 'axios';
// import Action from '../Action';
// import PopupDelete from '../PopupDelete';
// import PopupStatus from '../PopupStatus';
// import Data from '../DataSet'
// const profile = 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
// const columns = [
//     { id: 'sno', label: 'SNo', minWidth: 100 },
//     { id: 'action', label: 'Action', minWidth: 100 },
//     { id: 'image', label: 'Image', minWidth: 100 },
//     { id: 'name', label: 'User Name', minWidth: 100 },
//     { id: 'email', label: 'Email', minWidth: 100 },
//     { id: 'mobile', label: 'Mobile Number ', minWidth: 100 },
//     { id: 'status', label: 'Status', minWidth: 100 },
//     { id: 'date', label: 'Registration Date', minWidth: 100 },
// ];



// export default function UserListTable() {
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const [userList, setUserList] = React.useState([])

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };
//     // React.useEffect(() => {
//     //     axios.get('http://localhost:5000/manageUser/')
//     //         .then(res => {
//     //             setUserList(res.data);
//     //         })
//     //         .then(err => console.log("errsss:", err))
//     // }, [])

//     React.useEffect(() => {

//         setUserList(Data.data)
//     }, [])

//     return (
//         <Paper sx={{ width: '100%', overflow: 'hidden', marginX: '20px', marginLeft: "40px" }}>
//             <Box marginX={2} marginY={2} display={'flex'} justifyContent={'space-between'}>
//                 <Typography fontSize={'15px'}>Rows Per Page: {rowsPerPage}</Typography>
//                 <Autocomplete
//                     sx={{ width: '30%' }}
//                     size='small'
//                     id="free-solo-demo"
//                     freeSolo
//                     options={userList.map((option) => option.sno)}
//                     renderInput={(params) => <TextField {...params} label="Search..." />}
//                 />
//             </Box>
//             <TableContainer sx={{ maxHeight: 440 }}>
//                 <Table stickyHeader aria-label="sticky table">
//                     <TableHead >
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align="center"
//                                     style={{ minWidth: column.minWidth, backgroundColor: '#f5f5f5', position: 'sticky', top: 0 }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {userList
//                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             .map((row, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell align="center">{index + 1}</TableCell>
//                                     <TableCell align="center">

//                                         {<Action
//                                             view='View'
//                                             viewPath='/viewPage/'
//                                             id={row.user_id}
//                                             delete={<PopupDelete button='Delete' id={row.user_id} url='manageDeleteUser' />}
//                                             status={<PopupStatus button='Acivate/Deactivate' id={row.user_id} url='manageUpdateStatusUser' status={row.active_flag} />}
//                                         />}
//                                     </TableCell>
//                                     <TableCell align="center">{row.image}</TableCell>
//                                     <TableCell align="center">{row.name}</TableCell>
//                                     <TableCell align="center">{row.email}</TableCell>
//                                     <TableCell align="center">{row.mobile}</TableCell>

//                                     <TableCell align="center">
//                                         {row.active_flag === 1 ?
//                                             <Box sx={{ color: '#fff', bgcolor: "#689f38", width: "80px", height: '25px', borderRadius: '15px', paddingTop: '3px' }} >Active</Box>
//                                             :
//                                             <Box sx={{ color: '#fff', bgcolor: "#d50000", width: "80px", height: '25px', borderRadius: '15px', paddingTop: '3px' }} >Deactive</Box>
//                                         }
//                                     </TableCell>
//                                     <TableCell align="center">{row.createtime}</TableCell>
//                                 </TableRow>
//                             ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[10, 25, 100]}
//                 component="div"
//                 count={userList.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// }


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
import Action from '../component/Action'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Avatar, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Data from '../component/DataSet'
import Constant from '../config/Constant'


const rows = Data.data
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
    { id: 'sno', numeric: false, label: 'SNo', minWidth: 100 },
    { id: 'name', numeric: false, label: 'Name', minWidth: 100 },

    { id: 'village', numeric: false, label: 'Village', minWidth: 100 },
    { id: 'mobile', numeric: false, label: 'Mobile', minWidth: 100 },
    { id: 'amount', numeric: false, label: 'Amount', minWidth: 100 },

    {
        id: 'date', numeric: false, label: 'Date', minWidth: 100
    },
    { id: 'action', numeric: false, label: 'Action', minWidth: 100 },

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
        <Typography marginBottom={4} fontSize={18} color={'gray'}>User List</Typography>
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
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleChange}
        />
    );
};

export default function UserList() {
    const [guestUserList, setGuestUserList] = React.useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('username');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filteredRows, setFilteredRows] = React.useState(guestUserList);
    const [search, setSearch] = React.useState(false)
    const navigate = useNavigate()
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = guestUserList.map((n) => n.user_id);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - guestUserList.length) : 0;


    const handleSearch = (searchTerm) => {
        setSearch(true)
        const filtered = guestUserList.filter((row) =>
            row.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRows(filtered);
    };
    const visibleRows = React.useMemo(
        () =>
            stableSort(setSearch, guestUserList, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, guestUserList],
    );
    React.useEffect(() => {
        setGuestUserList(Data.data)
    }, [])
    return (
        <Box sx={{ width: '100%' }}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography marginBottom={4} fontSize={20} >Manage User</Typography>
                <Box display={'flex'}>
                    <Typography onClick={() => navigate('/dashboardPage')} marginBottom={4} fontSize={15} >Dashboard </Typography>

                </Box>
            </Box>
            <Paper sx={{ width: '100%', borderRadius: '10px', padding: '20px' }}>

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
                            rowCount={guestUserList.length}
                        />
                        <TableBody>
                            {(search ? filteredRows : visibleRows).map((row, index) => {
                                const isItemSelected = isSelected(row.user_id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.user_id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.sno}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}

                                    >
                                        <TableCell align="left">{index + 1}</TableCell>
                                        <TableCell align="left">{row.firstName + ' ' + row.lastName}</TableCell>
                                        <TableCell align="left">{row.village}</TableCell>
                                        <TableCell align="left">{row.mobile}</TableCell>
                                        <TableCell align="left">{row.amount}</TableCell>
                                        <TableCell align="left">{row.date}</TableCell>

                                        <TableCell align="left">
                                            <Action edit='Edit' editIcon={<EditIcon sx={{ color: Constant.color[0] }} />} editPath='/editProjectPage' view='View' viewPath='/viewGuestUserPage/' id={row.user_id} viewIcon={<RemoveRedEyeIcon sx={{ color: Constant.color[0] }} />} delete='Delete' deleteIcon={<DeleteIcon sx={{ color: Constant.color[0] }} />} status='Active/Deactive' statusIcon={<AirplanemodeActiveIcon sx={{ color: Constant.color[0] }} />} />
                                        </TableCell>


                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align="left"
                                        >
                                            {row.username}
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
                    count={guestUserList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
