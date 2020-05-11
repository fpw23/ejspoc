/* eslint-disable import/first */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import { componentGetCompareProps } from '../Helpers/Tools'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-ejs'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-github'

export class CodeEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      containerHeight: 0,
      containerWidth: 0
    }
  }

  wrapperDiv = null
  editor = null

  componentDidMount () {
    this.updateDimensions()
  }

  componentDidUpdate (prevProps, prevState) {
    const splitSize = componentGetCompareProps('splitSize', this.props, prevProps, 0)

    if (splitSize.HasChanged) {
      this.updateDimensions()
    }
  }

  updateDimensions () {
    if (this.wrapperDiv) {
      const rect = this.wrapperDiv.getBoundingClientRect()
      this.setState({
        containerHeight: rect.height,
        containerWidth: rect.width
      })
    }
  }

  render () {
    const { containerHeight = 0, containerWidth = 0 } = this.state
    const { className, mode = 'javascript', ...rest } = this.props
    return <div className={className} ref={(c) => { this.wrapperDiv = c }}>
      <AceEditor
        {...rest}
        ref={(r) => { this.editor = r }}
        height={`${containerHeight}px`}
        width={`${containerWidth}px`}
        theme='github'
        mode={mode}
        enableBasicAutocompletion
      />
    </div>
  }
}
