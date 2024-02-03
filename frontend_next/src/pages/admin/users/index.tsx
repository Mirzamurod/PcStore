import AdminSidebar from '@/components/adminSidebar'
import Title from '@/components/title'
import { DataGrid } from '@mui/x-data-grid'
import columns from '@/components/users/columns'
import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'
import { getUsers } from '@/store/admin/users'
import { encode } from 'js-base64'
import { Box } from '@mui/material'

const Users = () => {
  const dispatch = useAppDispatch()
  const { users, isLoading } = useAppSelector(state => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <AdminSidebar>
      <Title title='Users' sx={{ mb: 3 }} />
      <Box sx={{ width: '100%' }}>
        <DataGrid
          autoHeight
          pagination
          rowHeight={62}
          paginationMode='server'
          loading={isLoading}
          rows={users! || []}
          getRowId={row => encode(row._id)}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
        />
      </Box>
    </AdminSidebar>
  )
}

export default Users
