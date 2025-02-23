import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  InputAdornment,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { object, string, number } from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addPayment, selectDebtById } from '../../features/debtSlice';

const validationSchema = object({
  amount: number().required('Amount is required').positive('Amount must be positive'),
  date: string().required('Date is required'),
  note: string(),
});

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  debtId: string;
}

interface FormValues {
  amount: number;
  date: string;
  note: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ open, onClose, debtId }) => {
  const dispatch = useAppDispatch();
  const debt = useAppSelector(selectDebtById(debtId));

  const initialValues: FormValues = {
    amount: debt?.minimumPayment || 0,
    date: new Date().toISOString().split('T')[0],
    note: '',
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(
            addPayment({
              debtId,
              payment: {
                amount: values.amount,
                date: values.date,
                note: values.note,
              },
            })
          );
          resetForm();
          onClose();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add Payment for {debt?.name}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="amount"
                    label="Payment Amount"
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.amount && Boolean(errors.amount)}
                    helperText={
                      (touched.amount && errors.amount) ||
                      `Minimum payment: $${debt?.minimumPayment}`
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="date"
                    label="Payment Date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="note"
                    label="Payment Note (Optional)"
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.note && Boolean(errors.note)}
                    helperText={touched.note && errors.note}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!values.amount || values.amount <= 0}
              >
                Add Payment
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PaymentForm;
