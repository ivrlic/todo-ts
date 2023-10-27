import ListItem from "./ListItem"

interface List {
    list: ListItem[],
    addItem(item: ListItem): void,
    removeItem(id: string): void,
    clearList(): void,
    save(): void,
    load(): void,
}

export default class FullList implements List{
    static instance: FullList = new FullList()
    
    private constructor(
      private _list: ListItem[] = [] 
    ){}

    get list(): ListItem[]{
        return this._list
    }

    addItem(item: ListItem): void {
        this._list.push(item)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    save(): void {
        const stringifyTodoList = JSON.stringify(this._list)
        localStorage.setItem("my-todo-list", stringifyTodoList)
    }

    load(): void {
        const storage: string | null = localStorage.getItem("my-todo-list")
        if (typeof storage !== "string") return
       
        const parsedStorage: {_id: string, _text: string, _checked: boolean}[]
            = JSON.parse(storage)

        parsedStorage.forEach(item => {
            const newItem = new ListItem(item._id, item._text, item._checked)
            this.addItem(newItem)
        })  

    }

}