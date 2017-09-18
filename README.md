# draft-js-delete-selection-plugin
A plugin for draft-js-plugins-editor to delete selection content.

By this plugin, you can delete selected text by press `backspace`.

## Usage

Install via npm:

```bash
$ npm i draft-js-delete-selection-plugin
```

And use in your project:

```js
import createDeleteSelectionPlugin from 'draft-js-delete-selection-plugin';

const deleteSelectionPlugin = createDeleteSelectionPlugin();
```

## License
MIT