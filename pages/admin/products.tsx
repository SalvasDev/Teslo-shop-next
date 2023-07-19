import Link from 'next/link';
import { AdminLayout } from '@/components/layouts'
import { IProduct } from '@/interfaces';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material'
import { Box, Button, CardMedia, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';



const pageSizeOptions = [10, 25, 50, 100, 200, 300];


const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia
            component='img'
            alt={row.title}
            className="fadeIn"
            image={row.img}
          />
        </a>
      )
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Link href={`/admin/products/${row.slug}`}>
          {row.title}
        </Link>
      )
    }
  },
  { field: 'gender', headerName: 'Género' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'inStock', headerName: 'Inventario' },
  { field: 'price', headerName: 'Precio' },
  { field: 'sizes', headerName: 'Tallas', width: 250 },
];


const ProductsPage = () => {

  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) return (<></>);

  const row = data!.map(product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Productos(${data?.length})`}
      subTitle={'Mantenimiento de productos'}
      icon={<CategoryOutlined />}
    >
      <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color='secondary'
          href='/admin/products/new'
        >
          Crear producto
        </Button>
      </Box>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={row}
            pageSizeOptions={pageSizeOptions}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default ProductsPage;