import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import { data } from './data';
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

export function WordRanking() {
  const classes = useStyles();

  const [boring, setBoring] = useState(false);
  const toggleBoring = useCallback(() => {
    setBoring(b => !b);
  }, [setBoring])

  return (
    <section>
      <h1 className={`${classes.h1} center`}>Word on the Street</h1>

      <p className="center">What are our fav words to use? Caitlin might have some deflated numbers thanks to her typos 🙈</p>
      <div className="margin-center center">
        <div className="cute-as-a" onClick={toggleBoring}><small>Click me to {boring ? 'hide' : 'include'} the boring words</small></div>
      </div>

      <br />
      <br />

      <PerPersonRanking perPersonRawCounts={boring ? data.wordCounts : data.interestingWordCounts} key={boring ? 'boring' : 'interesting'} n={30} transformRow={_.capitalize} />
    </section>
  )
}