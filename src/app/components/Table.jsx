"use client"
import './tableStyles.css';
import EditIcon from '@mui/icons-material/Edit';

export const DefaulTable = ({ users, router }) => {
    
    
    const handleClick = (e, user) => {
        router.push(`/users?data=${encodeURIComponent(JSON.stringify(user))}`)
    }
    return (
        <table className="container">
            <thead>
                <tr>
                    <th><h1>ID</h1></th>
                    <th><h1>Nombre </h1></th>
                    <th><h1>Email </h1></th>
                    <th><h1>Contraseña </h1></th>
                    <th><h1>Fecha de creación </h1></th>
                    <th><h1>Rol </h1></th>
                    <th><h1>Permisos </h1></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td style={{minWidth:'30px'}}>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.date ? new Date(user.date).toLocaleString() : 'N/A'}</td>
                        <td>{user.role.name}</td>
                        <td>{user.role.permissions.map(permission => permission.name).join(', ')}</td>
                        <td style={{minWidth:'50px'}}><EditIcon onClick={(e)=> handleClick(e, user)} style={{cursor: 'pointer'}} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
