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
    borderRadius:'2%',
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
    border: 1,
  },
}));

function createData(no,name, alamat, jum_guru, jum_siswa  ) {
  return {no, name, alamat, jum_guru, jum_siswa  };
}

const rows = [
  createData(1,'Smk Bina Nusantara Mangkang', 'Jl. Kemantren Raya No.5, RT.02/RW.04, Wonosari, Kec. Ngaliyan, Kota Semarang, Jawa Tengah 50186'
  , 24, 220 ),
  createData(2,'Smk  Bina Nusantara Mranggen', 'Gg. Mondosari Tim. No.5, Mondosari, Batursari, Kec. Mranggen, Kabupaten Demak, Jawa Tengah 5956  ', 24, 177 ),
  createData(3,'Smp Negeri 1 Karangreja ', 'Karangreja, Karangreja, Purbalingga, Kabupaten Purbalingga, Jawa Tengah 53357  ', 35, 332 ),
  
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="center">Nama Sekolah</StyledTableCell>
            <StyledTableCell align="center">Alamat Sekolah </StyledTableCell>
            <StyledTableCell align="center">Jumlah Guru </StyledTableCell>
            <StyledTableCell align="center">Jumlah Siswa </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row"> {row.no}  </StyledTableCell>
              <StyledTableCell component="th" scope="row"> {row.name}  </StyledTableCell>
              <StyledTableCell align="center">{row.alamat}</StyledTableCell>
              <StyledTableCell align="center">{row.jum_guru}</StyledTableCell>
              <StyledTableCell align="center">{row.jum_siswa}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}