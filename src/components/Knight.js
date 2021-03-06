import ProgressBar from "@ramonak/react-progress-bar";
import React, {useState, useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { useContext } from "react";
import AppContext from "./AppContext";
import { TextField } from '@mui/material';
import axios from 'axios';

axios.defaults.withCredentials = true;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Knight(props) {

  
  const myContext = useContext(AppContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); let msg3 = "Delete";
  setdeleteMsg(msg3);};
  const [name, setName] = useState(props.data.name);
  const [desc, setDesc] = useState(props.data.desc);
  const [deleteMsg, setdeleteMsg] = useState("Delete");

  const [newName, setnewName] = useState(props.data.name);
  const [newDesc, setnewDesc] = useState(props.data.desc);

  

  let level = levelCalculator(props.data.expPoints)
  let knightPicture = pickKnightImg(level)
  let title = pickKnightTitle(level)
  const [knightLvl, setknightLvl] = useState(level);
  const [checkValue,setcheckValue] =useState(props.data.completedToday)
  const [knightXPTotal, setknightXPTotal] = useState(props.data.expPoints);
  const [knightTitle, setknightTitle] = useState(title);


  const [knightImg, setknightImg] = useState(knightPicture);
  function levelCalculator (exp){
    return Math.floor(exp/100)
  
  }

  function refreshKnights(){
    let url = "https://knightly-habits.herokuapp.com/";
    fetch(url, {'credentials': 'include'},) //<-- the url as a string
  // Wait for the response and convert it to json
  .then(res => res.json())
  // Take the json and do something with it
  .then(json => {
    let knightArr =mapKnights(json)
    myContext.setKnights(knightArr);
  
  }).catch(console.error);
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    axios.put('https://knightly-habits.herokuapp.com/'+props.data._id, {
        name: newName,
        desc: newDesc,
}).then((res)=>{
         console.log(res);
  
         
         handleClose()
         setName(newName)
         setDesc(newDesc)
})}

  function pickKnightImg (level){
    if(level <= 0){
      return require('../assets/Bronze.gif')
    }
    else if (level ==1){
      return  require('../assets/Black.gif')
    }
    else if (level ==2){
      return require('../assets/Mith.gif')
    }
    else if (level ==3){
      return require('../assets/Green.gif')
    }
    else if(level >= 4){
      return require('../assets/Gold.gif')
    }
    
  }
  function pickKnightTitle (level){
    if(level == 0){
      return "Bronze"
    }
    else if (level ==1){
      return "Black"
    }
    else if (level ==2){
      return "Mitheral"
    }
    else if (level ==3){
      return "Adamant"
    }
    else if (level ==4){
      return "Gold"
    }
  }

  function mapKnights(knightArr){

    let knightMap = knightArr.map((knight1,index) => {
      
     return <Knight key={index}  data={knight1}  />
    })
  return knightMap
  }
  
  let exp = props.data.expPoints
  while(exp>=100){
    exp=exp-100
  }
  const [knightShowXP, setknightShowXP] = useState(exp);


  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  };
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.6 },
        particleCount: Math.floor(100 * particleRatio)
      });
  }, []);

  const fire = useCallback(() => {

    makeShot(0.15, {
      spread: 26,
      startVelocity: 55
    });

    makeShot(0.2, {
      spread: 60
    });

    makeShot(0.2, {
      spread: 60,
      startVelocity: 55
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [makeShot]);

  function checkDelete(){
    console.log(123)
    if(deleteMsg == "Delete"){
      let msg ="Are you sure? Click again to Delete"
      setdeleteMsg(msg)
    }
    else if(deleteMsg =="Are you sure? Click again to Delete"){
      let msg2 = "Delete";
      setdeleteMsg(msg2);
      axios.delete('https://knightly-habits.herokuapp.com/'+props.data._id)
      .then((response) => {
       
        refreshKnights().then(()=>{ handleClose()})
       
    

      })
    }
  }

  function decidedFire (e){
    if(checkValue == true){
    let expNew = knightXPTotal - 25
    setknightXPTotal(expNew)
    setcheckValue(false)

    level = levelCalculator(knightXPTotal-25)
    setknightLvl(level)

    title = pickKnightTitle(level)
    setknightTitle(title)

    knightPicture = pickKnightImg(level)
    setknightImg(knightPicture)

    exp = knightXPTotal -25
    while(exp>=100){
      exp=exp-100
    }
    setknightShowXP(exp)
    let shift = knightXPTotal -25

    axios.put('https://knightly-habits.herokuapp.com/'+e.currentTarget.id, {
      
      expPoints:shift,
      completedToday:false
  
    })
    .then((response) => {
     
  console.log(response)

    })}

    else{
      let expNew = knightXPTotal + 25
      setknightXPTotal(expNew)
      setcheckValue(true)
      let oldLevel = knightLvl
      level = levelCalculator(knightXPTotal+25)

      knightPicture = pickKnightImg(level)
      setknightImg(knightPicture)

      title = pickKnightTitle(level)
      setknightTitle(title)
      
      setknightLvl(level)
      if(level>oldLevel){
        fire()
      }
      exp = knightXPTotal +25
      while(exp>=100){
        exp=exp-100
      }
      setknightShowXP(exp)
      let shift = knightXPTotal +25

      axios.put('https://knightly-habits.herokuapp.com/'+e.currentTarget.id, {
      
        expPoints:shift,
        completedToday:true
    
      })
      .then((response) => {
       
    console.log(response)
  
      })

    }
  }

  return (
    <aside className="p-2 sm:p-4 md:p-4 lg:p-6 w-5/6 sm:w-1/2 md:w-2/5 lg:w-1/4 xl:w-1/4 2xl:w-1/6 m-5 ">  
      <div  style={{ display:"flex", flexDirection:"column", justifyContent:"space-evenly"}} className="max-w-sm rounded overflow-hidden shadow-lg">
        <img  src={knightImg} />
        <div className="px-7 py-4 bg-gradient-to-tr from-purple-400 to-slate-500 ">
          <div className="font-bold text-lg mb-2">{knightTitle} Knight of {name}</div>
          <div className="text-xl mb-2" >Level: {knightLvl}</div>
          <div>EXP</div>
          <div>Total: {knightXPTotal}</div>
          <ProgressBar completed={knightShowXP} bgColor={"#0072bb"} />

          <button onClick={handleOpen} className="w-full block text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm py-2.5 text-center font-bold " type="button" data-modal-toggle="add-modal">
          Quest details
                </button>
      <Modal
        open={open}
        onClose={handleClose}
       
      >
        <Box sx={style}  >
            <div className="flex flex-col">
              <div className="flex justify-end">
            <CloseIcon style={{cursor: "pointer"}} onClick={handleClose}  />
            </div>
            <h1 className="title text-xl font-bold ">Update the {knightTitle} Knight of {name}</h1>
                <br />
        
        <img id="knightImg" src={knightImg} />
    
        <br />
        <form onSubmit={handleSubmit}>
            <div className="form-inputs flex flex-col">
              <TextField
                required
                className="form-inputs"
                id="outlined-static"
                label="Name"
                value={newName}
               
                placeholder="Habit name"
                onChange={(e) => setnewName(e.target.value)}
              />
            </div>
            <br />
            <div className="form-inputs flex flex-col">
              <TextField
                className="form-inputs"
                id="outlined-static"
                label="Description"
                value={newDesc}
                placeholder="Description"
                onChange={(e) => setnewDesc(e.target.value)}
              />
            </div>
            <br />
            <div className="flex">
         
            <button className="w-full block text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm py-2.5 text-center font-bold" type="submit">
              Update Knight
            </button>
            </div>
         
       
       </form>
       <br />
            <button onClick={checkDelete} className="w-full block text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm py-2.5 text-center font-bold" >
              {deleteMsg}
            </button>
           
          
          </div>
        </Box>
     
      </Modal>
     
          <div className="text-md mb-2">Quest Completed Today?</div>
          
          
          <input id={props.data._id} onClick={decidedFire} type="checkbox" defaultChecked={checkValue}/>
          <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </div>
      
    </div>
  </aside>
  )
}

export default Knight