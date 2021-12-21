import OrchardsFilter from "./orchards";
import PeriodFilter from "./period";
import style from '../../layout/layout.module.css';
import { Grid } from "@mui/material";


export default function HarvestFilters() {
    return (
        <Grid container spacing={2} className={style.filters}>
            <Grid item xs={12} md={6} lg={3}>
                <div className={style.item}><PeriodFilter /></div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <div className={style.item}><OrchardsFilter /></div>
            </Grid>
        </Grid>
    )
}