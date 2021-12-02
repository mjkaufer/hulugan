import React, { useMemo } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import {data} from './data';
import { getSortedFreqMap, sortPersonData } from './helpers';
import { Num } from './Messages';


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

function EmojiRankingCol({rawHashtagCounts}: {rawHashtagCounts: Record<string, number>}) {
  const hashtagCounts = useMemo(() => {
    return getSortedFreqMap(rawHashtagCounts, 5)
  }, [rawHashtagCounts])

  return (
    <div>
      <ol>
        {
          hashtagCounts.map((hashtagCount, index) => (
            <li key={index}>{hashtagCount.value} <small>(<Num n={hashtagCount.count}/> uses)</small></li>
          ))
        }
      </ol>
    </div>
  )
}

export function HashtagRanking() {
  const classes = useStyles();

  return (
    <section>
      <h1 className={`${classes.h1} center`}>My DMs are Trending!</h1>

      <p className="center">Show me your twitties! What hashtags do we use the most?</p>

      <br/>
      <br/>

      <div className='flexseal'>
        <div className={classes.center}>
          <h3 className={`matt center ${classes.center}`}>Matt</h3>
          <EmojiRankingCol rawHashtagCounts={data.hashtagCounts.matt}/>
        </div>
        <div className={classes.center}>
          <h3 className={`caitlin center ${classes.center}`}>Caitlin</h3>
          <EmojiRankingCol rawHashtagCounts={data.hashtagCounts.cat}/>
        </div>
      </div>

    </section>
  )
}