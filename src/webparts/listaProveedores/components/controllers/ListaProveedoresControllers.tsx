import * as React from 'react';
import IListaProveedoresItem from "../models/ListaProveedoresItem";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export default class ListaProveedoresControllers {

    public static getColumns(): IColumn[] {
        let column = [
            {
                key: 'column1',
                name: 'ID',
                fieldName: 'id',
                minWidth: 10,
                maxWidth: 20,
                isResizable: false,
                data: 'number',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.ID}</span>;
                },
                isPadded: true
            },
            {
                key: 'column2',
                name: 'Razón Social',
                fieldName: 'razonSocial',
                minWidth: 170,
                maxWidth: 260,
                isRowHeader: true,
                isResizable: true,
                data: 'string',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.razonSocial}</span>;
                },
                isPadded: true
            },
            {
                key: 'column3',
                name: 'CUIT',
                fieldName: 'cuit',
                minWidth: 70,
                maxWidth: 95,
                isResizable: true,
                isCollapsible: true,
                data: 'number',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.cuit}</span>;
                },
                isPadded: true
            },
            {
                key: 'column4',
                name: 'Email',
                fieldName: 'email',
                minWidth: 75,
                maxWidth: 90,
                isResizable: true,
                isCollapsible: true,
                data: 'number',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.email}</span>;
                }
            },
            {
                key: 'column5',
                name: 'Usuario',
                fieldName: 'usuario',
                minWidth: 70,
                maxWidth: 80,
                isResizable: true,
                isCollapsible: true,
                data: 'number',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.usuario}</span>;
                }
            },
            {
                key: 'column6',
                name: 'Código País',
                fieldName: 'codigoPais',
                minWidth: 60,
                maxWidth: 80,
                isResizable: true,
                isCollapsible: true,
                data: 'string',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.codigoPais}</span>;
                }
            },
            {
                key: 'column7',
                name: 'Exterior',
                fieldName: 'exterior',
                minWidth: 10,
                maxWidth: 20,
                isResizable: true,
                isCollapsible: true,
                data: 'boolean',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.exterior}</span>;
                }
            },
            {
                key: 'column8',
                name: 'Nro Proveedor',
                fieldName: 'nroProveedor',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsible: true,
                data: 'number',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.nroProveedor}</span>;
                }
            },
            {
                key: 'column9',
                name: 'Baja',
                fieldName: 'baja',
                minWidth: 10,
                maxWidth: 20,
                isResizable: true,
                isCollapsible: true,
                data: 'boolean',
                onRender: (item: IListaProveedoresItem) => {
                    return <span>{item.baja}</span>;
                }
            }
        ]

        return column;
    }

    public static filterList(list:IListaProveedoresItem[],word:string) {
        if (word.trim() != "")
            return list.filter((item)=> item.razonSocial.indexOf(word.toUpperCase()) === 0);
        else
            return [];
    }

    public static checkPermissions(user) {
        
    }

}