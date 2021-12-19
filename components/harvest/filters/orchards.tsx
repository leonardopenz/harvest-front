import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { HarvestContext } from "..";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

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

        (async () => {
            // axios.get('localhost:5001/api/orchard').then(({ data }) => {
            //     if (data && active)
            //         setOptions(data.result)
            // }).catch()

            await sleep(1e3); // For demo purposes.
            if (active)
                setOptions([...orchards]);
        })();

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
            sx={{ width: 400 }}
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

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const orchards = [
    { id: "1ba383ea-e9f0-4c35-8f01-ed88c7eeaf2a", name: "Taihape Woods 1" },
    { id: "34a76a76-23c6-40dd-b8c7-b822063f17b1", name: "Wanaka Meadows" },
    { id: "4eb58296-5eda-49a1-9831-5838e52bc4dd", name: "Taihape Woods 2" },
    { id: "7ba12acf-95b3-4c8d-80ca-4c2b562971cc", name: "Gore's River" },
    { id: "b6dbb181-48ff-4ff7-b395-7fa8dcc146c4", name: "Raglan's Haven" },
    { id: "ef71e690-4bbb-4684-9ebb-4b8fcd23eceb", name: "Oamaru Hills" }
];