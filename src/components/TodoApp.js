import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CSSTransitionGroup } from 'react-transition-group';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './TodoApp.css';

/* Component */
export default function TodoApp({ task, tasks, inputTask, addTask, redirectToError }) {
	return (
		<div>
			<CssBaseline />
			<AppBar position="static">
			  <Toolbar>
			    <Typography variant="title" color="inherit">Todo</Typography>
              </Toolbar>
            </AppBar>
			<Input onChange={e => inputTask(e.target.value)} />
			<Button variant="raised" color='primary' onClick={_ => addTask(task)}>add</Button>
			<List>
			  <CSSTransitionGroup transitionName='example' transitionEnterTimeout={300}>
			    {
			      tasks.map((item, i) =>
			        <ListItem key={i}>
			          <ListItemText primary={`・${item}`} />
			        </ListItem>)
			    }
			  </CSSTransitionGroup>
			</List>
			<button onClick={() => redirectToError()}>Error</button>
			<Hoge />
		</div>
	);
}

const Hoge = compose(
	withStateHandlers({
		value: false
	},
	{
		changeHandle: () => v => ({value: v})
	})
	)(({value, changeHandle}) => (
      <ExpansionPanel expanded={value}>
        <ExpansionPanelSummary>
          <FormControlLabel
            control={<Switch checked={value}
            onChange={e => changeHandle(e.target.checked)} />}
            label="Expansion Panel 1"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
	));