const USER_AGENT = navigator.userAgent;

const DEVICE_PATTERNS = {
  Android: /Android/i,
  BlackBerry: /BlackBerry/i,
  iOS: /iPhone|iPad|iPod/i,
  Opera: /Opera Mini/i,
  Windows: /IEMobile/i,
};

export const Device = {
  Android() {
    return DEVICE_PATTERNS.Android.test(USER_AGENT);
  },
  BlackBerry() {
    return DEVICE_PATTERNS.BlackBerry.test(USER_AGENT);
  },
  iOS() {
    return DEVICE_PATTERNS.iOS.test(USER_AGENT);
  },
  Opera() {
    return DEVICE_PATTERNS.Opera.test(USER_AGENT);
  },
  Windows() {
    return DEVICE_PATTERNS.Windows.test(USER_AGENT);
  },
  isMobile() {
    return (
      this.Android() || 
      this.BlackBerry() || 
      this.iOS() || 
      this.Opera() || 
      this.Windows()
    );
  }
};

// Legacy export for backward compatibility
export const Dispositivo = Device;
