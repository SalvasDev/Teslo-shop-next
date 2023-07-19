import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';



export default function WomenPage() {

  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <>
      <ShopLayout title={'Tesla shop - Women'} pageDescription={'Encuentra los mejores productos de Teslo para damas'}>
        <Typography variant='h1' component='h1'>Damas</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para damas</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={products} />
        }

      </ShopLayout>
    </>
  )
}