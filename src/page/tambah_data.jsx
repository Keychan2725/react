import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import axios from "axios";

export default function TambahData() {
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [jumlah_guru, setJumlah_guru] = React.useState("");
  const [jumlah_siswa, setJumlah_siswa] = React.useState("");
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const addUser = async (e) => {
    e.preventDefault();

    const add = {
      name: name,
      location: location,
      jumlah_guru: jumlah_guru,
      jumlah_siswa: jumlah_siswa,
    };
    await axios
      .post("http://localhost:3000/users", add)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil ditambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          // Gunakan navigate untuk navigasi ke halaman lain
          navigate("/DataSekolah");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: "Mohon coba lagi",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 30 }} color="text.dark" gutterBottom>
              Tambah Data
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="nama_sekolah"
                  label="Nama Sekolah"
                  variant="outlined"
                  fullWidth
                  margin="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="alamat_sekolah"
                  label="Alamat Sekolah"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="small"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="jumlah_guru"
                  label="Jumlah Guru"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="small"
                  value={jumlah_guru}
                  onChange={(e) => setJumlah_guru(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="jumlah_siswa"
                  label="Jumlah Siswa"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="small"
                  value={jumlah_siswa}
                  onChange={(e) => setJumlah_siswa(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Link to={"/DataSekolah"} style={{ marginRight: "10px" }}>
              <Button variant="contained" color="error">
                Kembali
              </Button>
            </Link>
            <Button onClick={addUser} variant="contained" color="primary">
              Submit
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
