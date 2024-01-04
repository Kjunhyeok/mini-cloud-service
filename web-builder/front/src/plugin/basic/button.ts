import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {basicCategory} from "../consts";
import {PluginOptions} from "../plugin";


export default function addButtonType(editor: Editor, opts: Required<PluginOptions>) {
    const components = editor.Components
    const type = "button"

    components.addType(type, {
        model: {
            defaults: {
                tagName: "a",
                resizable: true,
                attributes: {
                    class: "btn btn-primary",
                    variant: "btn-primary",
                    role: "button",
                    href: "#",
                },
                traits: ["href", "target",
                    {
                        type: "select",
                        label: "variant",
                        name: "variant",
                        options: [
                            { id: "btn-primary", name: "primary", "selected": true },
                            { id: "btn-secondary", name: "secondary" },
                            { id: "btn-success", name: "success" },
                            { id: "btn-warning", name: "warning" },
                            { id: "btn-danger", name: "danger" },
                            { id: "btn-info", name: "info" },
                            { id: "btn-light", name: "light" },
                            { id: "btn-dark", name: "dark" },
                            { id: "btn-link", name: "link" },
                            { id: "btn-outline-primary", name: "outline-primary" },
                            { id: "btn-outline-secondary", name: "outline-secondary" },
                            { id: "btn-outline-success", name: "outline-success" },
                            { id: "btn-outline-warning", name: "outline-warning" },
                            { id: "btn-outline-danger", name: "outline-danger" },
                            { id: "btn-outline-info", name: "outline-info" },
                            { id: "btn-outline-light", name: "outline-light" },
                            { id: "btn-outline-dark", name: "outline-dark" },
                        ]
                    }
                ],
                components: {
                    type: "text",
                    draggable: false,
                    copyable: false,
                    removable: false,
                    content: "버튼"
                }
            },
            init() {
                this.on('change:attributes:variant', (args) => {
                    this.setClass(["btn", args.changed.attributes.variant])
                });
            },
        },
        view: {
            tagName: "button",
            events: {},
        }
    })
    const bm = editor.BlockManager;
    bm.add(type, {
        category: basicCategory,
        label: opts.button,
        media: `<svg class="svg-width" viewBox="0 0 24 24"><path d="M22 9v6c0 1.1-.9 2-2 2h-1v-2h1V9H4v6h6v2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-7.5 10 1.09-2.41L18 15.5l-2.41-1.09L14.5 12l-1.09 2.41L11 15.5l2.41 1.09L14.5 19zm2.5-5 .62-1.38L19 12l-1.38-.62L17 10l-.62 1.38L15 12l1.38.62L17 14zm-2.5 5 1.09-2.41L18 15.5l-2.41-1.09L14.5 12l-1.09 2.41L11 15.5l2.41 1.09L14.5 19zm2.5-5 .62-1.38L19 12l-1.38-.62L17 10l-.62 1.38L15 12l1.38.62L17 14z"></path></svg>`,
        content: {
            type: type
        }
    });
}