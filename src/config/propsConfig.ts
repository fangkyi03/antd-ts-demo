export interface fetchDispatch {
    type:string;
    payload:object[] | object;
}
export interface fetchProps {
    dispatch(config:fetchDispatch):void
}
export enum buttonTypeProps {
    default = 'default',
    primary = 'primary',
    ghost = 'ghost',
    dashed = 'dashed',
    danger = 'danger'   
}