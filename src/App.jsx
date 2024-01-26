import React, { useEffect, useState } from 'react'
import './App.css'
import EnterRoom from './components/EnterRoom'
import ChatScreen from './components/ChatScreen';

const App = () => {

  const [roomcreated,setRoomCreated] = useState(false);
  const [room,setRoom] = useState("asd");


  return (
    <main>
      <nav>
        <h1 className='logo'><span>En</span>chated</h1>
        <div className="options">
          <p>about us</p>
          <p>How it works</p>
        </div>
      </nav>

      <div className="container">
          {/* {!roomcreated && (<EnterRoom cb={setRoomCreated} rm={setRoom}/>)} */}
          {/* {roomcreated && (<ChatScreen room={room}/>)}
           */}
          <ChatScreen/>
      </div>
    </main>
  )
}

export default App