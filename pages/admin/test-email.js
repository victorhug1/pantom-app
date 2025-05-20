import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import AdminHeader from '@/components/AdminHeader';

export default function TestEmail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
  }

  const handleTestEmail = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await fetch('/api/admin/test-email', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Error al enviar email de prueba');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al enviar email de prueba');
    } finally {
      setLoading(false);
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
    <>
      <AdminHeader />
      <Box sx={{ pt: 8, pb: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Prueba de Email
          </Typography>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Prueba de MailerSend
            </Typography>
            <Typography paragraph>
              Esta página te permite probar la integración con MailerSend enviando un email de prueba.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {result && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Email enviado correctamente. Message ID: {result.messageId}
              </Alert>
            )}

            <Button
              variant="contained"
              onClick={handleTestEmail}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Email de Prueba'}
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
} 