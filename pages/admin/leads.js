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
  const [stats, setStats] = useState({});

  // Cargar leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm,
        state: filterState,
        emailState: filterEmailState,
      });

      const response = await fetch(`/api/admin/leads?${queryParams}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setLeads(data.data.leads);
      setTotal(data.data.pagination.total);
      setStats(data.data.stats);
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
          <Paper sx={{ p: 3, mb: 3 }}>
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
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterState}
                  label="Estado"
                  onChange={(e) => setFilterState(e.target.value)}
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
                <InputLabel>Estado Email</InputLabel>
                <Select
                  value={filterEmailState}
                  label="Estado Email"
                  onChange={(e) => setFilterEmailState(e.target.value)}
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
                    <TableCell>Email</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Estado Email</TableCell>
                    <TableCell>Notas</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No hay leads que coincidan con los filtros
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((lead) => (
                      <TableRow key={lead._id}>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.name}</TableCell>
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
                            <Typography noWrap sx={{ maxWidth: 200 }}>
                              {lead.notes || '-'}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(lead)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(lead)}
                            color="error"
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
            />
          </Paper>
        </Container>
      </Box>

      {/* Diálogo de edición */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Editar Lead</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={editForm.state}
                label="Estado"
                onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
              >
                {Object.values(LEAD_STATES).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Estado Email</InputLabel>
              <Select
                value={editForm.emailState}
                label="Estado Email"
                onChange={(e) => setEditForm({ ...editForm, emailState: e.target.value })}
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
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de eliminación */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este lead? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 