import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Splash } from './Splash';
import { Messages } from './Messages';

enum PageState {
  Welcome = 'welcome',
  FlowChart = 'flowChart',
}

const useStyles = makeStyles({
  container: {
    maxWidth: '80vw',
    minHeight: '30vh',
    margin: '0 auto',
  }
})


function App() {
  const classes = useStyles();
  return (
    <div className={`${classes.container}`}>
      <Splash/>
      <Messages/>
    </div>
  )
}

export default App;
