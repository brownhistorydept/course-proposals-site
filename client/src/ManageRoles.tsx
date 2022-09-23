import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import { changeRole } from "./utils/users";
import { fetchUsers } from "./utils/users";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';

function ManageRoles() {

  const navigate = useNavigate();

  const allRoles = ['default', 'curriculum coordinator', 'professor', 'undergraduate director', 'graduate director', 'manager'];

  const [user, setUser] = useState<IUser>();
  const [allUsers, setAllUsers] = useState<IUser[]>();
  // const [defaultUsers, setDefaultUsers] = useState<IUser[]>();
  // const [nonDefaultUsers, setNonDefaultUsers] = useState<IUser[]>();
  const [alertOpen, setAlertOpen] = useState(false);
  const [lastUser, setLastUser] = useState<IUser>();
  const [lastRole, setLastRole] = useState('');
  const [searched, setSearched] = useState('');

  // called once when components on page have rendered
  async function getAllUsers(isMounted: boolean = true) {
    await fetchUsers(setAllUsers, false, isMounted);
    // setDefaultUsers(allUsers?.filter(user => user.role === "default"))
    // setNonDefaultUsers(allUsers?.filter(user => user.role !== "default"))
  }

  async function getUser() {
    await setAuthenticatedUser(setUser);
  }

  useEffect(() => {
    let isMounted = true;
    getUser();
    getAllUsers(isMounted);

    return () => {
      isMounted = false
    }
  }, []);

  async function handleClose(isAccepted: boolean) {
    if (isAccepted) {
      await changeRole(lastUser!, lastRole)
      getUser()
      getAllUsers();
    }
    setAlertOpen(false);
  }

  async function handleDropdownChange(u: IUser, value: string) {
    if (value === "manager" || u.role === "manager") {
      setLastUser(u);
      setLastRole(value);
      setAlertOpen(true);
    } else {
      await changeRole(u, value);
      getUser()
      getAllUsers();
    }
  }

  function sortUsers() {
    allUsers?.sort((prof1, prof2) => {
      const prof1_surname = prof1.displayName.split(' ')[1]
      const prof2_surname = prof2.displayName.split(' ')[1]
      return prof1_surname.localeCompare(prof2_surname)
    })
  }

  const filter = () => {
    if (typeof(allUsers) === 'undefined') {
      return []
    } else if (searched === '') {
      return allUsers
    } else {
      return allUsers.filter(user => user.displayName.toLowerCase().includes(searched.toLowerCase()));
    }
  }

  if (user?.role !== "manager") {
    navigate('/course_catalog');
  }

  return (
    <>
      <NavBar user={user} />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, marginTop: 4, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Search by Name"
              fullWidth
              id="outlined-size-small"
              onChange={(e) => { setSearched(e.target.value) }}
              size="small"
              style={{ width: 1010 }}
            />
            <br />
          </div>
        </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortUsers()}
            {filter().map((u, index) => (
              <TableRow key={index}>
                <TableCell>{u.displayName}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Select
                    size='small'
                    defaultValue={u.role}
                    value={u.role}
                    onChange={(e) => handleDropdownChange(u, e.target.value)}
                    sx={{ marginRight: 1 }}
                  >
                    {allRoles.map((role, index) =>
                      <MenuItem key={index} value={role}>{role}</MenuItem>)}
                  </Select>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={alertOpen} onClose={handleClose}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are attempting to either appoint someone a manager or remove someone as a manager.
            Are you sure you would like to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Go Back</Button>
          <Button onClick={() => handleClose(true)} autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ManageRoles;