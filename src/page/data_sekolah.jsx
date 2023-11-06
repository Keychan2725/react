import * as React from "react";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button, Tooltip, colors } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Swal from "sweetalert2";
import Update from "@mui/icons-material/BorderColorSharp";
import Tambah from '@mui/icons-material/PlaylistAddSharp';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white", // Mengatur latar belakang thead menjadi warna abu-abu
    color: theme.palette.common.dark,
    borderRadius: "2%",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  "&:last-child": {
    display: "flex",
    justifyContent: "center",
  },
  "@media (max-width: 600px)": {
    display: "block",
    "&:last-child": {
      display: "flex",
      justifyContent: "center",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


 

const tableContainerStyle = {
  minWidth: "100vh",
  margin: "0 auto",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // Menambahkan bayangan
};

const tableStyle = {
  width: "90%",
  margin: "0 auto",
};

const addButtonStyle = {
  position: "relative",
  left: "43%",
  
 
margin: "10px",
  bottom: "10px",
};

const rootStyle = {
  padding: "20px", // Menambahkan padding ke bagian bawah
};
export default function CustomizedTables() {
  const Delete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send a DELETE request to remove data from the API
          await axios.delete(`http://localhost:3000/users/${id}`);

          Swal.fire({
            title: "Terhapus!",
            text: "Data Anda telah dihapus.",
            icon: "success",
          });

          // Reload the data after successful deletion
          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData);
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
      }
    });
  };

  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  return (
    <box sx={rootStyle} >
      <Link to="/TambahData" style={addButtonStyle}>
        <Button variant="contained" color="primary">
          <Tambah />
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
                <StyledTableCell align="center">
                  {row.jumlah_guru}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.jumlah_siswa}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip
                    title="Delete"
                    style={{ marginRight: "10px", backgroundColor: "red" }}
                  >
                    <Button variant="contained" onClick={() => Delete(row.id)}>
                      <DeleteSweepIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title="Update"
                    style={{ marginRight: "10px", backgroundColor: "green" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/UbahData/${row.id}`)}
                    >
                      <Update />
                    </Button>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </box>
  );
}
