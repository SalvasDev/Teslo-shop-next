import { Chip, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid"
import { ShopLayout } from '@/components/layouts'
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

const pageSizeOptions = [10, 25, 50, 100, 200, 300];


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Pagada' variant='outlined' />
          : <Chip color='error' label='No pagada' variant='outlined' />
      );
    }
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
      return (
        <Link href={`/orders/${params.row.orderId}`}>
          Ver orden
        </Link>
      )
    }

  }

];

interface Props {
  orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

  const rows = orders.map((order, idx) => ({
    id: idx + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id
  }))


  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
      <Typography variant='h1' component='h1'>Historial de órdenes</Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSizeOptions={pageSizeOptions}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=orders/history',
        permanent: false
      }
    }
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders
    }
  }
}
export default HistoryPage