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

export default function SignIn () {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise <void> => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const formData = {
      email: data.get('email'),
      password: data.get('password')
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL!}/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
          'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKEND_URL!}/`
        },
        body: JSON.stringify(formData)
      })

      if (response.status === 200) {
        const email = data.get('email') as string
        login(email)
        navigate('/')
      } else {
        console.log('Invalid login credentials')
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
            Sign in
          </Typography>
          <Box component={'form'} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin={'normal'}
              required
              fullWidth
              id={'email'}
              label={'Email Address'}
              name={'email'}
              autoComplete={'email'}
              autoFocus
            />
            <TextField
              margin={'normal'}
              required
              fullWidth
              name={'password'}
              label={'Password'}
              type={'password'}
              id={'password'}
              autoComplete={'current-password'}
            />
            <Button
              id={'signIn_button'}
              type={'submit'}
              fullWidth
              variant={'contained'}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link id={'signUp_button'} href={'/sign-up'} variant={'body2'}>
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
