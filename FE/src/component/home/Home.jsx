import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';



export const CustomButton = styled(Button)({
      '&:hover': {
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #000'
      }
})

