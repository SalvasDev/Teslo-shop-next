import { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


  return (
    <>
      <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Typography variant='h1' component='h1'>Buscar productos</Typography>
        {
          foundProducts
            ? <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Término:{query}</Typography>
            : (
              <Box display='flex'>
                <Typography variant='h2' sx={{ mb: 1 }}>No encontramos productos </Typography>
                <Typography variant='h2' sx={{ ml: 1 }} color='secondary' textTransform="capitalize">{query}</Typography>

              </Box>

            )
        }

        <ProductList products={products} />

      </ShopLayout>
    </>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { query = '' } = params as { query: string }

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }


  let products = await dbProducts.getProductsByTerm(query)
  const foundProducts = products.length > 0


  //TODO retaornar otros productos
  if (!foundProducts) {
    products = await dbProducts.getProductsByTerm('shirts')

  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}


export default SearchPage