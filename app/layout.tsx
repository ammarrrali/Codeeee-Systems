import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // 1. Updated Title & Description for the new AI/Automation focus
  title: "Codeeee | Next-Gen Web Apps & AI Automation",
  description:
    "Codeeee engineers high-performance web applications and AI-driven workflow automations using Python, Java, and Next.js. Modern systems for the next generation of business.",
  
  // 2. Technical Verifications
  verification: {
    google: "google4c49131ec1cbc1e6.html",
  },
  
  // 3. Expanded Keywords for better reach
  keywords: [
    "Codeeee",
    "AI Automation",
    "Workflow Automation",
    "Next.js Web Apps",
    "Python Automation",
    "Java Software Development",
    "Software Company Karachi",
    "SEO Optimization Services",
  ],

  // 4. Social Media (OpenGraph) Optimization
  openGraph: {
    title: "Codeeee | AI & Software Engineering",
    description:
      "Premium web systems and intelligent automation engineered by Codeeee.",
    url: "https://codeeee.build", // Replace with your final domain
    siteName: "Codeeee",
    images: [
      {
        url: "/og.png", // Ensure this image is in your /public folder
        width: 1200,
        height: 630,
        alt: "Codeeee - Next Gen Web Apps"
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 5. Twitter Card for professional sharing
  twitter: {
    card: "summary_large_image",
    title: "Codeeee | Next-Gen Web Apps",
    description: "AI-driven workflow automations and premium software.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data: 
          This tells Google specifically that Codeeee is a 'Professional Service'.
          This is huge for SEO because it helps you show up for "Software Company" 
          searches with more authority.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Codeeee",
              "image": "https://codeeee.build/og.png",
              "description": "Codeeee develops next-gen web apps and AI automations using Python, Java, and Next.js.",
              "url": "https://codeeee.build",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Karachi",
                "addressCountry": "PK"
              },
              "serviceType": [
                "Web App Development",
                "AI Automation",
                "Workflow Automation",
                "SEO Optimization"
              ]
            }),
          }}
        />
      </head>
      {/* Added antialiased for cleaner font rendering on mobile and desktop */}
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}