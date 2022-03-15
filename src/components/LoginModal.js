import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Divider, Input } from "@material-ui/core";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: 'background.paper',
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {

    setOpen(true);
  };
  const handleLogin = (props) => {
    //console.log()
    props.preventDefault();
    const username=props.target.username.value;
    const password=props.target.password.value;
    // fetch(`http://localhost:5000/login?username=${username}&password=${password}`,{
    //     method:'POST',
        
    
    // }).then(data=>console.log(data));
    

    // const username=props.target.username.value;
    // const password=props.target.password.value;
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            user: {
                name: username,
                password: password
            }
        })
    }).then(response=>console.log(response))

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{color:'white'}}>Login</Button>
      <Modal
        open={open}
        
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >

        <Box sx={{ ...style, width: 400,borderRadius:2 , backgroundColor: '#fac60f'  }}>
            <form action='localhost:3000/login'  method='POST' onSubmit={(event)=>handleLogin(event)}>
                <Box>
                    <Input id="outlined-basic" label="User name" name='username' variant="outlined"  sx={{width:'100%'}}/>
                </Box>
               
                <Box>
                  <Input type='password' id="outlined-basic"  name='password' label="Password" variant="outlined" sx={{width:'100%'}} />
                </Box>
                
                <Button sx={{width:'100%', color: "black", fontWeight: "bold"}}  type='submit'>{"login"}</Button>
                
            </form>
        
        </Box>
      </Modal>
    </div>
  );
}
