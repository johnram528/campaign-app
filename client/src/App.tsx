import React from 'react';
import { theme, ThemeProvider } from '@chakra-ui/core'
import './App.css';
import CreateCampaign from './components/pages/Create';
import { Route, Routes } from 'react-router';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <div className={'container'}>
        <Routes>
          <Route path="/" element={<CreateCampaign />} />
          {/* <Route path={"/campaign/:campaignId"} element={<campaign />}/>
          <Route path={"/edit/:campaignId"} element={<Edit />}/>
          <Route path={"/create"} element={<Create />} /> */}
        </Routes>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
