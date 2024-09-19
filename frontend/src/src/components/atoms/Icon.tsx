import { SvgIconProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import * as Icons from '@mui/icons-material';

export interface IconProps extends SvgIconProps {
    name?: keyof typeof Icons;
}

export const Icon = (props: IconProps) => {
    const MuiIcon: OverridableComponent<SvgIconTypeMap> & { muiName: string } = Icons[props.name ?? 'PanoramaFishEye'];
    return <MuiIcon {...props} />;
};
