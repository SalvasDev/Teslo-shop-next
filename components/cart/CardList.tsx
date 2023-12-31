import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { ItemCounter } from "../ui"
import { FC, useContext } from "react";
import { CartContext } from "@/context";
import { ICartProduct, IOrderItem } from "@/interfaces";


interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}


export const CardList: FC<Props> = ({ editable = false, products }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

  const onNewCartQuantityValue = (product: ICartProduct, mewQuantityValue: number) => {
    product.quantity = mewQuantityValue;
    updateCartQuantity(product)
  }

  const productsToShow = products ? products : cart;

  return (
    <>
      {
        productsToShow.map(product => (
          <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              {/* LLevar a la página del producto */}
              <Link href={`product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia
                    image={product.image}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                {/* Condicional */}
                {
                  editable
                    ? <ItemCounter
                      currentValue={product.quantity}
                      maxValue={10}
                      updateQuantity={(value) => onNewCartQuantityValue(product as ICartProduct, value)}
                    />
                    : <Typography variant="h5">{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                }
              </Box>

            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography>{`$${product.price}`}</Typography>
              {
                editable &&
                <Button
                  onClick={() => removeCartProduct(product as ICartProduct)}
                  variant='text' color="secondary">
                  Remover
                </Button>
              }

            </Grid>
          </Grid>
        )
        )
      }
    </>
  )
}
