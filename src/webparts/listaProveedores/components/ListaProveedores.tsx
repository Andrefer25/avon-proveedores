import * as React from 'react';
import styles from './ListaProveedores.module.scss';
import { IListaProveedoresProps } from './IListaProveedoresProps';
import IListaProveedoresState from './ListaProveedoresState';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { sp } from "@pnp/sp/presets/all";
import { escape } from '@microsoft/sp-lodash-subset';

import ListaProveedoresServices from './services/ListaProveedoresServices';
import ListaProveedoresControllers from './controllers/ListaProveedoresControllers';
import IListaProveedoresItem from './models/ListaProveedoresItem';

export default class ListaProveedores extends React.Component<IListaProveedoresProps, IListaProveedoresState> {

  private _select: Selection;

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        filter: [],
        selectedItem: null
    };

    this._select = new Selection({
      onSelectionChanged: () => {
        if(this.state.selectedItem != null) {
          this._items.pop();
        }
        this.setState({
          selectedItem: this.getSelection()
        });
        if(this.getSelection() != null) {
          this._items.push({
            key: 'permissions',
            text: 'Comprobar Permisos',
            iconProps: { iconName: 'TrackersMirrored' },
            onClick: () =>  {
              if(this.state.selectedItem.idUsuario != "") {
                alert(this.state.selectedItem.idUsuario);
              } else {
                alert("No tiene un usuario cargado");
              }
            }
          });
        }
      }
    });

    this._getItems = this._getItems.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  public componentDidMount() {
    this._getItems();
  }

  public _getItems() {
    let arrayProveedores: IListaProveedoresItem[] = [];
    sp.web.lists.getByTitle("Proveedores").items
    .select("ProveedorUsuario/Title,ProveedorUsuario/EMail,ID,Title,ProveedorCUIT,ProveedorEmail,ProveedorPais,ProveedorExterior,ProveedorNumero,ProveedorBaja")
    .expand('ProveedorUsuario').get().then((data: any[]) => {

        for (let index = 0; index < data.length; index++) {
          arrayProveedores.push({
              ID: data[index]["ID"],
              razonSocial: data[index]["Title"],
              cuit: data[index]["ProveedorCUIT"],
              email: data[index]["ProveedorEmail"],
              usuario: data[index].ProveedorUsuario? data[index].ProveedorUsuario.Title : "",
              idUsuario: data[index].ProveedorUsuario? data[index].ProveedorUsuario.ID : "",
              codigoPais: data[index]["ProveedorPais"],
              exterior: (data[index]["ProveedorExterior"] == "Si"),
              nroProveedor: data[index]["ProveedorNumero"],
              baja: data[index]["ProveedorBaja"]
          });
        }
        this.setState({ items: arrayProveedores, filter: arrayProveedores });
    });
  }

  private getSelection() {
    const selectionCount = this._select.getSelectedCount();

    switch(selectionCount) {
        case 0: 
            return null;
        case 1: 
            return (this._select.getSelection()[0] as IListaProveedoresItem);
        default:
            return null;
    }
  }

  private _onFilterChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if (!newValue) {
      this.setState({ filter: this.state.items });
    } else {
      this.setState({ filter: ListaProveedoresControllers.filterList(this.state.items,newValue) });
    }
  }

  public _items: ICommandBarItemProps[] = [
    {
      key: 'newItem',
      text: 'Nuevo',
      iconProps: { iconName: 'Add' }
    }
  ];

  public render(): React.ReactElement<IListaProveedoresProps> {
    return (
      <div className={ styles.listaProveedores }>
        <br />
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
              Buscar por Razón Social:
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
              <TextField onChange={this._onFilterChange} />
            </div>
          </div>
        </div>
        <br/>
        <CommandBar
          items={this._items}
          ariaLabel="Use left and right arrow keys to navigate between commands"
        />
        <br/>
        <DetailsList
          items={this.state.filter}
          columns={ListaProveedoresControllers.getColumns()}
          selectionMode={SelectionMode.single}
          selection={this._select}
          setKey="multiple"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          selectionPreservedOnEmptyClick={false}
          enterModalSelectionOnTouch={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="Row checkbox"
        />
      </div>
    );
  }
}
