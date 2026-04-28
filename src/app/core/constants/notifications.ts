import { NotificationTemplate } from "../../features/user-notifications/notification-types";

export const NOTIF_TEMPLATES: Record<string, NotificationTemplate> = {

    BUY_SUCCESS: {
      title: 'Purchase Confirmed ✅',
      message: (params: { amount: string, symbol: string }) => 
        `You have successfully purchased ${params.amount} ${params.symbol}. Asset is now in your portfolio.`,
      type: 'success'
    },
  
    SELL_SUCCESS: {
      title: 'Sell Order Executed 💰',
      message: (params: { amount: string, symbol: string }) => 
        `Successfully sold ${params.amount} ${params.symbol}. The proceeds have been added to your balance.`,
      type: 'success'
    },
  
    FREE_CASH: {
      title: 'New Deposit Received 💵',
      message: (params) => 
        `A deposit of $${params} has been added to your account balance.`,
      type: 'success'
    },
  
    INSUFFICIENT_FUNDS: {
      title: 'Transaction Failed ⚠️',
      message: () => 'Insufficient funds to complete this transaction. Please check your balance.',
      type: 'error'
    }
};
