import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Budget } from '../../types';

interface BudgetCardProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
  onDelete: (budgetId: string) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const progress = (budget.spent / budget.limit) * 100;
  const remaining = budget.limit - budget.spent;
  const isOverBudget = remaining < 0;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {budget.category}
          </Typography>
          <IconButton onClick={handleClick} size="small">
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {
              onEdit(budget);
              handleClose();
            }}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => {
              onDelete(budget.id);
              handleClose();
            }} sx={{ color: 'error.main' }}>
              Delete
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget
          </Typography>
          <Typography variant="h5" color={isOverBudget ? 'error.main' : 'primary'}>
            ${budget.spent.toLocaleString()}
            <Typography component="span" variant="body1" color="text.secondary">
              {' '}/ ${budget.limit.toLocaleString()}
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(progress, 100)}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                backgroundColor: isOverBudget ? 'error.main' : 
                  progress > 80 ? 'warning.main' : 'success.main',
              },
            }}
          />
        </Box>

        <Typography 
          variant="body2" 
          color={isOverBudget ? 'error.main' : 'success.main'}
          sx={{ fontWeight: 'medium' }}
        >
          {isOverBudget 
            ? `$${Math.abs(remaining).toLocaleString()} over budget` 
            : `$${remaining.toLocaleString()} remaining`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
