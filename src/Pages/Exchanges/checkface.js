// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import Webcam from 'react-webcam';
// import load_models from "../../check_face/load_models";
// import check_face from '../../check_face/check_face';
// import { useEffect, useRef, useState, useContext } from "react";
// import { UserContext } from '../../Context/UserContext';

// const videoConstraints = {
//   width: window.innerWidth,
//   height: window.innerHeight,
//   facingMode: "user"
// }

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: window.innerWidth,
//   height: window.innerHeight,
//   bgcolor: 'background.paper',
//   border: '1px solid #000',
//   borderRadius: '5px',
//   boxShadow: 24,
//   p: 4,
// };

// export default function TransitionsModal({ open,handleClose }) {

//   const { currentUser } = useContext(UserContext);
//   const webcamRef = useRef(null);
//   const [isLoaded,setLoaded] = useState(false)
//   const [testFace,setTestFace] = useState(null)


//     useEffect(()=> {
//         load_models(currentUser.avatar).then((data)=> {
//           setLoaded(true)

//           if (data) {
//             setTestFace(data)
//           }
//         })
//       },[])
    
//       useEffect(()=> {
//         if (webcamRef && isLoaded) {
//           //Need some kind of multthreading logic or smthing
//           //Every time count changes start async process, 
//             setInterval(() => {
              
//               const screenFace = webcamRef.current.getScreenshot()
//               check_face(screenFace).then(data=>console.log(data))
//             }, 1000)

//         }
//     },[isLoaded])
    
//     console.log(isLoaded)
//     return (
//       <div>
//         <Button onClick={open}>Open modal</Button>
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           open={open}
//           onClose={handleClose}
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={open}>
//             <Box sx={style}>
//              <Webcam audio={false}
//               videoConstraints={videoConstraints}
//               ref={webcamRef}
//               height = {window.innerHeight / 1.2}
//               width = {window.innerWidth / 1.2}
//               mirrored={true}
//             />
//           <Button color="error" onClick={handleClose}>Close </Button>
//             </Box>
//           </Fade>
//         </Modal>
//       </div>
//     );
//   }