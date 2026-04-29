export interface SessionType {
    id: string;
    user_id: string;
  
    ip_address: string;
    location: string | null;
  
    created_at: string; 
  
    device_info: DeviceInfo;
}
  
export interface DeviceInfo {
    device: string;  // "Desktop"
    os: string;      // "MacOS"
    browser: string;  // "Chrome"
}