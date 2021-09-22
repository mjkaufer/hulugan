import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Welcome from './Welcome';
import FlowChart from './FlowChart';

enum PageState {
  Welcome = 'welcome',
  FlowChart = 'flowChart',
}

const useStyles = makeStyles({
  container: {
    maxWidth: '80vw',
    minHeight: '30vh',
    margin: '2em auto',
    background: 'linear-gradient(to right, #ece9e6, #ffffff)',
    padding: '1em',
    borderRadius: '2em',
    textAlign: 'center',
    boxShadow: '0em 0em 2em 0.0625em #fff;'
  }
})


function AppHelper() {
  const [pageState, setPageState] = useState<PageState>(PageState.Welcome)
  const openFlowChart = useCallback(() => {
    setPageState(PageState.FlowChart)
  }, [setPageState]);

  if (pageState === PageState.Welcome) {
    return <Welcome onClick={openFlowChart}/>;
  }

  if (pageState === PageState.FlowChart) {
    return <FlowChart/>
  }

  return null;
}

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <AppHelper/>
    </div>
  )
}

export default App;
