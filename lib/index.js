"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var draft_js_1 = require("draft-js");
var d = debug_1.default('draft-js-delete-selection-plugin');
function createDeleteTextPlugin() {
    var handleKeyCommand = function (command, editorState, _a) {
        var setEditorState = _a.setEditorState;
        d('command: %s', command);
        if (command === 'backspace') {
            var selection = editorState.getSelection();
            var content = editorState.getCurrentContent();
            if (selection.getHasFocus()) {
                d('has focus');
                var startKey = selection.getStartKey();
                var startOffset = selection.getStartOffset();
                var endKey = selection.getEndKey();
                var endOffset = selection.getEndOffset();
                d('start key: %s, start offset: %d, end key: %s, end offset: %d', startKey, startOffset, endKey, endOffset);
                if (startKey !== endKey || startOffset !== endOffset) {
                    var newEditorState = draft_js_1.EditorState.push(editorState, draft_js_1.Modifier.removeRange(content, selection, 'forward'), 'remove-range');
                    setEditorState(newEditorState);
                    d('removed range');
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
