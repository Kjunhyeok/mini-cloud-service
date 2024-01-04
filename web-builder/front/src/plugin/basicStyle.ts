import grapesjs from "grapesjs";


export default function addBasicStyles (editor: grapesjs.Editor) {
    const color = "#838181"
    editor.on('load', () => {
        createHtmlElem(
            'style',
            editor.Canvas.getBody(),
            {
                innerHTML: '.gjs-selected { outline: 2px solid '+color+' !important; }'
            }
        );

        createHtmlElem(
            'style',
            document.body,
            {
                innerHTML: '.gjs-resizer-h{ border-color:'+color+' !important; } .gjs-toolbar{ background-color:'+color+' !important; } .gjs-com-badge, .gjs-com-badge-red, .gjs-badge{ background-color:'+color+' !important; } .gjs-cv-canvas .gjs-highlighter, .gjs-cv-canvas .gjs-highlighter-sel{ outline: 1px solid '+color+' !important; }'
            }
        );
    })
};

function createHtmlElem(type: string, container: HTMLElement, properties: { innerHTML: string; }) {
    let elem = document.createElement(type);
    setElementProperty(elem, properties);
    container && container.appendChild(elem);
    return (elem);
}

function setElementProperty(elem: HTMLElement, properties: { [x: string]: any; innerHTML: string; }) {
    if (properties) {
        for (let key in properties) {
            elem.innerHTML = properties[key];
        }
    }
}