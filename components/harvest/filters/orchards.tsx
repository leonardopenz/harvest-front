import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { HarvestContext } from "..";
import axios from 'axios';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Orchard = {
    id: string
    name: string
}

export default function OrchardsFilter() {
    const { setFilter } = useContext(HarvestContext);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<Orchard[]>([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;
        if (!loading)
            return undefined;

        axios.get('/api/orchard').then(({ data }) => {
            if (data && active)
                setOptions(data)
        }).catch()

        return () => { active = false; };
    }, [loading]);

    useEffect(() => {
        if (!open)
            setOptions([]);
    }, [open]);

    return (
        <Autocomplete
            id="orchards"
            multiple
            limitTags={1}
            // sx={{ width: 300 }}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={(e, data) => setFilter(prevstate => ({ ...prevstate, orchards: data.map((x) => { return x.id }) }))}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size={'small'}
                    label="Orchards"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}