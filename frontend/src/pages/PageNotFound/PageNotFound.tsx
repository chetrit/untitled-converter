import { Box } from '@mui/system'

export const PageNotFound = () => {
  return (
    <Box sx={{
      bgcolor: 'background.default',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '100%',
      minHeight: '100%',
      color: 'text.primary'
    }}
    >
      <Box sx={{ fontSize: '200px' }}>
        404
      </Box>
      <Box sx={{ fontSize: 'h2.fontSize' }}>
        Not Found.
      </Box>
      <Box sx={{ fontSize: 'h5.fontSize', mt: 4, mb: 4 }}>
        The page you are looking for doesn&apos;t exists.
      </Box>
    </Box>
  )
}
