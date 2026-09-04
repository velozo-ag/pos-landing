// Configuración centralizada de enlaces externos y canales de conversión
export const SITE_CONFIG = {
  name: "Roosty POS",
  description: "Software de punto de venta y gestión gastronómica en la nube.",
  whatsapp: {
    display: "+54 3482 626653",
    number: "5493482626653",
  },
  urls: {
    // Entorno SaaS central (Demo y Registro autogestionado)
    saasApp: "https://pos.roosty.site",
    saasRegister: "https://pos.roosty.site/registro",
    saasLogin: "https://pos.roosty.site/login",
    
    // Canal de Ventas Asistidas (WhatsApp)
    whatsappSales: "https://wa.me/5493482626653?text=Hola%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20Roosty%20POS",
    whatsappGeneral: "https://wa.me/5493482626653",
  },
};

export const getWhatsAppLink = (message) => {
  const base = `https://wa.me/${SITE_CONFIG.whatsapp.number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};
