import { AdminLayout } from '@/components/layouts'
import { IOrder, IUser } from '@/interfaces';
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';



const pageSizeOptions = [10, 25, 50, 100, 200, 300];


const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 250 },
  { field: 'email', headerName: 'Order ID', width: 250 },
  { field: 'name', headerName: 'Nombre completo', width: 300 },
  { field: 'total', headerName: 'Monto total', width: 200 },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid
        ? (<Chip variant='outlined' label='Pagada' color='success' />)
        : (<Chip variant='outlined' label='Pendiente' color='error' />)
    },
    width: 150
  },
  { field: 'noProducts', headerName: 'No. Productos', align: 'center', width: 150 },
  {
    field: 'check',
    headerName: 'Ver orden',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
          Ver orden
        </a>
      )
    }
  },
  { field: 'createdAt', headerName: 'Creada en', width: 300 },
];


const OrdersPage = () => {

  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data && !error) return (<></>);

  const rows = data!.map(order => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title={'ordenes'}
      subTitle={'Mantenimiento de órdenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSizeOptions={pageSizeOptions}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default OrdersPage 