
export const siteConfig = {
  name: "Deevabits Green Energy",
  description: "Empowering Kenya with clean, reliable solar energy solutions. From households to enterprises, we light up lives sustainably.",
  url: "https://deevabits.co.ke",
  
  contact: {
    phone: "+254 774 750 000",
    whatsapp: "+254774750000",
    email: "info@deevabits.com",
    address: {
      street: "Kimathi Street",
      city: "Nairobi",
      country: "Kenya",
      full: "CBD, Kimathi Street, Nairobi, Kenya"
    }
  },
  
  social: {
    facebook: "https://facebook.com/deevabits",
    twitter: "https://twitter.com/deevabits", 
    instagram: "https://instagram.com/deevabits",
    linkedin: "https://linkedin.com/company/deevabits"
  },
  
  business: {
    founded: "2016",
    experience: "8+",
    homespowered: "5000+",
    jobsCreated: "50+",
    co2Saved: "2M+"
  }
} as const;

export type SiteConfig = typeof siteConfig;
