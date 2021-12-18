import OrchardsFilter from "./orchards";
import PeriodFilter from "./period";
import style from '../../layout/layout.module.css';


export default function HarvestFilters() {
    return (
        <div className={style.filters}>
            <div className={style.item}><PeriodFilter /></div>
            <div className={style.item}><OrchardsFilter /></div>
        </div>
    )
}