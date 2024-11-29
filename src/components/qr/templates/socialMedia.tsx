// src/components/qr/templates/socialMedia.ts

import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
  GitHub,
  Language,
} from "@mui/icons-material";

export interface SocialTemplate {
  id: string;
  name: string;
  icon: typeof Facebook; // Icon component type
  urlPrefix: string;
  placeholder: string;
  color: string;
}

export const socialTemplates: SocialTemplate[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    urlPrefix: "https://facebook.com/",
    placeholder: "kullanıcı-adı",
    color: "#1877F2",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    urlPrefix: "https://instagram.com/",
    placeholder: "kullanıcı-adı",
    color: "#E4405F",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    urlPrefix: "https://twitter.com/",
    placeholder: "kullanıcı-adı",
    color: "#1DA1F2",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: LinkedIn,
    urlPrefix: "https://linkedin.com/in/",
    placeholder: "kullanıcı-adı",
    color: "#0A66C2",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: YouTube,
    urlPrefix: "https://youtube.com/",
    placeholder: "kanal-adı",
    color: "#FF0000",
  },
  {
    id: "github",
    name: "GitHub",
    icon: GitHub,
    urlPrefix: "https://github.com/",
    placeholder: "kullanıcı-adı",
    color: "#181717",
  },
  {
    id: "custom",
    name: "Özel URL",
    icon: Language,
    urlPrefix: "",
    placeholder: "https://website.com",
    color: "#000000",
  },
];
