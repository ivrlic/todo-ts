import './css/style.css'
import ListItem from './model/ListItem'
import FullList from './model/FullList'
import ListTemplate from './template/ListTemplate'


function initApp(){
    const currentList = FullList.instance
    const listTemplate = ListTemplate.instance

    const todoForm = document.getElementById("item-form") as HTMLFormElement
    todoForm.addEventListener("submit", (e: SubmitEvent): void=>{
        e.preventDefault()

        const newInput = document.getElementById("new-todo") as HTMLInputElement
        const newTodo: string = newInput.value.trim()
        if (newTodo.length === 0) return

        const newId: number = currentList.list.length > 0 
            ? parseInt(currentList.list[currentList.list.length - 1].id) + 1
            : 1
        
        const newItem = new ListItem(newId.toString(), newTodo)
        
        currentList.addItem(newItem)
        listTemplate.renderList(currentList)
        newInput.value = ""
    })

    const clearList = document.getElementById("btn-clear-list") as HTMLButtonElement
    clearList.addEventListener("click", ()=>{
        currentList.clearList()
        listTemplate.clearList()
    })

    currentList.load()
    listTemplate.renderList(currentList)

}

document.addEventListener("DOMContentLoaded", initApp)