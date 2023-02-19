import { useState , useEffect} from 'react'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: number,
  protein: string,
) {
  return { name, calories, fat, carbs, protein };
}

export default function HistoryCards() {

  const [currentUser, setCurrentUser] = useState(null)
  const [userExchanges, setUserExchanges] = useState(null)

  useEffect(() => {
    fetch('/history').then(res => res.json()).then(res => setUserExchanges(res))
  }, []);


  useEffect(() => {
    fetch('/me').then(res => res.json()).then(res => setCurrentUser(res))
  }, []);


  console.log(userExchanges)
  console.log(currentUser)


  // const rows = [
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Meeting Address</StyledTableCell>
            <StyledTableCell align="right">Invite Code</StyledTableCell>
            <StyledTableCell align="right">Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userExchanges.map((row) => (
            <StyledTableRow key={currentUser.username}>
              <StyledTableCell component="th" scope="row">
                {currentUser.username}
              </StyledTableCell>
              <StyledTableCell align="right">{currentUser.email}</StyledTableCell>
              <StyledTableCell align="right">{row.meeting_address}</StyledTableCell>
              <StyledTableCell align="right">{row.invite_code}</StyledTableCell>
              <StyledTableCell align="right">{row.details}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}