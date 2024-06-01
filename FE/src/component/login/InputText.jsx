import { TextField } from '@mui/material'

function InputText({ label, type ,handleChild}) {
   
    return (
        <TextField sx={{ my: '8px', width: '100%' }} type={type} id="outlined-basic" label={label} color="" variant="outlined" name={label} onChange={(e)=> handleChild(e)} />
    )
}

export default InputText