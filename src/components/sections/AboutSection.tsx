import React from 'react';
import profileImage from "figma:asset/ccb5263e68f9d44fca6b4c7c752e36a4e840e93f.png";
import { PrimarySpaceHUD, SecondarySpaceHUD, AccentSpaceHUD } from '../SpaceHUD';
import { SectionLayout, ThreeColumnLayout } from '../SectionLayout';
import { useResponsive } from '../ui/responsive-context';
import { profileData } from '../../content/website-content';

const AboutSection = ({ isActive }: { isActive: boolean }) => {
  const responsive = useResponsive();
  let nameFontSize = 48;
  let titleFontSize = 44;
  let statFontSize = 24;
  let gapSize = 12;
  if (responsive.width <= 1200) {
    nameFontSize = 36;
    titleFontSize = 32;
    statFontSize = 20;
    gapSize = 10;
  } else if (responsive.width <= 1600) {
    nameFontSize = 42;
    titleFontSize = 38;
    statFontSize = 22;
    gapSize = 11;
  }
  return (
    <SectionLayout isActive={isActive} sectionId="about">
      <ThreeColumnLayout
        left={
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col hud-stagger-1" style={{ gap: `${responsive.spacing.lg}px` }}>
              <div className="flex flex-col text-white" style={{ gap: `${responsive.spacing.md}px` }}>
                <div className="font-bold text-[#facc14] uppercase" style={{ fontSize: `${nameFontSize}px`, lineHeight: '1.1' }}>
                  <p>KARTHIK PRABAKARAN</p>
                </div>
                <div className="font-normal text-white uppercase" style={{ fontSize: `${titleFontSize * 0.4}px`, lineHeight: '1.2' }}>
                  <p>Sr. Graphic Designer | AI Generalist</p>
                </div>
              </div>
            </div>
            <div className="flex hud-stagger-2" style={{ gap: `${Math.min(gapSize * 2, responsive.spacing.lg)}px` }}>
              <div className="flex flex-col text-white" style={{ gap: `${responsive.spacing.sm}px` }}>
                <div className="font-medium" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                  <p>EXPERIENCE</p>
                </div>
                <div className="font-bold" style={{ fontSize: `${statFontSize}px` }}>
                  <p>10+ YEARS</p>
                </div>
              </div>
              <div className="flex flex-col text-white" style={{ gap: `${responsive.spacing.sm}px` }}>
                <div className="font-medium" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                  <p>LOCATION</p>
                </div>
                <div className="font-bold" style={{ fontSize: `${statFontSize}px` }}>
                  <p>BANGALORE</p>
                </div>
              </div>
            </div>
            
            <div className="hud-stagger-3">
              <button
                onClick={e => {
                  console.log('Download Resume button clicked');
                  // Click effect
                  if (e.currentTarget) {
                    e.currentTarget.classList.add('clicked');
                    setTimeout(() => {
                      if (e.currentTarget) e.currentTarget.classList.remove('clicked');
                    }, 200);
                  }
                  // Download resume
                  const link = document.createElement('a');
                  link.href = 'https://automatum-ai.github.io/KarthikPrabakaranPortfolio/Karthik%20Prabakaran_Resume.pdf';
                  link.download = 'Karthik Prabakaran_Resume.pdf';
                  document.body.appendChild(link);
                  console.log('Download link created:', link.href);
                  link.click();
                  setTimeout(() => {
                    document.body.removeChild(link);
                    console.log('Download link removed from DOM');
                  }, 1000);
                }}
                className="font-mono uppercase tracking-wide transition-all duration-300 relative overflow-hidden w-full resume-download-btn"
                style={{
                  border: '2px solid #FACC14',
                  backgroundColor: 'black',
                  color: '#FACC14',
                  boxShadow: '0 0 20px #FACC1440, inset 0 0 10px #FACC1420',
                  textShadow: '0 0 8px #FACC14',
                  padding: `${responsive.spacing.sm}px ${Math.max(responsive.spacing.sm, 8)}px`,
                  fontSize: `${Math.max(responsive.fontSize.base * 0.65, 10)}px`,
                  minHeight: '40px',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  overflow: 'hidden'
                }}
              >
                <span className="relative z-10 flex items-center justify-center" style={{ gap: `${responsive.spacing.xs}px` }}>
                  <span>↓</span>
                  <span>DOWNLOAD RESUME</span>
                </span>
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #FACC1440, transparent)',
                    animation: 'advanced-scan-horizontal 3s ease-in-out infinite'
                  }}
                />
              </button>
            </div>
          </div>
        }
        middle={
          <div className="flex flex-col h-full" style={{ gap: `${responsive.spacing.lg}px` }}>
            <div className="hud-stagger-4">
              <PrimarySpaceHUD title="SUMMARY" size="medium" glow={true}>
                <div className="font-medium text-white leading-relaxed" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                  <p>{profileData.bio}</p>
                </div>
              </PrimarySpaceHUD>
            </div>
            <div className="flex items-center justify-center flex-1 hud-stagger-5">
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ maxWidth: responsive.width <= 1200 ? '250px' : '350px' }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg flex items-center justify-center">
                  <img alt="Profile" className="w-full h-full object-contain" src={profileImage} />
                </div>
              </div>
            </div>
          </div>
        }
        right={
          <div className="flex flex-col h-full" style={{ gap: `${responsive.spacing.lg}px` }}>
            <div className="hud-stagger-5">
              <SecondarySpaceHUD title="BASIC DETAILS" glow={true}>
                <div className="flex flex-col text-white" style={{ gap: `${responsive.spacing.md}px` }}>
                  <div className="flex flex-col" style={{ gap: `${responsive.spacing.xs}px` }}>
                    <span className="opacity-80 font-medium" style={{ fontSize: `${responsive.fontSize.base * 0.875}px` }}>DOB</span>
                    <span className="font-bold" style={{ fontSize: `${responsive.fontSize.lg * 1.1}px` }}>09-04-1992</span>
                  </div>
                  <div className="flex flex-col" style={{ gap: `${responsive.spacing.xs}px` }}>
                    <span className="opacity-80 font-medium" style={{ fontSize: `${responsive.fontSize.base * 0.875}px` }}>Marital Status</span>
                    <span className="font-bold" style={{ fontSize: `${responsive.fontSize.lg * 1.1}px` }}>Married</span>
                  </div>
                  <div className="flex flex-col" style={{ gap: `${responsive.spacing.xs}px` }}>
                    <span className="opacity-80 font-medium" style={{ fontSize: `${responsive.fontSize.base * 0.875}px` }}>Languages</span>
                    <span className="font-bold" style={{ fontSize: `${responsive.fontSize.lg * 1.1}px` }}>Tamil, English</span>
                  </div>
                </div>
              </SecondarySpaceHUD>
            </div>
            <div className="hud-stagger-6">
              <AccentSpaceHUD title="CORE SKILLS" glow={true}>
                <div className="flex flex-col font-medium text-white" style={{ gap: `${responsive.spacing.sm}px`, fontSize: `${responsive.fontSize.base}px` }}>
                  {['Graphic Design', 'UI/UX', 'Prompt Engineering', 'Gen AI', 'Development', 'Automation'].map((skill) => (
                    <div key={skill}>
                      <ul>
                        <li className="list-disc ml-6">
                          <span>{skill}</span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </AccentSpaceHUD>
            </div>
            <div className="hud-stagger-7">
              <SecondarySpaceHUD title="EDUCATION" glow={true}>
                <div className="flex justify-between items-start" style={{ gap: `${responsive.spacing.md}px` }}>
                  <div className="flex flex-col font-medium text-white" style={{ gap: `${responsive.spacing.sm}px`, fontSize: `${responsive.fontSize.base}px` }}>
                    <ul>
                      <li className="list-disc ml-6">
                        <span>B.E (EEE)</span>
                      </li>
                    </ul>
                    <ul>
                      <li className="list-disc ml-6">
                        <span>AI Technology</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col font-medium text-white text-right" style={{ gap: `${responsive.spacing.sm}px`, fontSize: `${responsive.fontSize.base * 0.875}px` }}>
                    <span>2010 - 2015</span>
                    <span>2023 - 2024</span>
                  </div>
                </div>
              </SecondarySpaceHUD>
            </div>
          </div>
        }
      />
    </SectionLayout>
  );
};

export default AboutSection;
