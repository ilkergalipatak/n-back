import React, { useState, useEffect } from 'react';
import './App.css';

import { Route, Router, Routes } from 'react-router-dom';
import StartGame from './StartGame';
import Game from './Game';
import GameOver from './GameOver';
import Analysis from './Analys';
import { ChakraProvider } from '@chakra-ui/react';


function App() {


  return (
    <ChakraProvider> <Routes>
      <Route exact path='/' element={<StartGame />} />
      <Route path='/game' element={<Game />} />
      <Route path='/endgame' element={<GameOver />} />
      <Route path='/analysis' element={<Analysis />} />
    </Routes>
    </ChakraProvider>
  );
}

export default App;
