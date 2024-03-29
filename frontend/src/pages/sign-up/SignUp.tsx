import * as React from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'components/AuthContext'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function SignUp () {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const formData = {
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      bornDate: '01/01/2001'
    }

    try {
      console.log('Sending data to backend', formData)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL!}/account/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
          'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKEND_URL!}/`
        },
        body: JSON.stringify(formData)
      })

      if (response.status === 201) {
        const email = data.get('email') as string
        login(email)
        navigate('/')
        console.log('Account created successfully')
      } else {
        console.log('Error creating account')
      }
    } catch (error) {
      console.error('There was an error!', error)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={'main'} maxWidth={'xs'}>
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component={'h1'} variant={'h5'}>
            Sign up
          </Typography>
          <Box component={'form'} noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete={'given-name'}
                  name={'firstName'}
                  required
                  fullWidth
                  id={'firstName'}
                  label={'First Name'}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id={'lastName'}
                  label={'Last Name'}
                  name={'lastName'}
                  autoComplete={'family-name'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id={'bornDate'}
                  label={'Born Date'}
                  name={'bornDate'}
                  type={'date'}
                  defaultValue={'01/01/2001'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id={'email'}
                  label={'Email Address'}
                  name={'email'}
                  autoComplete={'email'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={'password'}
                  label={'Password'}
                  type={'password'}
                  id={'password'}
                  autoComplete={'new-password'}
                />
              </Grid>

            </Grid>
            <Button
              id={'signUp_button'}
              type={'submit'}
              fullWidth
              variant={'contained'}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent={'flex-end'}>
              <Grid item>
                <Link href={'/sign-in'} variant={'body2'}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
