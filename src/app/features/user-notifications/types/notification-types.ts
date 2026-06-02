export interface NotificationTemplate {
    title: string;
    message: (params?: any) => string;
    type: 'success' | 'info' | 'warning' | 'error';
};
  
