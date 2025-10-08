import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus, FaHistory, FaQrcode, FaUserCheck, FaClipboardList, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: FaHome },
    { path: '/interns', label: 'Interns', icon: FaUsers },
    { path: '/register-intern', label: 'Register Intern', icon: FaUserPlus },
    { path: '/entry-logs', label: 'Entry Logs', icon: FaHistory },
    { path: '/scan', label: 'Scan QR', icon: FaQrcode },
    { path: '/new-comer', label: 'New Visitor', icon: FaUserCheck },
    { path: '/new-comers', label: 'Visitors', icon: FaClipboardList },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          QR Intern Logger
        </Link>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <li className="nav-item" key={path}>
              <Link
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}
                onClick={() => setMenuOpen(false)}
              >
                <Icon />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;