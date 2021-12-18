
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

export default Report;