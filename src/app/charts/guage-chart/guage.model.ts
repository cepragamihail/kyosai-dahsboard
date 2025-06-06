import { GaugeLegendModel } from "./guage-legend.model";

export interface GaugeModel {
    id?: number,
    title: string,
    shortTitle: string,
    value: number,
    sectors: number[],
    legend: GaugeLegendModel[],
}