
type Report = {
    totalProduction: number
    totalCost: number
    categories: ReportCategorie[]
}

type ReportCategorie = {
    id: string
    name: string
    production: number
    cost: number
}

export enum ReportTab { varieties = 0, orchards = 1 }
export enum ChartType { production = 0, cost = 1 }

export default Report;