import { Box, Button, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { flex: 0.1, field: 'fullname', headerName: 'Full Name' },
  { flex: 0.1, field: 'username', headerName: 'User Name' },
  { flex: 0.15, field: 'email', headerName: 'Email' },
  { flex: 0.1, field: 'mode', headerName: 'Theme Mode' },
  {
    flex: 0.1,
    field: 'createdAt',
    headerName: 'Add User',
    // minWidth: 140,
    renderCell: ({ formattedValue }: GridRenderCellParams) => (
      <Typography>{formattedValue.slice(0, 10)}</Typography>
    ),
  },
  {
    flex: 0.1,
    field: 'actions',
    headerName: 'Action',
    // minWidth: 140,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Box>
          <Button variant='outlined' color='info' sx={{ mx: 1 }}>
            Edit
          </Button>
          <Button variant='outlined' color='error' sx={{ mr: 1 }}>
            Block
          </Button>
        </Box>
      )
    },
  },
]

export default columns
