import React from 'react'
import CodeEditor from './Controls/CodeEditorWithToolBar'
import SaveIcon from '@material-ui/icons/Save';
import { BuildMessageBusChannels, SendBusMessage } from './Helpers/Tools'

export const DataEditorChannels = BuildMessageBusChannels('DataEditor', ['DataUpdate'])

export class DataEditor extends React.Component {
  
    onSave = () => {
        SendBusMessage(DataEditorChannels.NewDataUpdate())
    }

  renderActions = () => {
    return [
      <SaveIcon onClick={this.onSave} />
    ]
  } 

  render () {
    const { onChange, splitSize, value } = this.props
    return <CodeEditor title='Data' onChange={onChange} value={value} splitSize={splitSize} mode='json' actions={this.renderActions()} />
      
  }

}