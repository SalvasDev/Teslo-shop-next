import { useContext, useState } from 'react';
import Link from 'next/link';
import { CartContext, UiContext } from '@/context';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
  const { asPath, push } = useRouter()
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)


  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  }


  return (
    <AppBar>
      <Toolbar>
        <Link href='/' style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' >Teslo |</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>
        {/* Todo flex */}

        <Box flex={1} />
        <Box className="fadeIn" sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>

          <Link href='/category/men'>
            <Button color={asPath === '/category/men' ? 'primary' : 'info'} >Hombres</Button>
          </Link>
          <Link href='/category/women'>
            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
          </Link>
          <Link href='/category/kids'>
            <Button color={asPath === '/category/kids' ? 'primary' : 'info'}>Niños</Button>
          </Link>
        </Box>


        <Box flex={1} />

        {/* Pantallas grandes */}
        {

          isSearchVisible
            ? (

              <Input
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                className="fadeIn"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                type='text'
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            : (
              <IconButton
                onClick={() => setIsSearchVisible(true)}
                className="fadeIn"
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <SearchOutlined />
              </IconButton>
            )
        }



        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <Link href='/cart'>
          <IconButton>
            <Badge badgeContent={numberOfItems} color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>
        <Button onClick={toggleSideMenu}>
          Menú
        </Button>

      </Toolbar>
    </AppBar>
  )
}
