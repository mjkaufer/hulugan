import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {data} from './data';

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
  }
});

export function Splash() {
  const classes = useStyles();
  return (
    <section className="center">
      <h1 className={classes.h1}>Cat &amp; Matt</h1>
      <h2>2021 <span className={`${classes.wrapped} wrapped`}>Wrapped</span></h2>
      <h6>Sponsored by Trojan</h6>
      <br/>
      <img className={classes.pic} src="./splash.png"/>
      <br/>
      <p>Scroll down to learn about our year!</p>
    </section>
  )
}