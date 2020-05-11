import React from 'react'
import CodeEditor from './Controls/CodeEditorWithToolBar'
import SaveIcon from '@material-ui/icons/Save';
import { BuildMessageBusChannels, SendBusMessage } from './Helpers/Tools'

export const TemplateEditorChannels = BuildMessageBusChannels('TemplateEditor', ['TemplateUpdate'])

export class TemplateEditor extends React.Component {
  
  onSave = () => {
    SendBusMessage(TemplateEditorChannels.NewTemplateUpdate())
  }

  renderActions = () => {
    return [
      <SaveIcon onClick={this.onSave} />
    ]
  } 

  render () {
    const { onChange, splitSize, value } = this.props
    return <CodeEditor title='Template' onChange={onChange} value={value} splitSize={splitSize} mode='ejs' actions={this.renderActions()} />
      
  }

}
