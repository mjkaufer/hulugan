import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {data} from './data';
import { numDayDiff, commaFormat } from './helpers';


const useStyles = makeStyles({
  wrapped: {
    background: '#ccccff',
    padding: '0.5em',
    borderRadius: '0 1em 1em 0',
  },
  h1: {
    fontSize: '2em',
  },
  pic: {
    width: '12em',
  },
  num: {
    textDecoration: 'underline',
    fontWeight: 'bold',
  }
});

export function Num({n}: {n: number}) {
  const classes = useStyles();
  return (
    <span className={classes.num}>
      {commaFormat(n)}
    </span>
  )
}

export function Messages() {
  const classes = useStyles();

  const numDaysSinceMatch = numDayDiff(new Date(), new Date(data.hingeMatchDate));
  const numDaysSinceText = numDayDiff(new Date(), new Date(data.firstMessageDate));

  return (
    <section>
      <h1 className={classes.h1}>Y'all Must Really Like Each Other</h1>

      <p>You matched with Matt on Hinge <Num n={numDaysSinceMatch}/> days ago</p>
      <p>And you oh-so-graciously gave Matt your number <Num n={numDaysSinceText}/> days ago</p>

      <p>And in those <Num n={numDaysSinceText}/> days, y'all have...</p>

      <hr/>

      <p>
        📨 Sent <Num n={data.numMessages.cat + data.numMessages.matt}/> Messages
      </p>

      <p>
        <small>
        🙊 well technically <Num n={data.numNewLines.cat + data.numNewLines.matt}/> if you count line breaks as new messages 😉
        </small>
      </p>

      <p>
        😎 Used <Num n={data.numEmoji}/> Emoji
      </p>
      
    </section>
  )
}