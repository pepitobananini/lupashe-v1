import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import { FiLayout, FiUsers, FiFolder, FiUser, FiLogOut, FiBookOpen, FiAward, FiFileText, FiFile, FiTarget, FiSettings } from 'react-icons/fi';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Logo size="small" />
          </div>
          <p className="user-info">{user?.username} ({user?.role})</p>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
              <FiLayout className="nav-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/clients" className={isActive('/clients') || isActive('/clients/') ? 'active' : ''}>
              <FiUsers className="nav-icon" />
              <span>Clientes</span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className={isActive('/projects') || isActive('/projects/') ? 'active' : ''}>
              <FiFolder className="nav-icon" />
              <span>Proyectos</span>
            </Link>
          </li>
          <li>
            <Link to="/capacitaciones" className={isActive('/capacitaciones') ? 'active' : ''}>
              <FiBookOpen className="nav-icon" />
              <span>Capacitaciones</span>
            </Link>
          </li>
          <li>
            <Link to="/constancias" className={isActive('/constancias') ? 'active' : ''}>
              <FiAward className="nav-icon" />
              <span>Constancias</span>
            </Link>
          </li>
          <li>
            <Link to="/formularios" className={isActive('/formularios') ? 'active' : ''}>
              <FiFileText className="nav-icon" />
              <span>Formularios</span>
            </Link>
          </li>
          <li>
            <Link to="/informes" className={isActive('/informes') ? 'active' : ''}>
              <FiFile className="nav-icon" />
              <span>Informes</span>
            </Link>
          </li>
          <li>
            <Link to="/prospeccion" className={isActive('/prospeccion') ? 'active' : ''}>
              <FiTarget className="nav-icon" />
              <span>Prospección</span>
            </Link>
          </li>
          {user?.role === 'ADMIN' && (
            <>
              <li>
                <Link to="/users" className={isActive('/users') ? 'active' : ''}>
                  <FiUser className="nav-icon" />
                  <span>Usuarios</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>
                  <FiSettings className="nav-icon" />
                  <span>Administración</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        <button className="logout-btn" onClick={logout}>
          <FiLogOut className="logout-icon" />
          <span>Cerrar Sesión</span>
        </button>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

