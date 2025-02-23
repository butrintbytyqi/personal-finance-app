import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  InputAdornment,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { object, string, number, boolean } from 'yup';
import { useAppDispatch } from '../../hooks/redux';
import { addDebt, updateDebt, Debt, DebtType } from '../../features/debtSlice';

const debtTypes: { value: DebtType; label: string }[] = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'personal_loan', label: 'Personal Loan' },
  { value: 'mortgage', label: 'Mortgage' },
  { value: 'student_loan', label: 'Student Loan' },
  { value: 'other', label: 'Other' },
];

const validationSchema = object({
  name: string().required('Name is required'),
  type: string().required('Type is required'),
  amount: number().required('Amount is required').positive('Amount must be positive'),
  interestRate: number()
    .required('Interest rate is required')
    .min(0, 'Interest rate must be positive')
    .max(100, 'Interest rate cannot exceed 100%'),
  minimumPayment: number().required('Minimum payment is required').positive('Minimum payment must be positive'),
  dueDate: number()
    .required('Due date is required')
    .min(1, 'Due date must be between 1 and 31')
    .max(31, 'Due date must be between 1 and 31'),
  lender: string().required('Lender is required'),
  startDate: string().required('Start date is required'),
  endDate: string().nullable(),
  notes: string(),
  autoPayEnabled: boolean(),
  reminderEnabled: boolean(),
});

interface DebtFormProps {
  open: boolean;
  onClose: () => void;
  debt?: Debt;
}

interface FormValues {
  name: string;
  type: DebtType;
  amount: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: number;
  lender: string;
  startDate: string;
  endDate: string;
  autoPayEnabled: boolean;
  reminderEnabled: boolean;
  notes: string;
}

const DebtForm: React.FC<DebtFormProps> = ({ open, onClose, debt }) => {
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    name: debt?.name || '',
    type: debt?.type || 'credit_card',
    amount: debt?.amount || 0,
    interestRate: debt?.interestRate || 0,
    minimumPayment: debt?.minimumPayment || 0,
    dueDate: debt?.dueDate || 1,
    lender: debt?.lender || '',
    startDate: debt?.startDate || new Date().toISOString().split('T')[0],
    endDate: debt?.endDate || '',
    autoPayEnabled: debt?.autoPayEnabled || false,
    reminderEnabled: debt?.reminderEnabled || false,
    notes: debt?.notes || '',
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (debt) {
            dispatch(updateDebt({ id: debt.id, ...values }));
          } else {
            dispatch(addDebt(values));
          }
          resetForm();
          onClose();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle>{debt ? 'Edit Debt' : 'Add New Debt'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Debt Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    name="type"
                    label="Debt Type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.type && Boolean(errors.type)}
                    helperText={touched.type && errors.type}
                  >
                    {debtTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="amount"
                    label="Amount"
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.amount && Boolean(errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="interestRate"
                    label="Interest Rate"
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    value={values.interestRate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.interestRate && Boolean(errors.interestRate)}
                    helperText={touched.interestRate && errors.interestRate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="minimumPayment"
                    label="Minimum Payment"
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    value={values.minimumPayment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.minimumPayment && Boolean(errors.minimumPayment)}
                    helperText={touched.minimumPayment && errors.minimumPayment}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="dueDate"
                    label="Due Date"
                    type="number"
                    InputProps={{
                      inputProps: { min: 1, max: 31 },
                    }}
                    value={values.dueDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dueDate && Boolean(errors.dueDate)}
                    helperText={touched.dueDate && errors.dueDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="lender"
                    label="Lender"
                    value={values.lender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lender && Boolean(errors.lender)}
                    helperText={touched.lender && errors.lender}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={values.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.startDate && Boolean(errors.startDate)}
                    helperText={touched.startDate && errors.startDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="endDate"
                    label="End Date (Optional)"
                    type="date"
                    value={values.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.endDate && Boolean(errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        name="autoPayEnabled"
                        checked={values.autoPayEnabled}
                        onChange={handleChange}
                      />
                    }
                    label="Enable Auto-Pay"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        name="reminderEnabled"
                        checked={values.reminderEnabled}
                        onChange={handleChange}
                      />
                    }
                    label="Enable Payment Reminders"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="notes"
                    label="Notes"
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.notes && Boolean(errors.notes)}
                    helperText={touched.notes && errors.notes}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {debt ? 'Update' : 'Add'} Debt
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DebtForm;
