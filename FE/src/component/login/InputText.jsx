import { TextField } from '@mui/material'

function InputText({ label, type }) {
    return (
        <TextField sx={{ my: '8px', width: '100%' }} type={type} id="outlined-basic" label={label} variant="outlined" />
    )
}

export default InputText