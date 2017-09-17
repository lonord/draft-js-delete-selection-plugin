import debug from 'debug'
import { EditorState, Modifier, SelectionState } from 'draft-js'

const d = debug('draft-js-delete-selection-plugin')

export default function createDeleteTextPlugin() {
	const handleKeyCommand = (command: string, editorState: EditorState, { setEditorState }) => {
		d('command: %s', command)
		if (command === 'backspace') {
			const selection = editorState.getSelection()
			const content = editorState.getCurrentContent()
			if (selection.getHasFocus()) {
				d('has focus')
				const startKey = selection.getStartKey()
				const startOffset = selection.getStartOffset()
				const endKey = selection.getEndKey()
				const endOffset = selection.getEndOffset()
				d('start key: %s, start offset: %d, end key: %s, end offset: %d', startKey, startOffset, endKey, endOffset)
				if (startKey !== endKey || startOffset !== endOffset) {
					const newEditorState = EditorState.push(editorState,
						Modifier.removeRange(content, selection, 'forward'),
						'remove-range')
					setEditorState(newEditorState)
					d('removed range')
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
