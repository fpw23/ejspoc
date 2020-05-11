import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SplitPane from 'react-split-pane'
import { render } from 'ejs'
import { WithMessageBus } from './Helpers/Tools'
import { OutputViewer } from './OutputViewer'
import { TemplateEditor, TemplateEditorChannels } from './TemplateEditor'
import { DataEditor, DataEditorChannels } from './DataEditor'

import './SplitPane.css'

const styles = (theme) => ({
  root: {
    display: 'grid',
    height: '100vh',
    width: '100vw',
    gridTemplateRows: 'max-content 1fr',
    gridAutoColumns: '1fr',
    gridTemplateAreas: '"topBar" "body"',
    position: 'relative',
    boxSizing: 'border-box'
  },
  topBar: {
    gridArea: 'topBar',
    position: 'relative'
  },
  body: {
    gridArea: 'body',
    position: 'relative'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
})



export class AppPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Template: `<div>
          <ul>
              <% People.forEach(function(person) { %>
                  <li><%= person %></li>
              <% }) %>
          </ul>
      </div>`,
      Data: `{
        "People": [
            "Jane",
            "John",
            "Hank"
        ]
      }`  ,
      VSplit: 0,
      HSplit: 0,
      Output: ''
    }
  }

  onNewMessage = (message) => {
    // eslint-disable-next-line default-case
    switch (message.Name) {
      case DataEditorChannels.DataUpdate:
      case TemplateEditorChannels.TemplateUpdate:
        this.updateOuptputPreview()
        break
    }
  }

  updateOuptputPreview = () => {
    try {
      const { Data, Template } = this.state
      const JSONData = JSON.parse(Data)
      const newOutput = render(Template, JSONData)
      this.setState({
        Output: newOutput
      })
    } catch (err) {
      this.setState({
        Output: `Error: ${err.message}`
      })
    }
  }

  onSplitResize = (name, newSize) => {
    this.setState({
      [`${name}Split`]: newSize || 0
    })
  }

  render () {
    const { classes } = this.props
    const { Template, VSplit = 0, HSplit = 0, Data, Output } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.topBar}>
          <AppBar position='relative'>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                (EJS) React Embedded JavaScipt Templates Designer Demo
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.body}>
          <SplitPane split="vertical" onDragFinished={this.onSplitResize.bind(this, 'V')} minSize={'100px'} defaultSize={'50%'}>
            <OutputViewer html={Output} />
            <SplitPane split="horizontal" onDragFinished={this.onSplitResize.bind(this, 'H')} minSize={'100px'} defaultSize={'50%'}>
              <TemplateEditor value={Template} splitSize={VSplit + HSplit} onChange={(val) => { this.setState({ Template: val })}} />
              <DataEditor value={Data} splitSize={VSplit + HSplit} onChange={(val) => { this.setState({ Data: val })}} />
            </SplitPane>
          </SplitPane>
        </div>
      </div>
    )
  }
}

export const App = compose(
  withStyles(styles),
  WithMessageBus({
    channels: [
      DataEditorChannels.DataUpdate,
      TemplateEditorChannels.TemplateUpdate
    ]
  })
)(AppPlain)

export default App;
