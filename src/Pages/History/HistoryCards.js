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
import moment from "moment";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

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


export default function HistoryCards() {

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userExchanges, setUserExchanges] = useState([])
  useEffect(() => {
    fetch('/history').then(res => res.json()).then(res => setUserExchanges(res))
  }, []);

  console.log(userExchanges)
  console.log(moment("2021-07-14T00:00:00.000Z").utc().format('YYYY-MM-DD'));
  console.log(currentUser)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="right">Invite Code</StyledTableCell>
            <StyledTableCell align="right">Meeting Address</StyledTableCell>
            <StyledTableCell align="right">details</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userExchanges.map((exchange) => (
            <StyledTableRow key={exchange.id}>
              <StyledTableCell component="th" scope="row">
                {exchange.user.filter((u) => {return currentUser.username === u.username
                ? "" : u}).map((u) => <>{u.username.toUpperCase()}</>)}
              </StyledTableCell>
              <StyledTableCell align="right">{exchange.invite_code}</StyledTableCell>
              <StyledTableCell align="right">{exchange.meeting_address}</StyledTableCell>
              <StyledTableCell align="right">{exchange.details}</StyledTableCell>
              <StyledTableCell align="right">
                {moment(exchange.meettime).utc().format('MM-YYYY-DD')}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
