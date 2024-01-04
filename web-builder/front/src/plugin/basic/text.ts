import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import axios from "axios";
import {api_url} from "../../consts";

export default function addText (editor: Editor) {
    const components = editor.Components


    components.addType("text", {
        model: {
            defaults: {
                traits: [
                    {
                        id: "translate",
                        type: "button",
                        label: "translate",
                        text: "번역하기"
                    },
                    {
                        id: "langValue",
                        type: "text",
                        name: "langValue",
                        noLabel: true,
                        attributes: {
                            style: 'display: none'
                        }
                    },
                ]
            },
            init() {
                const langTrait = this.addTrait({
                        id: "lang",
                        type: "select",
                        name: "lang",
                    }, {}
                )[0]
                const langValueTrait = this.getTrait("langValue")!!
                if (langValueTrait.getValue()) {
                    this.addClass("translate")
                    const options: grapesjs.SelectOption[] = []
                    JSON.parse(langValueTrait.getValue()).forEach((value: any) => {
                        this.addTrait({
                            id: value.lang, name: value.lang, attributes: {style: 'display: none'}
                        }, {})
                        options.push({id: value.lang, name: value.lang})
                    })
                    langTrait.set("options", options)
                }
            }
        },
        view: {
            onRender(options: { el: HTMLElement; model: grapesjs.Component }) {
                const {el, model} = options
                const langTrait = model.getTrait("lang")!!
                const langTraitTextTraitValue = model.getTrait(langTrait.getValue())!!.getValue()
                if (langTraitTextTraitValue)
                    el.innerHTML = langTraitTextTraitValue

                model.on('change:attributes:lang', (args) => {
                    const trait = model.getTrait(args.changed.attributes.lang)
                    if (trait) {
                        model.getEl().innerHTML = trait.getValue()
                    }
                });

                model.getTrait("translate")!!.set("command", () => {
                    axios.post(`${api_url}/translate`, {
                        "text" : model.getInnerHTML()
                    }).then(({data}) => {
                        const options: grapesjs.SelectOption[] = []
                        data.map((value: any) => {
                            model.addTrait({
                                id: value.lang, name: value.lang, attributes: {style: 'display: none'}
                            }, {})
                            model.updateTrait(value.lang, {
                                value: value.text
                            })
                            options.push({id: value.lang, name: value.lang, value: value.lang})
                            delete value.text //불필요한 번역 값이 태그에 노출되지 않도록
                        })
                        const createLangTrait = model.addTrait({
                                id: "lang",
                                type: "select",
                                name: "lang",
                            }, {}
                        )[0]
                        createLangTrait.set("options", options)
                        const jsonData = JSON.stringify(data)
                        model.getTrait("langValue")!!.set("value", jsonData)
                    })
                })
            }
        }
    })
    editor.RichTextEditor.add("font-size", {
        icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"><path d="m22 6-3-4-3 4h2v4h-2l3 4 3-4h-2V6zM9.307 4l-6 16h2.137l1.875-5h6.363l1.875 5h2.137l-6-16H9.307zm-1.239 9L10.5 6.515 12.932 13H8.068z"></path></svg>`,
        event: 'click',
        result: (rte: any, action: any) => {
            const selectRte = document.getElementById("font-size-select-rte")
            if (selectRte) {
                [].forEach.call(selectRte.children, (child: any) => {
                    child.remove()
                })
                selectRte.remove()
            } else {
                const select = document.createElement("div")
                select.id = "font-size-select-rte"
                const style = select.style
                style.position = "absolute"
                style.top = "30px"
                style.backgroundColor = "white"
                style.color = "black"
                for (let i = 8; i < 25; i++) {
                    const btn = document.createElement("button")
                    btn.className = "btn btn-light"
                    btn.innerHTML = `${i}`
                    btn.onclick = () => rte.insertHTML(`<span style="font-size: ${i}px">${rte.selection()}</span>`)
                    select.appendChild(btn)
                }
                action.btn.appendChild(select)
                rte.exec('fontSize', action.btn.firstChild.value)
            }
        }
    })
    editor.on(<"rte:enable" | "rte:disable">"rte:enable rte:disable", () => {
        const selectRte = document.getElementById("font-size-select-rte");
        if (selectRte) {
            [].forEach.call(selectRte.children, (child: any) => {
                child.remove()
            })
            selectRte.remove()
        }
    })
}