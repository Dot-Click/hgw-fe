import Link from 'next/link';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';

const Footer = () => {
  const quickLinks = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Leaderboard', path: '/leaderboard' },
    { id: 3, name: 'Database', path: '/database' },
    { id: 4, name: 'Podcast', path: '/podcast' },
    { id: 5, name: 'Articles', path: '/articles' },
    { id: 6, name: 'About', path: '/about' },
  ];

  const socialLinks = [
    { id: 1, name: 'Twitter / X', path: '#', icon: <FaTwitter /> },
    { id: 2, name: 'Instagram', path: '#', icon: <FaInstagram /> },
    { id: 3, name: 'YouTube', path: '#', icon: <FaYoutube /> },
    { id: 4, name: 'TikTok', path: '#', icon: <FaTiktok /> },
  ];

  return (
    <footer className="w-full bg-[#0D0E12] border-t border-[#24262E] pt-16 pb-8 px-6 md:px-12 lg:px-20 outfit">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Branding Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="HGW Legend Vault" className="h-10 md:h-8 object-contain" />
          </div>
          <p className="text-[#7B899D]  text-[15px] font-[400] max-w-[280px]">
            The definitive archive ranking the greatest legends of sport and culture.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h2 className="orbitron text-white text-[16px] font-bold tracking-widest">QUICK LINKS</h2>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.path} className="text-[#7B899D] hover:text-[#00CCFF] transition-colors text-[16px]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col gap-6">
          <h2 className="orbitron text-white text-[16px] font-bold tracking-widest">FOLLOW US</h2>
          <ul className="flex flex-col gap-4">
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a href={social.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#7B899D] hover:text-[#00CCFF] transition-colors text-[15px]">
                  <span className="text-lg">{social.icon}</span> {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="orbitron text-white text-[16px] font-bold tracking-widest">NEWSLETTER</h2>
            <p className="text-[#7B899D] text-[15px]">Weekly legend breakdowns and rankings.</p>
          </div>

          <div className="relative flex items-center gap-2 w-full max-w-[340px]">
            <div className="relative flex-1">
              <MdOutlineMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B899D] text-xl" />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#1B1C22] border border-[#24262E] rounded-xl py-3 pl-12 pr-4 text-white text-[15px] outline-none focus:border-[#00CCFF80] transition-colors"
                id="newsletter-email"
              />
            </div>
            <button className="bg-[#00CCFF] text-[#0B0B0F] font-bold px-6 py-3 rounded-xl orbitron text-[13px] shadow-[0_0_20px_#00CCFF4D] hover:bg-[#00e1ff] transition-all cursor-pointer">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-[#24262E] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[#7B899D] text-[15px]">
          &copy; 2026 HGW Legend Vault. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-[#7B899D] hover:text-[#00CCFF] transition-colors text-[15px]">Privacy Policy</Link>
          <Link href="/terms" className="text-[#7B899D] hover:text-[#00CCFF] transition-colors text-[15px]">Terms of Use</Link>
          <Link href="/contact" className="text-[#7B899D] hover:text-[#00CCFF] transition-colors text-[15px]">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
