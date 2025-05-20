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
  Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon
} from '@mui/icons-material';

export default function AdminLeads() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [estado, setEstado] = useState('');
  const [stats, setStats] = useState({});

  // Verificar autenticación
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  // Cargar leads
  const loadLeads = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page + 1,
        limit: rowsPerPage,
        ...(search && { search }),
        ...(estado && { estado })
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
    if (status === 'authenticated') {
      loadLeads();
    }
  }, [status, page, rowsPerPage, search, estado]);

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

      loadLeads();
    } catch (err) {
      setError(err.message);
    }
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este lead?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      loadLeads();
    } catch (err) {
      setError(err.message);
    }
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Administración de Leads
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {Object.entries(stats).map(([estado, count]) => (
          <Grid item xs={12} sm={6} md={3} key={estado}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {estado === 'sin_estado' ? 'Sin Estado' : estado}
                </Typography>
                <Typography variant="h5">
                  {count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={estado}
                label="Estado"
                onChange={(e) => setEstado(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="email_1">Email 1</MenuItem>
                <MenuItem value="email_2">Email 2</MenuItem>
                <MenuItem value="completado">Completado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de leads */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Representante</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Último Envío</TableCell>
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
                  <TableCell>{lead.empresa}</TableCell>
                  <TableCell>{lead.representanteLegal}</TableCell>
                  <TableCell>
                    <Select
                      value={lead.estado_funnel || ''}
                      onChange={(e) => handleEstadoChange(lead._id, e.target.value)}
                      size="small"
                    >
                      <MenuItem value="pendiente">Pendiente</MenuItem>
                      <MenuItem value="email_1">Email 1</MenuItem>
                      <MenuItem value="email_2">Email 2</MenuItem>
                      <MenuItem value="completado">Completado</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {lead.fecha_ultimo_envio
                      ? new Date(lead.fecha_ultimo_envio).toLocaleDateString()
                      : 'Nunca'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(lead._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </TableContainer>
    </Container>
  );
} 