import React, { useState } from 'react';
import { SpaceHUD } from '../../SpaceHUD';
import { contactInfo, socialLinks } from '../../../content/website-content';

interface MobileContactSectionProps {
  isActive: boolean;
}

export function MobileContactSection({ isActive }: MobileContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });



  return (
    <div 
      className="section-wrapper"
      data-section="contact"
      data-active={isActive}
    >
      <div className="h-full w-full flex flex-col px-4 py-4">
        <div className="flex-1 flex flex-col justify-evenly gap-3 overflow-y-auto">
          {/* Header */}
          <div className="hud-stagger-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#20DBE9] animate-pulse"></div>
              <span className="text-white font-mono uppercase tracking-wider"
                    style={{ fontSize: 'clamp(12px, 3.5vw, 16px)' }}>
                CONTACT INFO
              </span>
            </div>
          </div>

          {/* Contact Details Row 1 */}
          <div className="flex gap-4 hud-stagger-2">
            <div className="flex flex-col gap-1 text-white">
              <div style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>MOBILE</div>
              <div style={{ 
                fontSize: 'clamp(16px, 4.5vw, 20px)', 
                fontWeight: 900,
                color: '#20DBE9',
                textShadow: '0 0 12px rgba(32, 219, 233, 0.8)'
              }}>
                {contactInfo.mobile}
              </div>
            </div>
          </div>

          {/* Contact Details Row 2 */}
          <div className="flex gap-4 hud-stagger-3">
            <div className="flex flex-col gap-1 text-white">
              <div style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>EMAIL</div>
              <div style={{ 
                fontSize: 'clamp(13px, 3.8vw, 16px)', 
                fontWeight: 900,
                color: '#20DBE9',
                textShadow: '0 0 12px rgba(32, 219, 233, 0.8)'
              }}>
                {contactInfo.email}
              </div>
            </div>
          </div>

          {/* Contact Details Row 3 */}
          <div className="flex gap-4 hud-stagger-4">
            <div className="flex flex-col gap-1 text-white">
              <div style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>LOCATION</div>
              <div style={{ 
                fontSize: 'clamp(16px, 4.5vw, 20px)', 
                fontWeight: 900,
                color: '#20DBE9',
                textShadow: '0 0 12px rgba(32, 219, 233, 0.8)'
              }}>
                {contactInfo.location}
              </div>
            </div>
          </div>

          {/* Social Links */}
          {socialLinks.map((social, index) => (
            <div key={social.name} className={`flex gap-4 hud-stagger-${index + 5}`}>
              <div className="flex flex-col gap-1 text-white">
                <div style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>{social.name.toUpperCase()}</div>
                <a 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:opacity-80"
                  style={{ 
                    fontSize: 'clamp(14px, 4vw, 18px)', 
                    fontWeight: 900,
                    color: social.color,
                    textShadow: `0 0 12px ${social.color}80`,
                    textDecoration: 'none'
                  }}
                >
                  {social.icon} {social.url.replace('mailto:', '').replace('https://', '')}
                </a>
              </div>
            </div>
          ))}

          {/* Contact Form */}
          <div className="hud-stagger-8 mb-4">
            <SpaceHUD variant="accent" title="SEND MESSAGE" size="small" glow={true}>
              <div className="space-y-3">
                <div>
                  <label className="text-white/60 font-mono uppercase block mb-1"
                         style={{ fontSize: 'clamp(10px, 3vw, 11px)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-black/50 border text-white font-mono"
                    style={{
                      borderColor: '#20DBE940',
                      fontSize: 'clamp(12px, 3.5vw, 14px)'
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-white/60 font-mono uppercase block mb-1"
                         style={{ fontSize: 'clamp(10px, 3vw, 11px)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 bg-black/50 border text-white font-mono"
                    style={{
                      borderColor: '#20DBE940',
                      fontSize: 'clamp(12px, 3.5vw, 14px)'
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="text-white/60 font-mono uppercase block mb-1"
                         style={{ fontSize: 'clamp(10px, 3vw, 11px)' }}>
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 bg-black/50 border text-white font-mono resize-none"
                    style={{
                      borderColor: '#20DBE940',
                      fontSize: 'clamp(12px, 3.5vw, 14px)'
                    }}
                    placeholder="Your message..."
                  />
                </div>

                <button
                  className="w-full px-4 py-3 font-mono uppercase tracking-widest transition-all duration-300 relative overflow-hidden"
                  style={{
                    border: '2px solid #20DBE9',
                    backgroundColor: 'rgba(32, 219, 233, 0.1)',
                    color: '#20DBE9',
                    boxShadow: '0 0 20px rgba(32, 219, 233, 0.3)',
                    textShadow: '0 0 8px rgba(32, 219, 233, 0.8)',
                    fontSize: 'clamp(11px, 3.2vw, 13px)'
                  }}
                >
                  <span className="relative z-10">SEND TRANSMISSION</span>
                  <div 
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(32, 219, 233, 0.4), transparent)',
                      animation: 'advanced-scan-horizontal 3s ease-in-out infinite'
                    }}
                  />
                </button>
              </div>
            </SpaceHUD>
          </div>
        </div>
      </div>
    </div>
  );
}
