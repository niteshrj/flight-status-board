import {styled} from "@mui/system";
import {Typography} from "@mui/material";

export const Heading = (text: any) => {
    return <HeadingStyles>{text} <Icon src="/icons8-flight-50.png" alt="" /></HeadingStyles>
}

const Icon = styled('img')({
    marginRight: '8px',
    marginTop: '8px'
});

const HeadingStyles = styled(Typography)(({theme}) => ({
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    marginTop: '20px',
}));

