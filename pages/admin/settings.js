import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import AdminHeader from '@/components/AdminHeader';

export default function Settings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({
    general: {
      siteName: '',
      siteDescription: '',
      maintenanceMode: false,
    },
    email: {
      smtpHost: '',
      smtpPort: '',
      smtpUser: '',
      smtpPassword: '',
      fromEmail: '',
      fromName: '',
      replyTo: '',
    },
    notifications: {
      enableEmailNotifications: true,
      enablePushNotifications: true,
      notificationTypes: {
        newLead: true,
        leadResponse: true,
        campaignComplete: true,
        systemAlert: true,
      },
    },
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError('Error al cargar la configuración');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNotificationTypeChange = (type, value) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        notificationTypes: {
          ...prev.notifications.notificationTypes,
          [type]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Error al guardar la configuración');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Error al guardar la configuración');
    } finally {
      setSaving(false);
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
          <Typography variant="h4" gutterBottom>
            Configuración
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Configuración guardada exitosamente
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Configuración General */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Configuración General
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nombre del Sitio"
                        value={settings.general.siteName}
                        onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Descripción del Sitio"
                        value={settings.general.siteDescription}
                        onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.general.maintenanceMode}
                            onChange={(e) => handleChange('general', 'maintenanceMode', e.target.checked)}
                          />
                        }
                        label="Modo Mantenimiento"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Configuración de Email */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Configuración de Email
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Servidor SMTP"
                        value={settings.email.smtpHost}
                        onChange={(e) => handleChange('email', 'smtpHost', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Puerto SMTP"
                        value={settings.email.smtpPort}
                        onChange={(e) => handleChange('email', 'smtpPort', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Usuario SMTP"
                        value={settings.email.smtpUser}
                        onChange={(e) => handleChange('email', 'smtpUser', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Contraseña SMTP"
                        value={settings.email.smtpPassword}
                        onChange={(e) => handleChange('email', 'smtpPassword', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email de Origen"
                        value={settings.email.fromEmail}
                        onChange={(e) => handleChange('email', 'fromEmail', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nombre de Origen"
                        value={settings.email.fromName}
                        onChange={(e) => handleChange('email', 'fromName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email de Respuesta"
                        value={settings.email.replyTo}
                        onChange={(e) => handleChange('email', 'replyTo', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Configuración de Notificaciones */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Configuración de Notificaciones
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.notifications.enableEmailNotifications}
                            onChange={(e) => handleChange('notifications', 'enableEmailNotifications', e.target.checked)}
                          />
                        }
                        label="Habilitar Notificaciones por Email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.notifications.enablePushNotifications}
                            onChange={(e) => handleChange('notifications', 'enablePushNotifications', e.target.checked)}
                          />
                        }
                        label="Habilitar Notificaciones Push"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        Tipos de Notificaciones
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.notifications.notificationTypes.newLead}
                                onChange={(e) => handleNotificationTypeChange('newLead', e.target.checked)}
                              />
                            }
                            label="Nuevo Lead"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.notifications.notificationTypes.leadResponse}
                                onChange={(e) => handleNotificationTypeChange('leadResponse', e.target.checked)}
                              />
                            }
                            label="Respuesta de Lead"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.notifications.notificationTypes.campaignComplete}
                                onChange={(e) => handleNotificationTypeChange('campaignComplete', e.target.checked)}
                              />
                            }
                            label="Campaña Completada"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.notifications.notificationTypes.systemAlert}
                                onChange={(e) => handleNotificationTypeChange('systemAlert', e.target.checked)}
                              />
                            }
                            label="Alertas del Sistema"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Botón de Guardar */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    sx={{ minWidth: 200 }}
                  >
                    {saving ? 'Guardando...' : 'Guardar Configuración'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
} 