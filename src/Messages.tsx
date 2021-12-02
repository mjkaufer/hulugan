import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {data} from './data';
import { numDayDiff, commaFormat } from './helpers';


const useStyles = makeStyles({
  h1: {
    fontSize: '2em',
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
    <section className="center">
      <h1 className={classes.h1}>Y'all Must Really Like Each Other</h1>

      <p>You matched with Matt on Hinge <Num n={numDaysSinceMatch}/> days ago</p>
      <p>And you oh-so-graciously gave Matt your number <Num n={numDaysSinceText}/> days ago</p>

      <p>In those <Num n={numDaysSinceText}/> short days, y'all have...</p>

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
        🔡 Typed <Num n={data.numWords.matt + data.numWords.cat}/> Words
      </p>

      <p>
        😎 Used <Num n={data.numEmoji.matt + data.numEmoji.cat}/> Emoji
      </p>

      <p>❤️ And made each other laugh innumerable times</p>
      
    </section>
  )
}