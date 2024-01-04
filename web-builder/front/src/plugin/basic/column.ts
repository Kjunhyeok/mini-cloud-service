import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {basicCategory} from "../consts";
import {PluginOptions} from "../plugin";


export default function addColumnType (editor: Editor, opts: Required<PluginOptions>) {
    const components = editor.Components
    const type = "flex-column"
    components.addType(type, {
        model: {
            defaults: {
                name: "Column",
                style: {
                    display: "flex",
                    "flex-direction": "column",
                    "justify-content": "flex-start",
                    "align-items": "stretch",
                    "flex-wrap": "nowrap",
                    "padding": "10px"
                },
                components: [
                    { type: "flex-cell" }, { type: "flex-cell" }, { type: "flex-cell" }
                ]
            }
        }
    })
    const bm = editor.BlockManager;
    bm.add(type, {
        category: basicCategory,
        label: opts.flexColumn,
        media: `<svg class="svg-width" viewBox="0 0 24 24">
        <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"/>
      </svg>`,
        content: {
            type: type,
        }
    });
}