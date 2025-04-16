import React from 'react';
import { SiInstagram, SiFacebook, SiWhatsapp, SiTiktok } from 'react-icons/si';

const socialLinks = {
  instagram: 'https://instagram.com/jumiscakestudio',
  facebook: 'https://facebook.com/jumiscakestudio',
  whatsapp: 'https://wa.me/+447467548812',
  tiktok: 'https://tiktok.com/@jumiscakes_events',
};

interface SocialIconsProps {
  iconSize?: string | number;
  className?: string;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ iconSize = 24, className = '' }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <SiInstagram size={iconSize} className="text-gray-600 hover:text-brand-orange transition-colors duration-300" />
      </a>
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <SiFacebook size={iconSize} className="text-gray-600 hover:text-brand-orange transition-colors duration-300" />
      </a>
      <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <SiWhatsapp size={iconSize} className="text-gray-600 hover:text-green-500 transition-colors duration-300" />
      </a>
      <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
        <SiTiktok size={iconSize} className="text-gray-600 hover:text-brand-orange transition-colors duration-300" />
      </a>
    </div>
  );
};
