import { useContext, useState } from "react";
import Link from "next/link"
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material"
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { validations } from "@/utils";

import { AuthLayout } from "@/components/layouts"
import { useRouter } from "next/router";
import { AuthContext } from "@/context";

type FormData = {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {

  const router = useRouter();
  const { registerUser } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')



  const onRegisterForm = async ({ name, email, password }: FormData) => {
    // setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);
    if (hasError) {
      setShowError(true);
      setErrorMessage(message!)
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // try {
    //   const { data } = await tesloApi.post('/user/register', { name, email, password });
    //   const { token, user } = data;
    //   console.log({ token, user });


    // } catch (error) {
    //   console.log('Error en las credenciales');
    // }


    //TODO: Navegar a la pantalla en la que estaba el usuario
    //   const destination = router.query.p?.toString() || '/';
    //   router.replace(destination);
    await signIn('credentials', { email, password });
  }

  return (
    <AuthLayout title={"Registro"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>

        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component='h1'>Crear cuenta</Typography>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color='error'
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                label='Nombre completo'
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant="filled"
                fullWidth
                {
                ...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='password'
                label='Contraseña'
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color='secondary'
                className="circular-btn"
                size='large'
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <Link href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}>
                ¿Ya tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });

  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default RegisterPage