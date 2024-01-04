

export default function addDragListener() {
    const container = document.getElementsByClassName("gjs-pn-views-container")[0]
    const editor = document.getElementById("container")!!
    const moveMouseEvent = (event: MouseEvent) => move(event, container as HTMLElement)

    container.addEventListener("mousedown", (event) => {
        if (document.activeElement?.tagName === "BODY") {
            down(event)
            editor.addEventListener("mousemove", moveMouseEvent);
        }
    });
    container.addEventListener("mouseup", () => {
        container.setAttribute("move", "false")
        editor.removeEventListener("mousemove", moveMouseEvent)
    })
    const moveTouchEvent = (event: TouchEvent) => move(event, container as HTMLElement)

    container.addEventListener("touchstart",(event) => {
        down(event)
        editor.addEventListener("touchmove", moveTouchEvent);
    });
    container.addEventListener("touchend", () => {
        container.setAttribute("move", "false")
        editor.removeEventListener("touchmove", moveTouchEvent)
    })

    container.addEventListener("dragstart", () => {
        container.setAttribute("move", "false")
        editor.removeEventListener("mousemove", moveMouseEvent)
    })
}

function down(event: Event) {
    const e = event as MouseEvent | TouchEvent
    const ele = e.currentTarget as HTMLElement
    let left;
    let top;
    if (e instanceof MouseEvent) {
        left = ele.offsetLeft - e.clientX
        top = ele.offsetTop - e.clientY
    } else {
        left = ele.offsetLeft - e.touches[0].clientX
        top = ele.offsetTop - e.touches[0].clientY
    }
    ele.setAttribute("move", "true")
    ele.setAttribute("left", `${left}`)
    ele.setAttribute("top", `${top}`)
}

function move(event: Event, ele: HTMLElement) {
    if (ele.getAttribute("move") === "true") {
        const e = event as MouseEvent | TouchEvent
        let x;
        let y;
        if (e instanceof MouseEvent) {
            x = e.clientX
            y = e.clientY
        } else {
            x = e.touches[0].clientX
            y = e.touches[0].clientY
        }
        const offsetLeft = Number(ele.getAttribute("left")!!)
        const offsetTop = Number(ele.getAttribute("top")!!)
        const pixelLeft = x + offsetLeft
        const pixelTop = y + offsetTop
        const perLeft = pixelLeft / window.innerWidth * 100
        const perTop = pixelTop / window.innerHeight * 100
        ele.style.left = `${perLeft}%`
        ele.style.top = `${perTop}%`
    }
}
