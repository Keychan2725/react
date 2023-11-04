import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Kirim permintaan pendaftaran ke API menggunakan Axios
    axios.post('https://api.example.com/register', { username, password })
      .then(response => {
        // Tangani respons dari API, seperti pengalihan ke halaman login atau pesan keberhasilan.
      })
      .catch(error => {
        // Tangani kesalahan, misalnya menampilkan pesan kesalahan kepada pengguna.
      });
  }

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
