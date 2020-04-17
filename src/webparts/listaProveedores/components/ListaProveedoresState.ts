import IListaProveedoresItem from "./models/ListaProveedoresItem";

export default interface IListaProveedoresState {
    items: IListaProveedoresItem[],
    filter: IListaProveedoresItem[],
    selectedItem: IListaProveedoresItem
}