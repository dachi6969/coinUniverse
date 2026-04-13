
// basic coin data type.
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
    market_cap_rank: number;           // rank number 
    [key: string]: any;                // optional for extra fields
};

// exchange platform data types.
export interface CryptoExchange {
  id: string;
  name: string;
  year_established: number | null; 
  country: string | null;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
};

// pricing by time, ( for chart usage! ).
export interface MarketChartResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

// devided main-stream types.
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

