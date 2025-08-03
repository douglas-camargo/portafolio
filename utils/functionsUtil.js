export const Dispositivo = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  evaluarDispositivo() {
    return (Dispositivo.Android() || Dispositivo.BlackBerry() || Dispositivo.iOS() || Dispositivo.Opera() || Dispositivo.Windows());
  }
};
