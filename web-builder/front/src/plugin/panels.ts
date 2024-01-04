import grapesjs from 'grapesjs';
import { PluginOptions } from './plugin';

import {
    cmdImport,
    cmdDeviceDesktop,
    cmdDeviceTablet,
    cmdDeviceMobile,
    cmdClear,
    cmdOpenPage,
    cmdDeploy,
    cmdTemplate, cmdHistoryLoad, cmdDragMode, cmdQrcode, cmdGenerateHtml
} from './consts';
import axios from "axios";
import {api_url} from "../consts";

export default function Panels (editor: grapesjs.Editor, opts: Required<PluginOptions>) {
    const { Panels } = editor;
    const config = editor.getConfig();
    const swv = 'sw-visibility';
    const expt = 'export-template';
    const osm = 'open-sm';
    const otm = 'open-tm';
    const ola = 'open-layers';
    const obl = 'open-blocks';
    const ful = 'fullscreen';
    const prv = 'preview';
    const iconStyle = 'style="display: block; min-width:22px max-width:22px"';

    config.showDevices = false;

    axios.get(`${api_url}/list`).then(res => {
        const pathList = res.data as Array<string>
        let dropdownTag = ""
        pathList.forEach(value => {
            const path = value === "/" ? "/web-builder/admin" : `/web-builder/${value}/admin`
            dropdownTag += `<li><a class="dropdown-item" href="${path}">${value}</a></li>`
        })
        Panels.getPanels().add(
            {
                id: 'page-list',
                content: "<div>" +
                    "<div class=\"dropdown\">" +
                    "  <button class=\"btn btn-secondary btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" style='--bs-btn-padding-y: 0.125rem'>" +
                    "    페이지 선택" +
                    "  </button>" +
                    "  <ul class=\"dropdown-menu\">" + dropdownTag + "</ul>" +
                    "  <input type='text' id='pathtext' placeholder='편집 경로 작성후 엔터' onkeyup='if (window.event.keyCode == 13) window.location.href = \"/web-builder/\" + this.value + \"/admin\"' />" +
                    "</div>" +
                    "</div>"
            })
    })

    Panels.getPanels().reset([
        {
            id: 'devices-c',
            buttons: [{
                id: cmdDeviceDesktop,
                command: cmdDeviceDesktop,
                active: true,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
        </svg>`
            },{
                id: cmdDeviceTablet,
                command: cmdDeviceTablet,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z" />
        </svg>`
            },{
                id: cmdDeviceMobile,
                command: cmdDeviceMobile,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
        </svg>`
            }]
        },
        {
            id: 'options',
            buttons: [{
                id: cmdDeploy,
                command: () => editor.runCommand(cmdDeploy),
                label: `<svg ${iconStyle} viewBox="0 0 16 16"><path d="M14.85 2.65l-1.5-1.5L13 1H4.48l-.5.5V4H1.5l-.5.5v10l.5.5h10l.5-.5V12h2.5l.5-.5V3l-.15-.35zM11 14H2V5h1v3.07h6V5h.79L11 6.21V14zM6 7V5h2v2H6zm8 4h-2V6l-.15-.35-1.5-1.5L10 4H5V2h7.81l1.21 1.21L14 11z"></path></svg>`,
            },{
                id: cmdOpenPage,
                command: () => editor.runCommand(cmdOpenPage),
                label: `<svg ${iconStyle} viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
            },{
                id: cmdHistoryLoad,
                command: () => editor.runCommand(cmdHistoryLoad),
                label: `<svg ${iconStyle} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M2.99787498,0.999999992 L17.4999998,0.999999992 L20.9999998,4.50000005 L21,23 L3,23 L2.99787498,0.999999992 Z M16,1 L16,6 L21,6 M12,9 L12,18 M8,15 L12,19 L16,15"></path></svg>`
            },{
                id: swv,
                command: swv,
                context: swv,
                active: true,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z" />
        </svg>`,
            },{
                id: cmdDragMode,
                command: cmdDragMode,
                context: cmdDragMode,
                label: `<svg ${iconStyle} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd"></path></svg>`,
            },{
                id: prv,
                context: prv,
                command: () => editor.runCommand(prv),
                label: `<svg ${iconStyle} viewBox="0 0 24 24"><path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>`
            },{
                id: ful,
                command: ful,
                context: ful,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
        </svg>`
            },{
                id: cmdTemplate,
                command: () => editor.runCommand(cmdTemplate),
                label: `<svg ${iconStyle} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M1,3 L23,3 L23,21 L1,21 L1,3 Z M1,8 L23,8 M7,8 L7,21"></path></svg>`
            },{
                id: expt,
                command: () => editor.runCommand(expt),
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
        </svg>`
            },{
                id: 'undo',
                command: () => editor.runCommand('core:undo'),
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
        </svg>`
            },{
                id: 'redo',
                command: () => editor.runCommand('core:redo'),
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
        </svg>`,
            },{
                id: cmdImport,
                command: () => editor.runCommand(cmdImport),
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
        </svg>`,
            },{
                id: cmdQrcode,
                command: () => editor.runCommand(cmdQrcode),
                label: `<svg ${iconStyle} stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path><path d="M7 17l0 .01"></path><path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path><path d="M7 7l0 .01"></path><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path><path d="M17 7l0 .01"></path><path d="M14 14l3 0"></path><path d="M20 14l0 .01"></path><path d="M14 14l0 3"></path><path d="M14 20l3 0"></path><path d="M17 17l3 0"></path><path d="M20 17l0 3"></path></svg>`,
            },{
                id: cmdClear,
                command: () => editor.runCommand(cmdClear),
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>`,
            },{
                id: cmdGenerateHtml,
                className: "spinSvg",
                command: () => editor.runCommand(cmdGenerateHtml),
                label: `<svg ${iconStyle} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"></path><path fill-rule="nonzero" d="M19 13H5v7h14v-7zm0-2a7 7 0 0 0-14 0h14zM6.382 3.968A8.962 8.962 0 0 1 12 2c2.125 0 4.078.736 5.618 1.968l1.453-1.453 1.414 1.414-1.453 1.453A8.962 8.962 0 0 1 21 11v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11c0-2.125.736-4.078 1.968-5.618L3.515 3.93l1.414-1.414 1.453 1.453zM9 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></g></svg>`,
            }],
        },{
            id: 'views-container',
            buttons  : [{
                id: osm,
                command: osm,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
        </svg>`,
            },{
                id: otm,
                command: otm,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
      </svg>`
            },{
                id: ola,
                command: ola,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
      </svg>`
            },{
                id: obl,
                command: obl,
                active: true,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
          <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
      </svg>`
            }],
        }]);
    // On component change show the Style Manager
    opts.showStylesOnChange && editor.on('component:selected', () => {
        const openSmBtn = Panels.getButton('views', osm);
        const openLayersBtn = Panels.getButton('views', ola);

        // Don't switch when the Layer Manager is on or
        // there is no selected component
        if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
            openSmBtn?.set('active', true);
        }
    });
}