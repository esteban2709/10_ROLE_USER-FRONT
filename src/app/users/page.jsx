
"use client"
import { useEffect, useState } from 'react';
import '../users/styles.css'
import { useRouter, useSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { backendURL } from '@/config/config';


export default function Page() {

  const router = useRouter()
  const searchParams = useSearchParams();
  const dataUser = searchParams.get('data') ? JSON.parse(searchParams.get('data')) : null;
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
    date: ''
  });

  useEffect(() => {
    if (dataUser) {
      setFormData({
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
        password: dataUser.password,
        role: dataUser.role.id,
        date: dataUser.date
      });
    }
  }, [router]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const body ={
      id: formData.id && formData.id,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: {
        id: formData.role
      },
      date: formData.date && formData.date,
    }
    if (dataUser) {
      editUser(body);
    } else {
      createUser(body);
    }
    router.push('/')
  };

  const createUser = async (data) => {
    const response = await fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      alert('Usuario creado');
    } else {
      alert('Error al crear usuario');
    }
  }

  const editUser = async (data) => {
    const response = await fetch(backendURL +`/${data.id}` , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      alert('Usuario editado');
    } else {
      alert('Error al editar usuario');
    }
  }

  return (
    <div style={{justifyContent: 'center', display:'flex', flexDirection:'column', alignItems: 'center'}}>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop: '50px'}}>
        <ArrowBackIcon onClick={() => router.push('/')} style={{cursor: 'pointer', margin:'0px 80px -10px -60px'}} />
        <h1 >{dataUser ? 'Editar Usuario' : 'Crear Usuario'}</h1>
      </div>
      <form className="card-form" onSubmit={handleSubmit}>
        <div className="input">
          <input type="text" className="input-field" name="name" value={formData.name} onChange={handleChange} required />
          <label className="input-label">Nombre</label>
        </div>
        <div className="input">
          <input type="text" className="input-field" name="email" value={formData.email} onChange={handleChange} required />
          <label className="input-label">Email</label>
        </div>
        <div className="input">
          <input type="text" className="input-field" name="password" value={formData.password} onChange={handleChange} required />
          <label className="input-label">Contraseña</label>
        </div>
        <div className="input selectRol">
          <select className="input-field" name="role" value={formData.role} onChange={handleChange} required>
            <option value="" disabled>Seleccione un rol</option>
            <option value="1">Admin</option>
            <option value="2">Cajero</option>
          </select>
        </div>
        <div className="action">
          <button type="submit" className="action-button">{dataUser ? 'Editar usuario' : 'Crear Usuario'}</button>
        </div>
      </form>
    </div>
  );
}
