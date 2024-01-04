import axios from "axios";

export function render() {
    const productDivList = document.getElementsByName("product-list-div")
    if (productDivList) {
        productDivList.forEach((value) => {
            value.innerHTML = ""
            const innerProductDiv = document.createElement("div")
            innerProductDiv.style.display = "flex"
            innerProductDiv.style.width = "0"
            value.append(innerProductDiv)
            axios.post("http://localhost:8100/goods/search?sort=createdDate DESC&page=0&size=100", {
                mallId: 0
            }).then(({data}) => {
                data.results.forEach((value: any) => {
                    const listDiv = document.createElement("div")
                    listDiv.style.padding = "10px"
                    listDiv.innerHTML =
                        "<img alt='" + value.name + "' height='250px' src='" + value.imageUrl + "' />" +
                        "        <div style='padding: 10px; font-weight: bold; font-size: 15px;'>르니앤맥코이</div>" +
                        "        <div style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;'>" + value.name + "</div>" +
                        "        <div>" + Number(value.price).toLocaleString() + "</div>"
                    innerProductDiv.append(listDiv)
                })
            })
        })
    }
    const langSelect = document.getElementsByName("language") as NodeListOf<HTMLSelectElement>
    langSelect.forEach((value) => {
        value.onchange = (e) => {
            const translate = document.getElementsByClassName("translate")
            for (let i = 0; i < translate.length; i++) {
                const ele = translate.item(i)!!
                const attr = ele.getAttribute(value.options[value.selectedIndex].value)
                if (attr) {
                    ele.innerHTML = attr
                }
            }

        }
    })
}