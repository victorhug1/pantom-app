import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Settings,
  Logout,
} from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';

export default function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  return (
    <AppBar position="fixed" sx={{ 
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: '#181818',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
          Panel Administrativo
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<Dashboard />}
            onClick={() => router.push('/admin/dashboard')}
            sx={{ color: 'white', '&:hover': { backgroundColor: '#ea5a19' } }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            startIcon={<People />}
            onClick={() => router.push('/admin/leads')}
            sx={{ color: 'white', '&:hover': { backgroundColor: '#ea5a19' } }}
          >
            Leads
          </Button>
          <Button
            color="inherit"
            startIcon={<Settings />}
            onClick={() => router.push('/admin/settings')}
            sx={{ color: 'white', '&:hover': { backgroundColor: '#ea5a19' } }}
          >
            Configuración
          </Button>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{ ml: 1, color: 'white', '&:hover': { backgroundColor: '#ea5a19' } }}
          >
            <Logout />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: '#181818',
              color: 'white',
              '& .MuiMenuItem-root': {
                '&:hover': {
                  backgroundColor: '#ea5a19',
                },
              },
            },
          }}
        >
          <MenuItem onClick={() => { handleClose(); router.push('/admin/dashboard'); }}>
            <Dashboard sx={{ mr: 1 }} /> Dashboard
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); router.push('/admin/leads'); }}>
            <People sx={{ mr: 1 }} /> Leads
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); router.push('/admin/settings'); }}>
            <Settings sx={{ mr: 1 }} /> Configuración
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
            <Logout sx={{ mr: 1 }} /> Cerrar Sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
} 