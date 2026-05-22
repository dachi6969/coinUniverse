import { effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';
import { NotificationTemplate } from '../../../features/user-notifications/notification-types';
import { Notifications } from '../../types/notifications-types';

@Injectable({
  providedIn: 'root',
})
export class UserNotifyService {

  private authService = inject(AuthService);
  private supabase = this.authService.supabase;
  private userStatusData = this.authService.userStatusData;

  private channel: any | null = null;

  constructor() {
    effect(() => {
      const userId = this.authService.userStatusData()?.id;

      if ( userId ) {
        this.loadNotifications(userId);
      }
    })
  };

  public notifications = signal<Notifications[]>([]);
  public isNewNotification = signal<Notifications | null>(null);
  public isLoading = signal<boolean>(false);

  private async loadNotifications(userId: string) {
    if (!this.channel) {
      this.listenToNotifications(userId);
    }
    this.isLoading.set(true);
    const { data, error } = await this.supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  
    if (data) {
      this.isLoading.set(false);
      this.notifications.set(data);
    }
  }
  
  listenToNotifications(userId: string) {
    this.channel = this.supabase
      .channel('realtime:notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          const newNotifi = payload.new as Notifications;
          
          this.notifications.update(list => {
            const exists = list.some(n => n.id === newNotifi.id);
            return exists ? list : [newNotifi, ...list];
          });
          
          this.isNewNotification.set(newNotifi);
        }
      )
      .subscribe();
  }
  public async sendNotification(
    notifi: NotificationTemplate, 
    params?:{ amount: string, symbol: string }
    ) 
    {
    const userId = this.userStatusData()?.id;
    const createdAt = new Date();
    
    const { error: insertError } = await this.supabase
    .from('notifications')
    .insert([
      {
      user_id: userId,
      title: notifi.title,
      message: notifi.message(params),
      type: notifi.type,
      is_read: false,
      created_at: createdAt
    }
  ]);
  if (insertError) return;
  }

  public async deleteAllNotifications(): Promise<void> {
    const userId = this.authService.userStatusData()?.id;
    if (!userId) return;
  
    const { error } = await this.supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId);
  
    if (!error) {
      this.notifications.set([]);
    } else {
      console.error('Error deleting notifications:', error);
    }
  };

  public async readNotification(id: string, userId: string): Promise<void> {
    const { data, error } = await this.supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .eq('user_id', userId)
    .select();

    if ( data ) {
      this.notifications.update(list =>
        list.map(n =>
          n.id === id
            ? { ...n, is_read: true }
            : n
        )
      );
    }
    if ( error ) {
      console.error(error);
    }

  }
  
}
