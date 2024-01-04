import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {basicCategory} from "../consts";
import {PluginOptions} from "../plugin";


export default function addCellType (editor: Editor, opts: Required<PluginOptions>) {
    const components = editor.Components
    const type = "flex-cell"
    components.addType(type, {
        model: {
            defaults: {
                resizable: true,
                name: "Cell",
                style: {
                    flex: "auto",
                    "min-height": "75px",
                    "flex-grow": "1",
                    "flex-basis": "100%"
                }
            },
        }
    })
    const bm = editor.BlockManager;
    bm.add(type, {
        category: basicCategory,
        label: opts.cell,
        media: `<svg class="svg-width" viewBox="0 0 24 24"><path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"/></svg>`,
        content: {
            type: type
        }
    });
}