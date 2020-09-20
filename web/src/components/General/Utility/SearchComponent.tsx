import TextEntry from "../Entry/TextEntry";
import React, {useState} from "react";
import {Box} from "@material-ui/core";

const SearchComponent = () => {

    const [username, setUsername] = useState<string>('');



    return (
        <Box width={150}>
            <TextEntry onChange={(e: { target: { value: any; }; }) => setUsername(e.target.value)}
                       helperText={''} label={'Search'} required={false} fullWidth={true} error={false}/>
        </Box>
    );
}

export default SearchComponent;