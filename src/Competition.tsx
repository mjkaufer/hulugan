import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import {data} from './data';
import { sortPersonData } from './helpers';
import { Num } from './Messages';
import { IPerPersonData } from './dataTypes';


const useStyles = makeStyles({
  h1: {
    fontSize: '1.5em',
  },
  smaller: {
    fontSize: '0.8em',
  },
  spacedDivs: {
    '&>div': {
      paddingBottom: '0.5em',
    },
    '&>div>p': {
      margin: 0,
    },
  },
  spoiler: {
    color: 'transparent',
    textShadow: '0 0 1em #000',

    '&:not(:hover) .caitlin, &:not(:hover) .matt': {
      color: 'transparent',
    },
    '&:hover': {
      color: '#000',
      textShadow: 'none',
    }
  }
});

interface ISpoilerProps {
  data: IPerPersonData<number>;
  winWord: string;
  loseWord: string;
  noun: string;
}

function Spoiler({
  data,
  winWord,
  loseWord,
  noun,
}: ISpoilerProps) {
  const classes = useStyles();
  const sortedData = sortPersonData(data);

  return (
    <div className={classes.spoiler}>
    <p className={classes.smaller}>
      <span className={sortedData.greater.name}>
        <b>{_.startCase(sortedData.greater.name)}</b>
      </span> {winWord} with a total of <Num n={sortedData.greater.value}/>, while{' '}

      <span className={sortedData.lesser.name}>
        <b>{_.startCase(sortedData.lesser.name)}</b>
      </span> {loseWord}, with only <Num n={sortedData.lesser.value}/> {noun}
    </p>
    </div>
  )
}


export function Competition() {
  const classes = useStyles();

  return (
    <section className={classes.spacedDivs}>
      <h1 className={`${classes.h1} center`}>I'm overly competitive about...</h1>


      <div>
        <p><b>📨 The number of messages I send...</b></p>
        <Spoiler data={data.numMessages} winWord='wins' loseWord={'prefers to communicate via hugs instead'} noun='messages'/>
      </div>

      <div>
        <p><b>⌨️ How many topics I answer in one text...</b></p>
        <Spoiler data={data.numNewLines} winWord='is the master of the enter key' loseWord={'knows how to write succinct texts'} noun='newlines'/>
      </div>

      <div>
        <p><b>🔡 How many words I type...</b></p>
        <Spoiler data={data.numWords} winWord='is a word wizard' loseWord={'keeps things short and sweet'} noun='words sent'/>
      </div>

      <div>
        <p><b>😎 My emoji game...</b></p>
        <Spoiler data={data.numEmoji} winWord='is the emoji bows' loseWord={'prefers the written word'} noun='emoji'/>
      </div>

      <div>
        <p><b>🐦 How trending my messages are...</b></p>
        <Spoiler data={data.numHashtags} winWord='is the titan of twitter' loseWord={'must lurk on FB instead'} noun='hashtags sent'/>
      </div>
    </section>
  )
}