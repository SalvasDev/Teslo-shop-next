import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';



export default function MenPage() {

  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <>
      <ShopLayout title={'Tesla shop - Men'} pageDescription={'Encuentra los mejores productos de Teslo para ellos'}>
        <Typography variant='h1' component='h1'>Hombres</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellos</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={products} />
        }

      </ShopLayout>
    </>
  )
}