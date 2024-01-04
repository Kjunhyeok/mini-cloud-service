import addBasicTypes from './basic/basic';
import grapesjs from 'grapesjs';
import panels from "./panels";
import commands from "./commands";
import addTableType from "./basic/table";
import addButtonType from "./basic/button";
import addNavBar from "./basic/navbar";
import addColumnType from "./basic/column";
import addRowType from "./basic/row";
import addCellType from "./basic/cell";
import addCustomerProductList from "./basic/customerProductList";
import addSlideImageType from "./basic/slideImage";
import addBasicStyles from "./basicStyle";
import addText from "./basic/text";
import addLanguageSelect from "./basic/languageSelect";
import axios from "axios";
import {api_url} from "../consts";
import convertImageModal from "./convertImageModal";

export type PluginOptions = {
    flexColumn?: string;
    flexRow?: string;
    cell?: string;
    text?: string;
    link?: string;
    image?: string;
    video?: string;
    button?: string;
    navbar?: string;
    table?: string;
    productList?: string;
    slideImage?: string;

    modalImportTitle?: string;
    modalImportButton?: string;
    modalImportLabel?: string;
    modalImportContent?: string | ((editor: grapesjs.Editor) => string);
    importViewerOptions?: Record<string, any>;
    showStylesOnChange?: boolean;
    useCustomTheme?: boolean;
};

const plugin: grapesjs.Plugin<PluginOptions> = (editor, opts = {}) => {
    const config: Required<PluginOptions> = {
        flexColumn: 'flex 열',
        flexRow: 'flex 행',
        cell: '셀',
        text: '텍스트',
        link: '하이퍼링크',
        image: '이미지',
        video: '영상',
        button: '버튼',
        navbar: '네비게이션 바',
        table: "테이블",
        productList: "헤드리스 상품 리스트",
        slideImage: "슬라이드 이미지",

        modalImportTitle: 'Import',
        modalImportButton: 'Import',
        modalImportLabel: '',
        modalImportContent: '',
        importViewerOptions: {},
        showStylesOnChange: true,
        useCustomTheme: true,
        ...opts
    };
    // 모든 요소 resizable 허용
    const components = editor.Components
    for (const type of components.getTypes() as any[]) {
        components.addType(type.id, {
            model: {
                defaults: {
                    resizable: true,
                    scrollable: true
                }
            }
        })
    }

    // body 아래의 컴포넌트들을 단축키로 전체 선택 하도록 추가
    editor.Keymaps.add("select-all", "⌘+a, ctrl+a", (e: grapesjs.Editor) => {
        e.DomComponents.getWrapper().components().forEach((item) => {
            e.selectAdd(item)
        })
    })


    addRowType(editor, config)
    addColumnType(editor, config)
    addCellType(editor, config)
    addButtonType(editor, config)
    addTableType(editor, config)
    addNavBar(editor, config)
    addSlideImageType(editor, config)
    addText(editor)
    addLanguageSelect(editor)
    convertImageModal(editor)

    addBasicTypes(editor, config);
    addBasicStyles(editor);
    addCustomerProductList(editor, config)
    commands(editor, config);
    panels(editor, config);
};

export default plugin;