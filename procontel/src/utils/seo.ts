export const siteConfig = {
  name: "Procontel SB",
  description: "Soluciones de facturación electrónica para empresas en Colombia",
  url: "https://procontel-sb.vercel.app",
  ogImage: "https://via.placeholder.com/1200x630?text=Procontel+SB",
  links: {
    facebook: "https://www.facebook.com/profile.php?id=61569872082102",
    instagram: "https://www.instagram.com/procontel_sb/",
    whatsapp: "https://wa.me/573114678137",
    email: "mailto:procontelsb1@gmail.com",
  },
}

export type MetadataProps = {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function generateMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  url = siteConfig.url,
}: MetadataProps = {}) {
  return {
    title: title === siteConfig.name ? title : `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      title: title === siteConfig.name ? title : `${title} | ${siteConfig.name}`,
      description,
      images: [{ url: image }],
      url,
      siteName: siteConfig.name,
      locale: "es_CO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title === siteConfig.name ? title : `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    metadataBase: new URL(url),
  }
}
