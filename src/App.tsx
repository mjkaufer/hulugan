import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Splash } from './Splash';
import { Messages } from './Messages';
import { Competition } from './Competition';
import { EmojiRanking } from './EmojiRanking';
import { HashtagRanking } from './HashtagRanking';
import { WordRanking } from './WordRanking';

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
    <div className={classes.container}>
      <Splash/>
      <Messages/>
      <Competition/>
      <WordRanking/>
      <HashtagRanking/>
      <EmojiRanking/>
    </div>
  )
}

export default App;
