import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function UbahData() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [jumlah_guru, setJumlah_guru] = useState("");
  const [jumlah_siswa, setJumlah_siswa] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch existing data to edit
      axios.get(`http://localhost:3000/users/${id}`)
        .then((response) => {
          const data = response.data;
          setName(data.name);
          setLocation(data.location);
          setJumlah_guru(data.jumlah_guru);
          setJumlah_siswa(data.jumlah_siswa);
        })
        .catch((error) => {
          console.error("Gagal mengambil data:", error);
        });
    }
  }, [id]);

  const updateUser = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin mengubah data?",
      text: " ",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Ubah",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateData = {
          name: name,
          location: location,
          jumlah_guru: jumlah_guru,
          jumlah_siswa: jumlah_siswa,
        };

        axios
          .put(`http://localhost:3000/users/${id}`, updateData)
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Data berhasil diperbarui",
              showConfirmButton: false,
              timer: 1500,
            });

            navigate("/DataSekolah");
          })
          .catch((error) => {
            console.error("Terjadi kesalahan saat pembaruan data:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Terjadi Kesalahan!",
              text: "Mohon coba lagi",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };


  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 30 }} color="text.dark" gutterBottom>
            {id ? "Ubah Data" : "Tambah Data"}
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
          <Link to="/DataSekolah" style={{ marginRight: "10px" }}>
            <Button variant="contained" color="error">
              Kembali
            </Button>
          </Link>
          <Button onClick={updateUser} variant="contained" color="primary">
            {id ? "Update" : "Submit"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
