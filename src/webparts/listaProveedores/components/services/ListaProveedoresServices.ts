import { sp } from "@pnp/sp/presets/all";
import IListaProveedoresItem from "../models/ListaProveedoresItem";

export default class ListaProveedoresServices {
    
    public static async getListaProveedores() {
        let proveedoresList = await sp.web.lists.getByTitle("Proveedores").items
        .select("ProveedorUsuario/Title,ProveedorUsuario/EMail,ID,Title,ProveedorCUIT,ProveedorEmail,ProveedorPais,ProveedorExterior,ProveedorNumero,ProveedorBaja")
        .expand('ProveedorUsuario').get().then((data: any[]) => {
            return data.map((item)=>{
                return {
                    ID: item.ID,
                    razonSocial: item.Title,
                    cuit: item.ProveedorCUIT,
                    email: item.ProveedorEmail,
                    usuario: item.ProveedorUsuario? item.ProveedorUsuario : "",
                    codigoPais: item.ProveedorPais,
                    exterior: (item.ProveedorExterior == "Si"),
                    nroProveedor: item.ProveedorNumero,
                    baja: item.ProveedorBaja
                }
            });
        });
        return proveedoresList;
    }

}