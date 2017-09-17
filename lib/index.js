"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var draft_js_1 = require("draft-js");
function createDeleteTextPlugin() {
    var handleKeyCommand = function (command, editorState, _a) {
        var setEditorState = _a.setEditorState;
        if (command === 'backspace') {
            var selection = editorState.getSelection();
            var content = editorState.getCurrentContent();
            if (selection.getHasFocus()) {
                var startKey = selection.getStartKey();
                var startOffset = selection.getStartOffset();
                var endKey = selection.getEndKey();
                var endOffset = selection.getEndOffset();
                if (startKey !== endKey || startOffset !== endOffset) {
                    var newEditorState = draft_js_1.EditorState.push(editorState, draft_js_1.Modifier.removeRange(content, selection, 'forward'), 'remove-range');
                    setEditorState(newEditorState);
                    return 'handled';
                }
            }
        }
        return 'not-handled';
    };
    return {
        handleKeyCommand: handleKeyCommand
    };
}
exports.default = createDeleteTextPlugin;
