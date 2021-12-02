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

function EmojiRankingCol({rawEmojiCounts}: {rawEmojiCounts: Record<string, number>}) {
  const emojiCounts = useMemo(() => {
    return getSortedFreqMap(rawEmojiCounts)
  }, [rawEmojiCounts])

  return (
    <div>
      <ol>
        {
          emojiCounts.map((emojiCount, index) => (
            <li key={index}>{emojiCount.value} <small>(<Num n={emojiCount.count}/> uses)</small></li>
          ))
        }
      </ol>
    </div>
  )
}

export function EmojiRanking() {
  const classes = useStyles();

  return (
    <section>
      <h1 className={`${classes.h1} center`}>Emoji Check!</h1>

      <div className="center">

        <p>Last but not least – let's see what our fav emoji are</p>
        <p><small>(and why they aren't 👶👸)</small></p>
      </div>
      
      

      <br/>
      <br/>

      <div className='flexseal'>
        <div className={classes.center}>
          <h3 className={`matt center ${classes.center}`}>Matt</h3>
          <EmojiRankingCol rawEmojiCounts={data.emojiCounts.matt}/>
        </div>
        <div className={classes.center}>
          <h3 className={`caitlin center ${classes.center}`}>Caitlin</h3>
          <EmojiRankingCol rawEmojiCounts={data.emojiCounts.cat}/>
        </div>
      </div>

    </section>
  )
}