import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import {data} from './data';
import { PerPersonRanking } from './EmojiRanking';


const useStyles = makeStyles({
  h1: {
    fontSize: '1.5em',
  },
  center: {
    margin: '0 auto',
  },
  centerText: {
    textAlign: 'center',
  }
});

export function HashtagRanking() {
  const classes = useStyles();

  return (
    <section>
      <h1 className={`${classes.h1} center`}>My DMs are Trending!</h1>

      <p className="center">Show me your twitties! What hashtags do we use the most?</p>

      <br/>
      <br/>

      <PerPersonRanking perPersonRawCounts={data.hashtagCounts} n={5}/>
    </section>
  )
}