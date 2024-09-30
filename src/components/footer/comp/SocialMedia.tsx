import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,

} from 'lucide-react';

const socialMedia = [
  { name: 'Facebook', href: 'https://facebook.com', Icon: Facebook, color: 'hover:text-blue-600' },
  { name: 'Instagram', href: 'https://instagram.com', Icon: Instagram, color: 'hover:text-pink-500' },
  { name: 'Twitter', href: 'https://twitter.com', Icon: Twitter, color: 'hover:text-blue-400' },
  { name: 'YouTube', href: 'https://youtube.com', Icon: Youtube, color: 'hover:text-red-600' },
  // { name: 'Pinterest', href: 'https://pinterest.com', Icon: Pinterest, color: 'hover:text-red-500' },
  // { name: 'Snapchat', href: 'https://snapchat.com', Icon: Snapchat, color: 'hover:text-yellow-500' },
  // { name: 'TikTok', href: 'https://tiktok.com', Icon: Tiktok, color: 'hover:text-black' },
];

export default function SocialMedia () {
  return (
    <div>
      <h2 className="text-xl-semi-darker mb-2">Stay Connected</h2>
      <div className="flex space-x-4">
        {socialMedia.map(({ name, href, Icon, color }) => (
          <Link key={name} href={href} aria-label={name}>
            <Icon className={`icon ${color}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};


