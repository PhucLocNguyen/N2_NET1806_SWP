import { useCallback, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, OutlinedInput, InputAdornment, IconButton, InputLabel, TextField } from '@mui/material'
import { useEffect } from 'react';

function InputPasswordConfirmation({label, pattern, refInput, inputCase}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirmation((show) => !show);
    const [password, setPassword] = useState("");
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [useValid, setValid] = useState({isValid: false,
        message: ""});
    const [useValidConfirmation, setValidConfirmation]= useState({isValid:false, message:""});
        function ValidateInputChange(e){
            const value = e.target.value.trim();
            console.log(value.length);
            if(e.target.name=="password"){
                setPassword(value);
                if (value.length === 0) {
                    setValid({ isValid: true, message: `${label} field can't be empty!` });
                    return;
                }
            }
            
        
            if(inputCase =="register"){
                if(e.target.name=="passwordConfirm"){
                    if(value !==password){
                        setValidConfirmation({isValid:true, message:"Confirmation password did not match the password field!"});
                    }else{
                        setValidConfirmation({isValid:false, message:""});
                    }
                }
                // Kiểm tra mật khẩu có ít nhất một chữ cái viết hoa
                if(e.target.name=="password"){
                    if (!/[A-Z]/.test(value)) {
                        setValid({ isValid: true, message: `${label} must contain at least one uppercase letter!` });
                        return;
                    }
                    
                    // Kiểm tra mật khẩu có ít nhất một chữ cái viết thường
                    if (!/[a-z]/.test(value)) {
                        setValid({ isValid: true, message: `${label} must contain at least one lowercase letter!` });
                        return;
                    }
                    
                    // Kiểm tra mật khẩu có ít nhất một chữ số
                    if (!/\d/.test(value)) {
                        setValid({ isValid: true, message: `${label} must contain at least one number!` });
                        return;
                    }
                    
                    // Kiểm tra mật khẩu có ít nhất một ký tự đặc biệt trong danh sách
                    if (!/[!@#$%^&*()]/.test(value)) {
                        setValid({ isValid: true, message: `${label} must contain at least one special character!` });
                        return;
                    }
                    
                    // Kiểm tra mật khẩu có độ dài ít nhất là 12 ký tự
                    if (value.length < 12) {
                        setValid({ isValid: true, message: `${label} must be at least 12 characters long!` });
                        return;
                    }
                }
                
            }
            setValid(true);
        }
        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
              if (timeoutId) {
                clearTimeout(timeoutId);
              }
              timeoutId = setTimeout(() => {
                func(...args);
              }, delay);
            };
          };
         const debouncedOnChange = useCallback(debounce(ValidateInputChange, 1000), [ValidateInputChange]);
       
    return (
        <>
        <FormControl sx={{ my: '8px', width: '100%' }} variant="outlined" error={useValid.isValid} >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'} 
                onChange={debouncedOnChange}
                name={label}
                
                endAdornment={
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >   
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                
                label={label}
                
            />
           {useValid.isValid ? <p className=" text-sm tracking-tighter text-left mt-[3px] mr-[14px] ml-[14px] text-[#d32f2f]" >{useValid.message}</p> : null} 
        
        </FormControl>
        <FormControl className='w-full' variant="outlined" error={useValidConfirmation.isValid}>
               <InputLabel htmlFor="outline-confirm-password">Confirm Password</InputLabel>
           <OutlinedInput
                id="outline-confirm-password"
                type={showPasswordConfirmation ? 'text' : 'password'} 
                onChange={debouncedOnChange}
                name="passwordConfirm"
                
                endAdornment={
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="toggle password confirmation visibility"
                            onClick={handleClickShowPasswordConfirm}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >   
                            {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                
                label={label}
                
            />
           {useValidConfirmation.isValid ? <p className=" text-sm tracking-tighter text-left mt-[3px] mr-[14px] ml-[14px] text-[#d32f2f]" >{useValidConfirmation.message}</p> : null}
        </FormControl>
        
        </>
    )
}

export default InputPasswordConfirmation;