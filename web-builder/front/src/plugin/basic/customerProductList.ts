import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {headlessCategory} from "../consts";
import {PluginOptions} from "../plugin";

export default function addCustomerProductList (editor: Editor, opts: Required<PluginOptions>) {
    const components = editor.Components
    const type = "헤드리스 상품 리스트"

    components.addType(type, {
        model: {
            defaults: {
                copyable: false,
                resizable: true,
                components: [
                    {
                        removable: false,
                        type: "text",
                        content: "<div style='font-weight: bold; font-size: 15px;'>르니몰에서 기획하는 기획전</div>",
                        style: {
                            "font-weight": "bold",
                            "font-size": "15px",
                            "margin": "20px"
                        }
                    },
                    {
                        highlightable: false,
                        removable: false,
                        content:  "<div name='product-list-div' style=\"overflow-x: scroll;\">" +
                            "<div style=\"width:0; display: flex;\">" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202209/30eb6562a3f8b968c8d0e338248833fc.jpg' />" +
                            "        <div style='font-weight: bold'>구찌</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품 입니다.</div>" +
                            "        <div>100000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202208/4ad074ec9fe6bca5058c9448bdb7c73f.jpg' />" +
                            "        <div style='font-weight: bold'>프라다</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품입니다.</div>" +
                            "        <div>200000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202202/4e20edd14a7c7ba60eec56d6aa0f422b.gif' />" +
                            "        <div style='font-weight: bold'>에르메스</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품입니다.</div>" +
                            "        <div>300000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202209/30eb6562a3f8b968c8d0e338248833fc.jpg' />" +
                            "        <div style='font-weight: bold'>구찌</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품 입니다.</div>" +
                            "        <div>100000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202208/4ad074ec9fe6bca5058c9448bdb7c73f.jpg' />" +
                            "        <div style='font-weight: bold'>프라다</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품입니다.</div>" +
                            "        <div>200000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202202/4e20edd14a7c7ba60eec56d6aa0f422b.gif' />" +
                            "        <div style='font-weight: bold'>에르메스</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품입니다.</div>" +
                            "        <div>300000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202209/30eb6562a3f8b968c8d0e338248833fc.jpg' />" +
                            "        <div style='font-weight: bold'>구찌</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품 입니다.</div>" +
                            "        <div>100000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202208/4ad074ec9fe6bca5058c9448bdb7c73f.jpg' />" +
                            "        <div style='font-weight: bold'>프라다</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품입니다.</div>" +
                            "        <div>200000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202202/4e20edd14a7c7ba60eec56d6aa0f422b.gif' />" +
                            "        <div style='font-weight: bold'>에르메스</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품입니다.</div>" +
                            "        <div>300000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202209/30eb6562a3f8b968c8d0e338248833fc.jpg' />" +
                            "        <div style='font-weight: bold'>구찌</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품 입니다.</div>" +
                            "        <div>100000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202208/4ad074ec9fe6bca5058c9448bdb7c73f.jpg' />" +
                            "        <div style='font-weight: bold'>프라다</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품입니다.</div>" +
                            "        <div>200000</div>" +
                            "  </div>" +
                            "  <div style='padding: 10px'>" +
                            "    <img alt='' height='250px' src='http://lenicmall.com/web/product/medium/202202/4e20edd14a7c7ba60eec56d6aa0f422b.gif' />" +
                            "        <div style='font-weight: bold'>에르메스</div>" +
                            "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>미리보기 상품입니다.</div>" +
                            "        <div>300000</div>" +
                            "  </div>" +
                            " </div>" +
                            "</div>"
                    }
                    ]
            }
        }
    })

    const bm = editor.BlockManager;

    bm.add(type, {
        category: headlessCategory,
        label: opts.productList,
        media: `<svg class="svg-width" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M13 10h-2V8h2v2zm0-4h-2V1h2v5zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03L21 4.96 19.25 4l-3.7 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"></path></svg>`,
        content: {
            type: type,
        }
    });
}