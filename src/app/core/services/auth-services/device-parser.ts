export const parseUserAgent = (ua: string) => {
    let device = 'Unknown';
    let os = 'Unknown';
    let browser = 'Unknown';
  
    // OS
    if (/Android/i.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac/i.test(ua)) os = 'MacOS';
    else if (/Linux/i.test(ua)) os = 'Linux';
  
    // Device type
    if (/Mobile/i.test(ua)) device = 'Mobile';
    else if (/Tablet/i.test(ua)) device = 'Tablet';
    else device = 'Desktop';
  
    // Browser
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Edg/i.test(ua)) browser = 'Edge';
  
    return { device, os, browser };
  }