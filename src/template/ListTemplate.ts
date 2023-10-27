import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clearList(): void,
    renderList(currentList: FullList): void,
}

export default class ListTemplate implements DOMList {
    static instance: ListTemplate = new ListTemplate()
    ul: HTMLUListElement

    private constructor(){
        this.ul = document.getElementById("todo-list") as HTMLUListElement
    }

    clearList(): void {
        this.ul.innerHTML = ""
    }

    renderList(currentList: FullList): void {
        this.clearList()
        currentList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item-todo"
            
            const input = document.createElement("input") as HTMLInputElement
            input.type = "checkbox"
            input.className = "check-todo"
            input.id = item.id
            input.checked = item.checked
            li.append(input)

            function checkIsChecked(): void{
                if(item.checked){
                    label.classList.add("checked-text")
                    button.classList.add("checked-del-btn")
                } else{
                    label.classList.remove("checked-text")
                    button.classList.remove("checked-del-btn")
                }
            }

            input.addEventListener("change", ()=>{
                item.checked = !item.checked
                checkIsChecked()
                currentList.save()
            })

            const label = document.createElement("label") as HTMLLabelElement
            label.textContent = item.text
            label.className = "text-todo"
            label.htmlFor = item.id
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.textContent = "X"
            button.className = "btn-todo"
            li.append(button)

            button.addEventListener("click", ()=>{
                currentList.removeItem(item.id)
                this.renderList(currentList)
            })

            this.ul.append(li)
            checkIsChecked()

        })
      
    }
}