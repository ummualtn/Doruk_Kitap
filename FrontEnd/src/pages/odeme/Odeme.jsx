import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from '@mui/material';
import { selectCartTotal } from '../../store/slices/cartSlice';

const Odeme = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basit doğrulama
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      setError('Lütfen tüm kart bilgilerini doldurun.');
      return;
    }

    // Burada gerçek ödeme işlemi yapılacak
    // Başarılı ödeme sonrası:
    navigate('/siparis-durumu');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ödeme
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Ödeme Yöntemi</FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="creditCard"
                    control={<Radio />}
                    label="Kredi/Banka Kartı"
                  />
                  <FormControlLabel
                    value="transfer"
                    control={<Radio />}
                    label="Havale/EFT"
                  />
                </RadioGroup>
              </FormControl>

              {paymentMethod === 'creditCard' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Kart Bilgileri
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Kart Üzerindeki İsim"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Kart Numarası"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Son Kullanma Tarihi (AA/YY)"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVV"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Teslimat Adresi
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Adres"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Şehir"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Posta Kodu"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                {cartTotal.toFixed(2)} TL Öde
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sipariş Özeti
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Toplam:</Typography>
                </Grid>
                <Grid item>
                  <Typography>{cartTotal.toFixed(2)} TL</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Odeme;
