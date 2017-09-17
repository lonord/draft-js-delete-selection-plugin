import 'normalize.css'

import { convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import * as React from 'react'
import styled from 'styled-components'

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

	state: AppState = {
		editorState: EditorState.createEmpty()
	}

	handleChange = (editorState: EditorState) => {
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
