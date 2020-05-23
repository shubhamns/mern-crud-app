import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readUsers, deleteUser } from "./../services/user";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  table: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
}));

function Read() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    readUsers().then(
      (data) => {
        console.log("users =>>", data);
        setUsers(data || []);
      },
      (error) => {
        console.log("error =>>", error);
      }
    );
  };

  const openDialog = (_id) => {
    setOpen(true);
    setUserId(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    deleteUser(userId).then(
      (data) => {
        console.log("users =>>", data);
        setUsers(users.filter((user) => user._id !== userId));
        setOpen(false);
      },
      (error) => {
        console.log("error =>>", error);
      }
    );
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ReactJs CRUD App
          </Typography>
        </Toolbar>
      </AppBar>
      <Link to="/create">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Create User
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>State</TableCell>
              <TableCell>CreatedAt</TableCell>
              <TableCell>UpdatedAt</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.firstName + " " + row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
                <TableCell>
                  <Link to={`/update/${row._id}`}>
                    <Icon>edit</Icon>
                  </Link>
                </TableCell>
                <TableCell>
                  <Icon onClick={() => openDialog(row._id)}>delete</Icon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="Delete User"
        >
          <DialogContent style={{ width: 300 }}>
            <DialogContentText>Are you sure?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default Read;
