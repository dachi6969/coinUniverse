
// basic coin data type.
export interface Coin {
    id: string;                      
    symbol: string;                 
    name: string;                   
    image: string;   
    current_price: number; 
    price_change_percentage_24h: number; 
    price_change_24h: number;      
    total_volume: number;             
    market_cap: number;              
    market_cap_rank: number;        
    [key: string]: any;            
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

