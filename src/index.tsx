import { EditorState, Modifier, SelectionState } from 'draft-js'

export default function createDeleteTextPlugin() {
	const handleKeyCommand = (command: string, editorState: EditorState, { setEditorState }) => {
		if (command === 'backspace') {
			const selection = editorState.getSelection()
			const content = editorState.getCurrentContent()
			if (selection.getHasFocus()) {
				const startKey = selection.getStartKey()
				const startOffset = selection.getStartOffset()
				const endKey = selection.getEndKey()
				const endOffset = selection.getEndOffset()
				if (startKey !== endKey || startOffset !== endOffset) {
					const newEditorState = EditorState.push(editorState,
						Modifier.removeRange(content, selection, 'forward'),
						'remove-range')
					setEditorState(newEditorState)
					return 'handled'
				}
			}
		}
		return 'not-handled'
	}

	return {
		handleKeyCommand
	}
}
