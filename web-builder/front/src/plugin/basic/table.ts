import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {basicCategory} from "../consts";
import {PluginOptions} from "../plugin";


export default function addTableType (editor: Editor, opts: Required<PluginOptions>) {
    const components = editor.Components
    const type = "table"

    components.addType(type, {
        model: {
            defaults: {
                tagName: "table",
                resizable: true,
                attributes: {
                    class: "table table-striped table-hover",
                },
                components: [{type: "thead",}, {type: "tbody",}]
            }
        },
        view: {
            tagName: "table",
            events: {},
            onRender(options: { el: HTMLElement; model: grapesjs.Component }) {
                const {el, model} = options
                const btn = document.createElement('button');
                btn.innerHTML = '+';
                btn.addEventListener('click', () => {
                    const thead = model.find("thead")[0]
                    const tr = thead.find("tr")[0]
                    const ths = tr.find("th")
                    const copyTr = components.addComponent({tagName: "tr"}, {})
                    ths.forEach(() => {
                        copyTr.append(components.addComponent({tagName: "td", type: "td", content: "입력"}, {}))
                    })
                    model.find("tbody")[0].append(copyTr, {})
                });
                el.appendChild(btn);
            },
        }
    })

    components.addType("thead", {
        model: {
            defaults: {
                tagName: "thead",
                draggable: 'table',
                components:
                    {
                        type: "tr-head",
                        editable: false,
                    }
            }
        },
        view: {
            tagName: "thead",
            events: {},
        }
    })

    components.addType("tbody", {
        model: {
            defaults: {
                tagName: "tbody",
                draggable: 'table',
                components:
                    {
                        type: "tr-body",
                        editable: false,
                    }
            }
        },
        view: {
            tagName: "tbody",
            events: {},
        }
    })

    components.addType("tr-head", {
        model: {
            defaults: {
                tagName: "tr",
                draggable: 'thead',
                components: [{type: "th"}, {type: "th"}]
            }
        },
        view: {
            tagName: "tr",
            events: {},
        }
    })

    components.addType("tr-body", {
        model: {
            defaults: {
                tagName: "tr",
                draggable: 'tbody',
                components: [{type: "td"}, {type: "td"}]
            }
        },
        view: {
            tagName: "tr",
            events: {},
        }
    })

    components.addType("th", {
        model: {
            defaults: {
                droppable: false,
                draggable: 'thead tr',
                resizable: true,
                tagName: "th",
                components: {
                    type: "text",
                    draggable: false,
                    copyable: false,
                    removable: false,
                    content: "제목"
                }
            }
        }
    })

    components.addType("td", {
        model: {
            defaults: {
                droppable: false,
                draggable: 'tbody tr',
                tagName: "td",
                components: {
                    type: "text",
                    draggable: false,
                    copyable: false,
                    removable: false,
                    content: "입력"
                }
            },
        }
    })
    const bm = editor.BlockManager;

    bm.add(type, {
        category: basicCategory,
        label: opts.table,
        media: `<svg class="svg-width" viewBox="0 0 24 24"><path d="M19 7H9c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 2v2H9V9h10zm-6 6v-2h2v2h-2zm2 2v2h-2v-2h2zm-4-2H9v-2h2v2zm6-2h2v2h-2v-2zm-8 4h2v2H9v-2zm8 2v-2h2v2h-2zM6 17H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v1h-2V5H5v10h1v2z"></path></svg>`,
        content: {
            type: type,
        }
    });
}