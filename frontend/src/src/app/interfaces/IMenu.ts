import { MMenu } from "@interfaces/MMenu";
import * as Icons from '@mui/icons-material';

export interface IMenu extends MMenu {
    IconNm?: keyof typeof Icons;
    Children?: IMenu[];
}