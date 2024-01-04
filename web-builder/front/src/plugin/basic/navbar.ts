import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {basicCategory} from "../consts";
import {PluginOptions} from "../plugin";


export default function addNavBar (editor: Editor, opts: Required<PluginOptions>) {
    const components = editor.Components
    const type = "navbar"

    const bm = editor.BlockManager;
    bm.add(type, {
        category: basicCategory,
        label: opts.navbar,
        media: `<svg class="svg-width" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.25-1H3.25C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.25 1h17.5c.75 0 1.25-.4 1.25-1V9Zm-1 6H3V9h18v6Z"/><path d="M15 10h5v1h-5zM15 13h5v1h-5zM15 11.5h5v1h-5z"/></svg>`,
        content: {
            type: type,
            style: {
                position: "static"
            }
        }
    });
}