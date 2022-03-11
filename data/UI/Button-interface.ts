export default interface ButtonInterface{
    label:string;
    onClickHandler?:any;
    classOfButton:string;
    disabled?:boolean;
    additionalStyle?:{};
    children?: React.ReactNode;
}