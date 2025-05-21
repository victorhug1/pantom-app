import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import AdminHeader from '@/components/AdminHeader';

export default function Notifications() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'all',
  });

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/auth/signin');
  //   }
  // }, [status, router]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/admin/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (notification = null) => {
    if (notification) {
      setSelectedNotification(notification);
      setFormData({
        title: notification.title,
        message: notification.message,
        type: notification.type,
        target: notification.target,
      });
    } else {
      setSelectedNotification(null);
      setFormData({
        title: '',
        message: '',
        type: 'info',
        target: 'all',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNotification(null);
    setFormData({
      title: '',
      message: '',
      type: 'info',
      target: 'all',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedNotification
        ? `/api/admin/notifications/${selectedNotification._id}`
        : '/api/admin/notifications';
      const method = selectedNotification ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchNotifications();
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta notificación?')) {
      try {
        const response = await fetch(`/api/admin/notifications/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchNotifications();
        }
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    }
  };

  const handleSend = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas enviar esta notificación?')) {
      try {
        const response = await fetch(`/api/admin/notifications/${id}/send`, {
          method: 'POST',
        });

        if (response.ok) {
          fetchNotifications();
        }
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AdminHeader />
      <Box sx={{ pt: 8, pb: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4">Notificaciones</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Nueva Notificación
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Mensaje</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Destino</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification._id}>
                    <TableCell>{notification.title}</TableCell>
                    <TableCell>{notification.message}</TableCell>
                    <TableCell>
                      <Chip
                        label={notification.type}
                        color={getTypeColor(notification.type)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{notification.target}</TableCell>
                    <TableCell>{notification.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(notification)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(notification._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleSend(notification._id)}>
                        <SendIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedNotification ? 'Editar Notificación' : 'Nueva Notificación'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Mensaje"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              select
              label="Tipo"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              margin="normal"
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value="info">Info</option>
              <option value="success">Éxito</option>
              <option value="warning">Advertencia</option>
              <option value="error">Error</option>
            </TextField>
            <TextField
              fullWidth
              select
              label="Destino"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              margin="normal"
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value="all">Todos</option>
              <option value="leads">Leads</option>
              <option value="admins">Administradores</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {selectedNotification ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
} 