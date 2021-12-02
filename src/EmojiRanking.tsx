import React, { useMemo } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import {data} from './data';
import { getSortedFreqMap, sortPersonData } from './helpers';
import { Num } from './Messages';
import { IPerPersonData } from './dataTypes';


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

interface IRankingColProps {
  rawCounts: Record<string, number>;
  n?: number;
  transformRow?: (w: string) => string;
};
function RankingCol({rawCounts, n = 10, transformRow = _.identity}: IRankingColProps) {
  const emojiCounts = useMemo(() => {
    return getSortedFreqMap(rawCounts, n)
  }, [rawCounts])

  return (
    <div>
      <ol>
        {
          emojiCounts.map((emojiCount, index) => (
            <li key={index}>{transformRow(emojiCount.value)} <small>(<Num n={emojiCount.count}/> uses)</small></li>
          ))
        }
      </ol>
    </div>
  )
}

interface IPerPersonRankingProps {
  perPersonRawCounts: IPerPersonData<Record<string, number>>;
  n?: number;
  transformRow?: (w: string) => string;
}

export function PerPersonRanking({perPersonRawCounts, n, transformRow}: IPerPersonRankingProps) {
  const classes = useStyles();
  return (
      <div className='flexseal'>
        <div className={classes.center}>
          <h3 className={`matt center ${classes.center}`}>Matt</h3>
          <RankingCol rawCounts={perPersonRawCounts.matt} n={n} transformRow={transformRow}/>
        </div>
        <div className={classes.center}>
          <h3 className={`caitlin center ${classes.center}`}>Caitlin</h3>
          <RankingCol rawCounts={perPersonRawCounts.cat} n={n} transformRow={transformRow}/>
        </div>
      </div>

  )
}

export function EmojiRanking() {
  const classes = useStyles();

  return (
    <section>
      <h1 className={`${classes.h1} center`}>Emoji Check!</h1>

      <div className="center">

        <p>Last but not least – let's see what our fav emoji are 🕵️</p>
        <p><small>(and why they aren't 👶👸)</small></p>
      </div>
      
      

      <br/>
      <br/>

      <PerPersonRanking perPersonRawCounts={data.emojiCounts}/>

    </section>
  )
}