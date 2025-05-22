import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import AdminHeader from '@/components/AdminHeader';

// Estados posibles para los leads
const LEAD_STATES = {
  PENDING: 'Pendiente',
  CONTACTED: 'Contactado',
  RESPONDED: 'Respondió',
  REJECTED: 'Rechazado',
  ACCEPTED: 'Aceptado',
  COMPLETED: 'Completado',
};

// Estados de email
const EMAIL_STATES = {
  NOT_SENT: 'No enviado',
  SENT: 'Enviado',
  BOUNCED: 'Rebotó',
  OPENED: 'Abierto',
  CLICKED: 'Click',
};

export default function AdminLeads() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterEmailState, setFilterEmailState] = useState('');
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editForm, setEditForm] = useState({
    state: '',
    emailState: '',
    notes: '',
  });
  const rowsPerPageOptions = [10, 25, 50, 100];

  // Cargar leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page + 1,
        limit: rowsPerPage,
      });
      if (searchTerm) queryParams.append('search', searchTerm);
      if (filterState) queryParams.append('state', filterState);
      if (filterEmailState) queryParams.append('emailState', filterEmailState);

      const response = await fetch(`/api/admin/leads?${queryParams}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setLeads(data.data.leads);
      setTotal(data.data.pagination.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, rowsPerPage, searchTerm, filterState, filterEmailState]);

  // Manejar cambios de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Manejar actualización de estado
  const handleEstadoChange = async (id, newEstado) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado_funnel: newEstado })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      fetchLeads();
    } catch (err) {
      setError(err.message);
    }
  };

  // Manejar eliminación
  const handleDelete = (lead) => {
    setSelectedLead(lead);
    setDeleteDialog(true);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setEditForm({
      state: lead.state || '',
      emailState: lead.emailState || '',
      notes: lead.notes || '',
    });
    setEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`/api/admin/leads/${selectedLead._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        fetchLeads();
        setEditDialog(false);
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/admin/leads/${selectedLead._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchLeads();
        setDeleteDialog(false);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const getStateColor = (state) => {
    const colors = {
      [LEAD_STATES.PENDING]: 'default',
      [LEAD_STATES.CONTACTED]: 'info',
      [LEAD_STATES.RESPONDED]: 'primary',
      [LEAD_STATES.REJECTED]: 'error',
      [LEAD_STATES.ACCEPTED]: 'success',
      [LEAD_STATES.COMPLETED]: 'success',
    };
    return colors[state] || 'default';
  };

  const getEmailStateColor = (state) => {
    const colors = {
      [EMAIL_STATES.NOT_SENT]: 'default',
      [EMAIL_STATES.SENT]: 'info',
      [EMAIL_STATES.BOUNCED]: 'error',
      [EMAIL_STATES.OPENED]: 'success',
      [EMAIL_STATES.CLICKED]: 'success',
    };
    return colors[state] || 'default';
  };

  if (status === 'loading') {
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
          <Paper sx={{ p: 3, mb: 3, backgroundColor: '#181818', color: 'white' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Buscar"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ea5a19',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ea5a19',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Estado</InputLabel>
                <Select
                  value={filterState}
                  label="Estado"
                  onChange={(e) => setFilterState(e.target.value)}
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ea5a19',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ea5a19',
                    },
                  }}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {Object.values(LEAD_STATES).map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Estado Email</InputLabel>
                <Select
                  value={filterEmailState}
                  label="Estado Email"
                  onChange={(e) => setFilterEmailState(e.target.value)}
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ea5a19',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ea5a19',
                    },
                  }}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {Object.values(EMAIL_STATES).map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>Email</TableCell>
                    <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
                    <TableCell sx={{ color: 'white' }}>Empresa</TableCell>
                    <TableCell sx={{ color: 'white' }}>Representante Legal</TableCell>
                    <TableCell sx={{ color: 'white' }}>Estado</TableCell>
                    <TableCell sx={{ color: 'white' }}>Estado Email</TableCell>
                    <TableCell sx={{ color: 'white' }}>Notas</TableCell>
                    <TableCell sx={{ color: 'white' }}>Fecha</TableCell>
                    <TableCell sx={{ color: 'white' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ color: 'white' }}>
                        No hay leads que coincidan con los filtros
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((lead) => (
                      <TableRow key={lead._id}>
                        <TableCell sx={{ color: 'white' }}>{lead.email}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{lead.name}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{lead.empresa}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{lead.representanteLegal}</TableCell>
                        <TableCell>
                          <Chip
                            label={lead.state || LEAD_STATES.PENDING}
                            color={getStateColor(lead.state)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={lead.emailState || EMAIL_STATES.NOT_SENT}
                            color={getEmailStateColor(lead.emailState)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title={lead.notes || 'Sin notas'}>
                            <Typography noWrap sx={{ maxWidth: 200, color: 'white' }}>
                              {lead.notes || '-'}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(lead)}
                            sx={{ color: '#ea5a19' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(lead)}
                            sx={{ color: '#ea5a19' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              sx={{
                color: 'white',
                '& .MuiTablePagination-select': {
                  color: 'white',
                },
                '& .MuiTablePagination-selectIcon': {
                  color: 'white',
                },
              }}
            />
          </Paper>
        </Container>
      </Box>

      {/* Diálogo de edición */}
      <Dialog 
        open={editDialog} 
        onClose={() => setEditDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#181818',
            color: 'white',
          },
        }}
      >
        <DialogTitle>Editar Lead</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Estado</InputLabel>
              <Select
                value={editForm.state}
                label="Estado"
                onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ea5a19',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ea5a19',
                  },
                }}
              >
                {Object.values(LEAD_STATES).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Estado Email</InputLabel>
              <Select
                value={editForm.emailState}
                label="Estado Email"
                onChange={(e) => setEditForm({ ...editForm, emailState: e.target.value })}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ea5a19',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ea5a19',
                  },
                }}
              >
                {Object.values(EMAIL_STATES).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Notas"
              multiline
              rows={4}
              value={editForm.notes}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ea5a19',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ea5a19',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditDialog(false)}
            sx={{ color: 'white' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleEditSubmit} 
            variant="contained"
            sx={{ 
              backgroundColor: '#ea5a19',
              '&:hover': {
                backgroundColor: '#d44d0f',
              },
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de eliminación */}
      <Dialog 
        open={deleteDialog} 
        onClose={() => setDeleteDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#181818',
            color: 'white',
          },
        }}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'white' }}>
            ¿Estás seguro de que deseas eliminar este lead? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog(false)}
            sx={{ color: 'white' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            variant="contained"
            sx={{ 
              backgroundColor: '#ea5a19',
              '&:hover': {
                backgroundColor: '#d44d0f',
              },
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 