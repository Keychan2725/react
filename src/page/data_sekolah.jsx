import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link ,useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, Tooltip } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Swal from 'sweetalert2';
 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: '2%',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  // Hanya tombol "Aksi" yang menggunakan display: flex
  '&:last-child': {
    display: 'flex',
    justifyContent: 'center',
  },
  '@media (max-width: 600px)': {
    display: 'block', // Perubahan untuk tampilan responsif
    '&:last-child': {
      display: 'flex',
      justifyContent: 'center',
    },
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

const tableContainerStyle = {
  minWidth: '100vh', // Lebar tabel 100% dari wadah
  overflowX: 'auto', // Tambahkan scroll horizontal jika konten terlalu lebar
};

const tableStyle = {
  flex: 1,
};

const addButtonStyle = {
  position: 'relative',
 
  left: '46%',
  margin: '10px',
  bottom : '10px',
};

export default function CustomizedTables() {
  const [id, setId] = React.useState(""); // 'id' is defined as a state variable
  // const navigate = useNavigate();
  const Delete = async () => {
    try {
      // Send a DELETE request to remove data from the API
      await axios.delete(`http://localhost:3000/users/${id}`); // Use 'id' instead of 'setId'

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data berhasil dihapus",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirect to the data sekolah page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Mohon coba lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data:', error);
      });
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Link to="/TambahData" style={addButtonStyle}>
        <Button variant="contained" color="primary">
          Tambah
        </Button>
      </Link>
      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table sx={tableStyle} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Nama Sekolah</StyledTableCell>
              <StyledTableCell align="center">Alamat Sekolah</StyledTableCell>
              <StyledTableCell align="center">Jumlah Guru</StyledTableCell>
              <StyledTableCell align="center">Jumlah Siswa</StyledTableCell>
              <StyledTableCell align="center">Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.location}</StyledTableCell>
                <StyledTableCell align="center">{row.jumlah_guru}</StyledTableCell>
                <StyledTableCell align="center">{row.jumlah_siswa}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Delete" style={{ marginRight: '10px', backgroundColor: 'red' }}>
                    <Button variant="contained" onClick={() => Delete(setId)}>
                      <DeleteSweepIcon />
                    </Button>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
