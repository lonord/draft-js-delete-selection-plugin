/// <reference types="draft-js" />
import { EditorState } from 'draft-js';
export default function createDeleteTextPlugin(): {
    handleKeyCommand: (command: string, editorState: EditorState, {setEditorState}: {
        setEditorState: any;
    }) => "handled" | "not-handled";
};
