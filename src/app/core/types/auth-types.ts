export interface SessionType {
    id: string;
    user_id: string;
  
    ip_address: string;
    location: string | null;
  
    created_at: string; // ISO date string
  
    device_info: DeviceInfo;
}
  
export interface DeviceInfo {
    device: string;   // e.g. "Desktop"
    os: string;       // e.g. "MacOS"
    browser: string;  // e.g. "Chrome"
}