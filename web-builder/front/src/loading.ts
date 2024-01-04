

export function showLoading() {
    const loading = document.getElementById("loading")
    if (!loading) {
        const div = document.createElement("div")
        div.id = "loading"
        const spinner = document.createElement("div")
        spinner.className = "spinner"
        div.append(spinner)
        document.body.append(div)
    }
}

export function createSmallLoading(): HTMLDivElement {
    const div = document.createElement("div")
    div.id = "loading"
    const spinner = document.createElement("div")
    spinner.className = "spinner"
    spinner.style.width = "32px"
    spinner.style.height = "32px"
    spinner.style.zIndex = "1"
    div.append(spinner)
    return div
}

export function removeSmallLoading() {
    let spinner
    while (spinner = document.querySelector(".spinner")) {
        const div = spinner.parentElement!!
        spinner.remove()
        div.remove()
    }
}

export function closeLoading() {
    const loading = document.getElementById("loading")
    if (loading)
        loading.remove()
}

export function errorLoading() {
    const loading = document.getElementById("loading")
    if (loading) {
        loading.innerHTML = ""
        const spinner = document.createElement("div")
        spinner.className = "error"
        spinner.style.color = "red"
        spinner.innerHTML = "서버에 문제가 발생했습니다.</br>잠시후 다시 시도해주세요."
        loading.append(spinner)
    }
}