import 'babel-polyfill'

import 'normalize.css'

import debug from 'debug'
import { ContentState, convertFromHTML, convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import * as React from 'react'
import styled from 'styled-components'

declare var process
process.env.NODE_ENV !== 'production' && debug.enable('*')

const d = debug('draft-js-delete-selection-plugin')

import createDeleteTextPlugin from '../src/'

// tslint:disable-next-line:variable-name
const Main = styled.div`
	margin: 30px;
`

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
	padding: 10px;
	border: 1px solid #eee;
`

// tslint:disable-next-line:variable-name
const Button = styled.button`
	outline: none;
	border: 1px solid #ddd;
    border-radius: 4px;
    padding: 2px 10px;
    background: #fff;
	cursor: pointer;
	font-size: 14px;
	margin-top: 10px;

    &:hover {
		opacity: 0.6;
    }
`

const deleteTextPlugin = createDeleteTextPlugin()

interface AppState {
	editorState: EditorState
}

class App extends React.Component<any, AppState> {

	selection: SelectionState

	state: AppState = {
		editorState: createEditorState()
	}

	handleChange = (editorState: EditorState) => {
		const sel = editorState.getSelection()
		if (!this.selection || !(this.selection.getStartKey() === sel.getStartKey()
			&& this.selection.getStartOffset() === sel.getStartOffset()
			&& this.selection.getEndKey() === sel.getEndKey()
			&& this.selection.getEndOffset() === sel.getEndOffset())) {
			d('select changed -> start key: %s, start offset: %d, end key: %s, end offset: %d',
				sel.getStartKey(), sel.getStartOffset(),
				sel.getEndKey(), sel.getEndOffset())
		}
		this.selection = sel
		this.setState({
			editorState
		})
	}

	handleLogState = () => {
		console.log(convertToRaw(this.state.editorState.getCurrentContent()))
	}

	render() {
		return (
			<Main>
				<Wrapper>
					<Editor
						plugins={[deleteTextPlugin]}
						editorState={this.state.editorState}
						onChange={this.handleChange} />
				</Wrapper>
				<Button onClick={this.handleLogState}>Log State</Button>
			</Main>
		)
	}
}

export default App

const HTML_CONTENT = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
	'<a href="http://www.baidu.com">Example link</a>'

function createEditorState() {
	const blocksFromHTML = convertFromHTML(HTML_CONTENT)
	const state = ContentState.createFromBlockArray(
		blocksFromHTML.contentBlocks,
		blocksFromHTML.entityMap
	)
	return EditorState.createWithContent(state)
}
