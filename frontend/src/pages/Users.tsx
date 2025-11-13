import { useEffect, useState } from 'react';
import { userApi } from '../utils/api';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import './Users.css';

interface User {
  id: string;
  username: string;
  email?: string;
  role: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'CONSULTOR' as 'ADMIN' | 'CONSULTOR' | 'CAPACITADOR' | 'ADMINISTRATIVO',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userApi.getAll();
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const updateData: any = {
          email: formData.email || undefined,
          role: formData.role,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await userApi.update(editingUser.id, updateData);
      } else {
        await userApi.create(formData);
      }
      setShowModal(false);
      setEditingUser(null);
      resetForm();
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Error al guardar usuario');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '',
      email: user.email || '',
      role: user.role as any,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      await userApi.delete(id);
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Error al eliminar usuario');
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      email: '',
      role: 'CONSULTOR',
    });
  };

  if (loading) {
    return (
      <div className="users-page">
        <div className="loading-spinner">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Usuarios</h1>
        <button className="btn-primary" onClick={() => { setEditingUser(null); resetForm(); setShowModal(true); }}>
          <FiPlus className="btn-icon" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email || '-'}</td>
                <td>
                  <span className="role-badge">{user.role}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEdit(user)} title="Editar">
                      <FiEdit2 />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(user.id)} title="Eliminar">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); setEditingUser(null); resetForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Usuario *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  disabled={!!editingUser}
                />
              </div>
              {!editingUser && (
                <div className="form-group">
                  <label>Contraseña *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              )}
              {editingUser && (
                <div className="form-group">
                  <label>Nueva Contraseña (dejar vacío para no cambiar)</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              )}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Rol *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  required
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="CONSULTOR">CONSULTOR</option>
                  <option value="CAPACITADOR">CAPACITADOR</option>
                  <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); setEditingUser(null); resetForm(); }}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingUser ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

