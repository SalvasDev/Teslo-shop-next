import { useContext } from 'react';
import Link from 'next/link';
import { CartContext, UiContext } from '@/context';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export const AdminNavbar = () => {

  const { toggleSideMenu } = useContext(UiContext);



  return (
    <AppBar>
      <Toolbar>
        <Link href='/' style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' >Teslo |</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>
        {/* Todo flex */}

        <Box flex={1} />

        <Button onClick={toggleSideMenu}>
          Menú
        </Button>

      </Toolbar>
    </AppBar>
  )
}