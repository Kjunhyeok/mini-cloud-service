import type grapesjs from 'grapesjs';
import { PluginOptions } from './plugin';

import openImport from './openImport';
import openTemplate from './openTemplate';
import {
    cmdImport,
    cmdDeviceDesktop,
    cmdDeviceTablet,
    cmdDeviceMobile,
    cmdClear,
    cmdOpenPage,
    cmdDeploy, cmdTemplate, cmdHistoryLoad, cmdDragMode, cmdQrcode, cmdGenerateHtml
} from './consts';
import {uploadDeploy} from "./fileUpload";
import {closeLoading, showLoading} from "../loading";
import openHistory from "./openHistory";
import openDragMode from "./openDragMode";
import axios from "axios";
import {api_url} from "../consts";
import openQRCode from "./openQRCode";
import openGenerateText from "./openGenerateText";

export default function Commands (editor: grapesjs.Editor, config: Required<PluginOptions>) {
    const { Commands } = editor;

    Commands.add(cmdImport, openImport(editor, config));
    Commands.add(cmdOpenPage, {
        run: () => {
            window.open(window.location.href.replace("/admin", ""))
        }
    });
    Commands.add(cmdDeploy, {
        run: (editor) => { editor.Storage.load({}).then((data) => {
            const id = editor.Storage.getCurrent()
            if (window.confirm("현재 페이지를 실제 페이지에 반영하시겠습니까?"))
                uploadDeploy([{
                    id: id,
                    data: data
                }], id).then(() => {
                    showLoading()
                    editor.runCommand(cmdOpenPage)
                })
        })
        }
    });
    Commands.add(cmdDeviceDesktop, {
        run: ed => ed.setDevice('Desktop'),
        stop: (ed) => {ed.setDevice('Desktop')},
    });
    Commands.add(cmdDeviceTablet, {
        run: ed => ed.setDevice('Tablet'),
        stop: (ed) => {ed.setDevice('Desktop')},
    });
    Commands.add(cmdDeviceMobile, {
        run: ed => ed.setDevice('Mobile portrait'),
        stop: (ed) => {ed.setDevice('Desktop')},
    });
    Commands.add(cmdClear, e => {
        if (window.confirm("현재 페이지를 제거합니다. 진행 하시겠습니까?")) {
            showLoading()
            const page = editor.Storage.getCurrent()
            axios.delete(`${api_url}?pageName=${page}`).then(() => {
                e.runCommand('core:canvas-clear')
                closeLoading()
            })
        }
    });

    const getStyles = (components: grapesjs.Component[]) => {
        components.forEach(component => {
            const recurse = (comp: grapesjs.Component) => {
                if (Object.keys(comp.getStyle()).length !== 0) comp.attributes.savedStyle = comp.getStyle()
                if (comp.get("components")?.length) {
                    comp.get("components")?.forEach(child => {
                        recurse(child)
                    })
                }
            }
            recurse(component)
        })
        return components
    }

    const setStyles = (component: grapesjs.Component) => {
        const recurse = (comp: grapesjs.Component) => {
            if ('savedStyle' in comp.attributes) {
                comp.setStyle(comp.attributes.savedStyle)
                delete comp.attributes.savedStyle
            }
            if (comp.attributes.components?.length) {
                comp.attributes.components.forEach(child => {
                    recurse(child)
                })
            }
        }
        recurse(component)
    }

    Commands.add('core:copy', editor => {
        const selected = getStyles([...editor.getSelectedAll()]);
        const filteredSelected = selected.filter(item => item.attributes.copyable === true);
        if (filteredSelected.length) {
            window.localStorage.setItem('browser_clipboard', JSON.stringify(selected));
        }
    });
    Commands.add('core:paste', editor => {
        const selected = editor.getSelected()
        const components = JSON.parse(window.localStorage.getItem('browser_clipboard') as string) as grapesjs.Component[]

        if (components) {
            if (!selected) {
                editor.addComponents(components);
                return
            }
            if (!selected.attributes.type || selected.attributes.type === 'flex-cell' || selected.attributes.type === 'flex-row') {
                const index = selected.index();
                components.forEach((comp) => {
                    selected.append(comp, {at: (index + 1)});
                    setStyles(comp)
                });
                return
            }

            const index = selected.index();
            const parent = selected.parent()
            components.forEach((comp) => {
                if (parent) {
                    parent.append(comp, {at: (index + 1)});
                } else {
                    editor.addComponents(comp)
                }
                setStyles(comp)
            });
        }
    });

    Commands.add(cmdTemplate, openTemplate(editor));
    Commands.add(cmdHistoryLoad, openHistory(editor));
    Commands.add(cmdDragMode, openDragMode(editor));
    Commands.add(cmdQrcode, openQRCode(editor));
    Commands.add(cmdGenerateHtml, openGenerateText(editor))
}