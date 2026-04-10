export interface Coin {
    id: string;                       // e.g., "bitcoin"
    symbol: string;                   // e.g., "btc"
    name: string;                      // e.g., "Bitcoin"
    image: string;                     // coin logo URL
    current_price: number;             // current USD price
    price_change_percentage_24h: number; // 24h % change (positive/negative)
    price_change_24h: number;          // absolute price change in USD
    total_volume: number;              // 24h trading volume
    market_cap: number;                // current market cap
    [key: string]: any;                // optional for extra fields
};

export interface MarketChartResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

export interface DashboardData {
  btc: Coin | undefined;
  topGainer: Coin;
  topLoser: Coin;
  topVolume: Coin;
  topValues: Coin[];
};

export interface DashboardState {
  selectedCoin: Coin;
  topCoins: DashboardData
};