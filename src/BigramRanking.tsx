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

export function BigramRanking() {
  const classes = useStyles();

  
  return (
    <section>
      <h1 className={`${classes.h1} center`}>Phrasing!</h1>

      <p className="center">Let's see if we have any catch phrases!</p>


      <h3 className="center">Two-Word Phrases</h3>
      <PerPersonRanking perPersonRawCounts={data.bigramCounts} n={10} transformRow={_.capitalize} />

      <h3 className="center">Three-Word Phrases</h3>
      <PerPersonRanking perPersonRawCounts={data.trigramCounts} n={10} transformRow={_.capitalize} />
    </section>
  )
}