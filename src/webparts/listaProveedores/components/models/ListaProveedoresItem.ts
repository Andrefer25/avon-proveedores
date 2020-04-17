export default interface IListaProveedoresItem {
    ID: number;
    razonSocial: string;
    cuit: number;
    email: string;
    usuario: any[];
    idUsuario: string;
    codigoPais: string;
    exterior: boolean;
    nroProveedor: number;
    baja: boolean;
}