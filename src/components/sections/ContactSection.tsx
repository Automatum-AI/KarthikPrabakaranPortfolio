import React, { useState } from 'react';
import { SpaceHUD } from '../SpaceHUD';
import { SectionLayout, ThreeColumnLayout } from '../SectionLayout';
import { contactMethods, contactInfo, socialLinks, collaborationTypes, additionalChannels, sectionLabels } from '../../content';
import { useResponsive } from '../ui/responsive-context';

interface ContactSectionProps {
  isActive: boolean;
}

export function ContactSection({ isActive }: ContactSectionProps) {
  const responsive = useResponsive();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });



  return (
    <SectionLayout isActive={isActive} sectionId="contact">
      <ThreeColumnLayout
        left={
          <div className="flex flex-col h-full hud-stagger-1" style={{ gap: `${responsive.spacing['2xl']}px` }}>
            <div className="flex flex-col" style={{ gap: `${responsive.spacing.lg}px` }}>
              <div className="flex items-center" style={{ gap: `${responsive.spacing.md}px` }}>
                <div className="w-3 h-3 rounded-full bg-[#20DBE9] animate-pulse"></div>
                <span className="text-white font-mono tracking-wider uppercase" style={{ fontSize: `${responsive.fontSize.lg}px` }}>
                  CONTACT INFO
                </span>
              </div>
              
              <div className="font-medium text-white/60" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                <p>MOBILE NUMBER</p>
              </div>
              <div 
                className="font-bold"
                style={{ 
                  fontSize: `${responsive.fontSize.xl}px`,
                  color: '#20DBE9',
                  textShadow: '0 0 15px rgba(32, 219, 233, 0.8)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                <p>{contactInfo.mobile}</p>
              </div>
            </div>
            
            <div className="flex flex-col" style={{ gap: `${responsive.spacing.sm}px` }}>
              <div className="font-medium text-white/60" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                <p>EMAIL</p>
              </div>
              <div 
                className="font-bold"
                style={{ 
                  fontSize: `${responsive.fontSize.base}px`,
                  color: '#20DBE9',
                  textShadow: '0 0 15px rgba(32, 219, 233, 0.8)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                <p>{contactInfo.email}</p>
              </div>
            </div>
            
            <div className="flex flex-col" style={{ gap: `${responsive.spacing.sm}px` }}>
              <div className="font-medium text-white/60" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                <p>LOCATION</p>
              </div>
              <div 
                className="font-bold"
                style={{ 
                  fontSize: `${responsive.fontSize.xl}px`,
                  color: '#20DBE9',
                  textShadow: '0 0 15px rgba(32, 219, 233, 0.8)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                <p>{contactInfo.location}</p>
              </div>
            </div>
          </div>
        }
        middle={
          <div className="hud-stagger-4 h-full flex flex-col">
            <SpaceHUD variant="accent" title={sectionLabels.contact.missionBriefingTitle} size="large" glow={true}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${responsive.spacing.lg}px` }}>
                {/* Header */}
                <div className="text-center pb-4 border-b border-[#20DBE9]/20">
                  <h3 className="text-[#20DBE9] mb-2" style={{ textShadow: '0 0 10px rgba(32, 219, 233, 0.6)' }}>
                    Initiate Contact Protocol
                  </h3>
                  <p className="text-white/50" style={{ fontSize: `${responsive.fontSize.base * 0.875}px` }}>
                    Ready to collaborate on your next project
                  </p>
                </div>
                
                {/* Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${responsive.spacing.md}px` }}>
                  <div className="grid grid-cols-2" style={{ gap: `${responsive.spacing.md}px` }}>
                    <div>
                      <label className="block text-[#20DBE9]/80 mb-2 uppercase tracking-wide" style={{ fontSize: `${responsive.fontSize.base * 0.75}px` }}>
                        Name
                      </label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/40 border border-[#20DBE9]/30 rounded text-white focus:outline-none focus:border-[#20DBE9] focus:bg-black/60 transition-all"
                        style={{ 
                          padding: `${responsive.spacing.sm}px ${responsive.spacing.sm}px`,
                          fontSize: `${responsive.fontSize.base * 0.875}px`
                        }}
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#20DBE9]/80 mb-2 uppercase tracking-wide" style={{ fontSize: `${responsive.fontSize.base * 0.75}px` }}>
                        Email
                      </label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/40 border border-[#20DBE9]/30 rounded text-white focus:outline-none focus:border-[#20DBE9] focus:bg-black/60 transition-all"
                        style={{ 
                          padding: `${responsive.spacing.sm}px ${responsive.spacing.sm}px`,
                          fontSize: `${responsive.fontSize.base * 0.875}px`
                        }}
                        placeholder="email@domain.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[#20DBE9]/80 mb-2 uppercase tracking-wide" style={{ fontSize: `${responsive.fontSize.base * 0.75}px` }}>
                      Project Type
                    </label>
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                      className="w-full bg-black/40 border border-[#20DBE9]/30 rounded text-white focus:outline-none focus:border-[#20DBE9] focus:bg-black/60 transition-all appearance-none cursor-pointer"
                      style={{
                        padding: `${responsive.spacing.sm}px ${responsive.spacing.sm}px`,
                        fontSize: `${responsive.fontSize.base * 0.875}px`,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2320DBE9' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="">Select project type...</option>
                      <option>Brand Identity</option>
                      <option>AI Implementation</option>
                      <option>Web Development</option>
                      <option>Consultation</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#20DBE9]/80 mb-2 uppercase tracking-wide" style={{ fontSize: `${responsive.fontSize.base * 0.75}px` }}>
                      Message
                    </label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-black/40 border border-[#20DBE9]/30 rounded text-white focus:outline-none focus:border-[#20DBE9] focus:bg-black/60 transition-all resize-none"
                      style={{ 
                        padding: `${responsive.spacing.sm}px ${responsive.spacing.sm}px`,
                        fontSize: `${responsive.fontSize.base * 0.875}px`
                      }}
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4 border-t border-[#20DBE9]/20">
                  <button
                    className="w-full uppercase tracking-wider transition-all duration-300 relative overflow-hidden group rounded"
                    style={{
                      padding: `${responsive.spacing.sm}px ${responsive.spacing.lg}px`,
                      fontSize: `${responsive.fontSize.base}px`,
                      border: '2px solid #20DBE9',
                      backgroundColor: 'rgba(32, 219, 233, 0.1)',
                      color: '#20DBE9',
                      boxShadow: '0 0 15px rgba(32, 219, 233, 0.3)',
                      textShadow: '0 0 10px rgba(32, 219, 233, 0.8)'
                    }}
                  >
                    <span className="relative z-10">Send Message</span>
                    
                    {/* Scan effect on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(32, 219, 233, 0.4), transparent)',
                        animation: 'advanced-scan-horizontal 2s ease-in-out infinite'
                      }}
                    />
                  </button>
                </div>
              </div>
            </SpaceHUD>
          </div>
        }
        right={
          <div className="hud-stagger-5">
            <SpaceHUD variant="accent" title={sectionLabels.contact.socialLinksTitle} size="medium" glow={true}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${responsive.spacing.md}px` }}>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative overflow-hidden"
                  >
                    <div 
                      className="flex items-center rounded transition-all duration-300 relative z-10"
                      style={{
                        gap: `${responsive.spacing.md}px`,
                        padding: `${responsive.spacing.md}px`,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        border: `2px solid ${link.color}40`,
                        boxShadow: `0 0 10px ${link.color}20`
                      }}
                    >
                      {/* Icon */}
                      <div 
                        className="transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                        style={{
                          fontSize: `${responsive.fontSize['2xl']}px`,
                          filter: `drop-shadow(0 0 8px ${link.color}80)`
                        }}
                      >
                        {link.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div 
                          className="font-mono uppercase tracking-wider transition-all duration-300 mb-1"
                          style={{ 
                            fontSize: `${responsive.fontSize.base * 0.75}px`,
                            color: link.color,
                            textShadow: `0 0 8px ${link.color}80`
                          }}
                        >
                          {link.name}
                        </div>
                        <div className="text-white/80 truncate" style={{ fontSize: `${responsive.fontSize.base * 0.875}px` }}>
                          {link.url.replace('mailto:', '').replace('https://', '').replace('http://', '')}
                        </div>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div 
                        className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                        style={{ fontSize: `${responsive.fontSize.lg}px`, color: link.color }}
                      >
                        →
                      </div>
                    </div>
                    
                    {/* Hover scan effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${link.color}60, transparent)`,
                        animation: 'advanced-scan-horizontal 2s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Border glow on hover */}
                    <div 
                      className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow: `0 0 20px ${link.color}40, inset 0 0 10px ${link.color}20`
                      }}
                    />
                  </a>
                ))}
              </div>
            </SpaceHUD>
          </div>
        }
      />
    </SectionLayout>
  );
}
