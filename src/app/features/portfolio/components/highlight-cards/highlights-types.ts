type TopPerformerType = {
    img: string;
    profitPercent: number;
    symbol: string;
}

export interface PortfolioHighlightsType {
    profit?: number,
    avalibleCoinsQuaintity?: number,
    topPerformer?: TopPerformerType
}