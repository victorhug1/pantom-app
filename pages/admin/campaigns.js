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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import AdminHeader from '@/components/AdminHeader';

export default function Campaigns() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    template: '',
  });

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/auth/signin');
  //   }
  // }, [status, router]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/admin/campaigns');
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (campaign = null) => {
    if (campaign) {
      setSelectedCampaign(campaign);
      setFormData({
        name: campaign.name,
        description: campaign.description,
        template: campaign.template,
      });
    } else {
      setSelectedCampaign(null);
      setFormData({
        name: '',
        description: '',
        template: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCampaign(null);
    setFormData({
      name: '',
      description: '',
      template: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedCampaign
        ? `/api/admin/campaigns/${selectedCampaign._id}`
        : '/api/admin/campaigns';
      const method = selectedCampaign ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCampaigns();
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta campaña?')) {
      try {
        const response = await fetch(`/api/admin/campaigns/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchCampaigns();
        }
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };

  const handleSend = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas enviar esta campaña?')) {
      try {
        const response = await fetch(`/api/admin/campaigns/${id}/send`, {
          method: 'POST',
        });

        if (response.ok) {
          fetchCampaigns();
        }
      } catch (error) {
        console.error('Error sending campaign:', error);
      }
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
            <Typography variant="h4">Campañas</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Nueva Campaña
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Enviados</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign._id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.description}</TableCell>
                    <TableCell>{campaign.status}</TableCell>
                    <TableCell>{campaign.sentCount || 0}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(campaign)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(campaign._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleSend(campaign._id)}>
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
          {selectedCampaign ? 'Editar Campaña' : 'Nueva Campaña'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Descripción"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label="Plantilla"
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              margin="normal"
              multiline
              rows={6}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {selectedCampaign ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
} 