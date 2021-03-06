import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { HarvestContext } from "..";
import moment from 'moment';

export default function PeriodFilter() {
    const dateFormat = "YYYY-MM-DD";
    const { item, filter, setFilter } = useContext(HarvestContext);
    const [value, setValue] = useState<DateRange<string>>([moment(filter.start).add(1, 'days').format(dateFormat), moment(filter.end).add(1, 'days').format(dateFormat)]);

    return (
        <>
            <LocalizationProvider dateAdapter={DateFnsAdapter}>
                <DateRangePicker
                    startText="Start"
                    endText="End"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={(newValue) => { setValue(newValue); }}
                    onAccept={(e) => { setFilter(prevstate => ({ ...prevstate, start: moment(e[0]).format(dateFormat), end: moment(e[1]).format(dateFormat), tab: filter.tab })) }}
                    disableCloseOnSelect={false}
                    renderInput={(startProps, endProps) => (
                        <>
                            <TextField size={'small'} {...startProps} />
                            <Box sx={{ mx: 1 }}> to </Box>
                            <TextField size={'small'} {...endProps} />
                        </>
                    )}
                />
            </LocalizationProvider>
        </>
    )
}