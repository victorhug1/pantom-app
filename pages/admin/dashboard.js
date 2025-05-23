import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import {
  People,
  Email,
  CheckCircle,
  TrendingUp,
} from '@mui/icons-material';
import AdminHeader from '@/components/AdminHeader';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeLeads: 0,
    emailsSent: 0,
    responseRate: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) throw new Error('Error al obtener estadísticas');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      setError('No se pudieron cargar las estadísticas');
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const StatCard = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <>
      <AdminHeader />
      <Box sx={{ pt: 8, pb: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Leads"
                value={stats.totalLeads}
                icon={<People color="primary" />}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Leads Activos"
                value={stats.activeLeads}
                icon={<TrendingUp color="success" />}
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Emails Enviados"
                value={stats.emailsSent}
                icon={<Email color="info" />}
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Tasa de Respuesta"
                value={`${stats.responseRate}%`}
                icon={<CheckCircle color="warning" />}
                color="warning"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Distribución de Estados
                </Typography>
                {/* Aquí irá el gráfico de distribución de estados */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Actividad Reciente
                </Typography>
                {/* Aquí irá la lista de actividad reciente */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
} 