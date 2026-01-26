'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const greatThingsImg = '/assets/greatthings.png'
const aboutus = '/assets/aboutus.png'
const welcome = '/assets/welcome.png'
const contactFormIcon = '/assets/contact-form.png'
const raiseHandIcon = '/assets/raise-hand.png'
const socialMediaIcon = '/assets/social-media.png'

// --- 1. FUZZY TEXT COMPONENT (Your provided code) ---
const FuzzyText = ({
  children,
  fontSize = 'clamp(2rem, 10vw, 10rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
  fps = 60,
  direction = 'horizontal',
  transitionDuration = 0,
  clickEffect = false,
  glitchMode = false,
  glitchInterval = 2000,
  glitchDuration = 200,
  gradient = null,
  letterSpacing = 0,
  className = '',
  hovered // New prop to control hover state externally
}) => {
  const canvasRef = useRef(null);
  const hoveredRef = useRef(hovered);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    let animationFrameId;
    let isCancelled = false;
    let glitchTimeoutId;
    let glitchEndTimeoutId;
    let clickTimeoutId;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;

      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      const fontString = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;

      try {
        await document.fonts.load(fontString);
      } catch {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      let numericFontSize;
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement('span');
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize);
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join('');

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      let totalWidth = 0;
      if (letterSpacing !== 0) {
        for (const char of text) {
          totalWidth += offCtx.measureText(char).width + letterSpacing;
        }
        totalWidth -= letterSpacing;
      } else {
        totalWidth = offCtx.measureText(text).width;
      }

      const metrics = offCtx.measureText(text);
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = letterSpacing !== 0 ? totalWidth : (metrics.actualBoundingBoxRight ?? metrics.width);
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(letterSpacing !== 0 ? totalWidth : actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
        const grad = offCtx.createLinearGradient(0, 0, offscreenWidth, 0);
        gradient.forEach((c, i) => grad.addColorStop(i / (gradient.length - 1), c));
        offCtx.fillStyle = grad;
      } else {
        offCtx.fillStyle = color;
      }

      if (letterSpacing !== 0) {
        let xPos = xOffset;
        for (const char of text) {
          offCtx.fillText(char, xPos, actualAscent);
          xPos += offCtx.measureText(char).width + letterSpacing;
        }
      } else {
        offCtx.fillText(text, xOffset - actualLeft, actualAscent);
      }

      const horizontalMargin = fuzzRange + 20;
      const verticalMargin = direction === 'vertical' || direction === 'both' ? fuzzRange + 10 : 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      let isClicking = false;
      let isGlitching = false;
      let currentIntensity = baseIntensity;
      let targetIntensity = baseIntensity;
      let lastFrameTime = 0;
      const frameDuration = 1000 / fps;

      const startGlitchLoop = () => {
        if (!glitchMode || isCancelled) return;
        glitchTimeoutId = setTimeout(() => {
          if (isCancelled) return;
          isGlitching = true;
          glitchEndTimeoutId = setTimeout(() => {
            isGlitching = false;
            startGlitchLoop();
          }, glitchDuration);
        }, glitchInterval);
      };

      if (glitchMode) startGlitchLoop();

      const run = timestamp => {
        if (isCancelled) return;

        if (timestamp - lastFrameTime < frameDuration) {
          animationFrameId = window.requestAnimationFrame(run);
          return;
        }
        lastFrameTime = timestamp;

        ctx.clearRect(
          -fuzzRange - 20,
          -fuzzRange - 10,
          offscreenWidth + 2 * (fuzzRange + 20),
          tightHeight + 2 * (fuzzRange + 10)
        );

        if (isClicking) {
          targetIntensity = 1;
        } else if (isGlitching) {
          targetIntensity = 1;
        } else if (isHovering || hoveredRef.current) {
          targetIntensity = hoverIntensity;
        } else {
          targetIntensity = baseIntensity;
        }

        if (transitionDuration > 0) {
          const step = 1 / (transitionDuration / frameDuration);
          if (currentIntensity < targetIntensity) {
            currentIntensity = Math.min(currentIntensity + step, targetIntensity);
          } else if (currentIntensity > targetIntensity) {
            currentIntensity = Math.max(currentIntensity - step, targetIntensity);
          }
        } else {
          currentIntensity = targetIntensity;
        }

        for (let j = 0; j < tightHeight; j++) {
          let dx = 0,
            dy = 0;
          if (direction === 'horizontal' || direction === 'both') {
            dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
          }
          if (direction === 'vertical' || direction === 'both') {
            dy = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange * 0.5);
          }
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j + dy, offscreenWidth, 1);
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      animationFrameId = window.requestAnimationFrame(run);

      const isInsideTextArea = (x, y) => {
        return x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;
      };

      const handleMouseMove = e => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      const handleClick = () => {
        if (!clickEffect) return;
        isClicking = true;
        clearTimeout(clickTimeoutId);
        clickTimeoutId = setTimeout(() => {
          isClicking = false;
        }, 150);
      };

      const handleTouchMove = e => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleTouchEnd = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);
      }

      if (clickEffect) {
        canvas.addEventListener('click', handleClick);
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        clearTimeout(glitchTimeoutId);
        clearTimeout(glitchEndTimeoutId);
        clearTimeout(clickTimeoutId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        }
        if (clickEffect) {
          canvas.removeEventListener('click', handleClick);
        }
      };

      canvas.cleanupFuzzyText = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      clearTimeout(glitchTimeoutId);
      clearTimeout(glitchEndTimeoutId);
      clearTimeout(clickTimeoutId);
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText();
      }
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
    fuzzRange,
    fps,
    direction,
    transitionDuration,
    clickEffect,
    glitchMode,
    glitchInterval,
    glitchDuration,
    gradient,
    letterSpacing
  ]);

  return <canvas ref={canvasRef} className={className} />;
}

// --- 2. COUNT UP HOOK ---
function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0)
  const rafRef = useRef()

  useEffect(() => {
    const start = performance.now()
    const step = (ts) => {
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return value
}

// --- 3. STAT CARD WITH FUZZY TEXT & ICONS ---
const StatCard = ({ icon, number, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-1 mr-5 border-2 border-[#FF0000] rounded-3xl p-6 text-left bg-[#02093D] backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div>
          {/* We use the FuzzyText component here instead of a simple h3 */}
          {/* fontSize={36} matches the original text-4xl size approximately */}
          <div className="mb-1 -ml-8">
            <FuzzyText
              fontSize={36}
              fontWeight={700}
              fontFamily="inherit"
              color="#fefefdff"
              className="font-['PPMori']"
              enableHover={false} // Disable internal hover, use external control
              hovered={isHovered} // Pass external hover state
              fuzzRange={12} // Moderate fuzz
            >
              {number.toString()}
            </FuzzyText>
          </div>

          <p className="mt-2 text-gray-300 font-['PPMori']">{label}</p>
        </div>
        <div className="w-16 h-16 flex items-center justify-center bg-[#02093D] rounded-2xl border-2 border-[#ff0000]">
          {icon}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ title, description, iconSrc, altText }) => {
  return (
    <div className="relative group bg-[#02093D] border border-[#FF0000] border-2 rounded-3xl p-8 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] overflow-hidden transform-gpu flex flex-col items-center">

      <div className="relative z-20 flex flex-col items-center w-full">
        <h3 className="text-2xl font-bold text-[#ef8f8fff] text-center mb-6 font-['PPMori']">{title}</h3>

        {/* Icon Container Wrapper */}
        <div className="relative mb-6 z-10">
          {/* Expanding Overlay */}
          <div className="absolute inset-0 bg-white/10 rounded-2xl scale-100 group-hover:scale-[25] transition-transform duration-1000 ease-in-out origin-center z-0 pointer-events-none"></div>

          {/* Actual Icon Box */}
          <div className="relative p-3 bg-[#02093D]  rounded-2xl border-2 border-[#ff0000] group-hover:border-white/50 transition-colors duration-300 z-10">
            <Image
              src={iconSrc}
              alt={altText}
              width={48}
              height={48}
              className="w-12 h-12"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>

        <p className="text-gray-300 text-base leading-relaxed font-['PPMori'] opacity-90 text-center transition-colors duration-300 group-hover:text-white">
          {description}
        </p>
      </div>
    </div>
  )
}

const AboutUs = () => {
  const registrationsTarget = 2000
  const participationsTarget = 180
  const reachTarget = 150000

  const registrations = useCountUp(registrationsTarget, 2500)
  const participations = useCountUp(participationsTarget, 2500)
  const reach = useCountUp(reachTarget, 2500)

  return (
    <section className="w-full py-20 bg-[#010524ff] text-white relative">

      <div className="max-w-[90vw] xl:max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl text-[#f17575ff] font-bold text-center mb-16 font-['PPMori'] tracking-tight">
          <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
            About Us
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 mb-12">
          {/* STAT CARD 1: Registrations */}
          <StatCard
            number={`${registrations}+`}
            label="Registrations"
            icon={
              <Image
                src={contactFormIcon}
                alt="Registrations"
                width={32}
                height={32}
                className="w-8 h-8"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            }
          />

          {/* STAT CARD 2: Participations */}
          <StatCard
            number={`${participations}+`}
            label="On-Campus Participations"
            icon={
              <Image
                src={raiseHandIcon}
                alt="On-Campus Participations"
                width={32}
                height={32}
                className="w-8 h-8"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            }
          />

          {/* STAT CARD 3: Reach */}
          <StatCard
            number={`${reach}+`}
            label="Reach on Social Media"
            icon={
              <Image
                src={socialMediaIcon}
                alt="Reach on Social Media"
                width={32}
                height={32}
                className="w-8 h-8"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <FeatureCard
            title="About NMIT Hacks"
            description="NMIT Hacks builds a nationwide community of student innovators — connecting participants from top institutions with industry mentors. Over multiple editions we provide learning, collaboration and career-growth opportunities through a mix of digital and on-campus activities."
            iconSrc={aboutus}
            altText="About Us"
          />

          <FeatureCard
            title="Expect Great Things"
            description="Mentors from industry, hands-on workshops, and curated challenges give you the tools to build, present, and scale great ideas. Expect mentorship, judged tracks, and prizes that help projects move forward."
            iconSrc={greatThingsImg}
            altText="Expect great things"
          />

          <FeatureCard
            title="All Students Welcome!"
            description="Beginners and experienced hackers both thrive here — no entry fee required. Teams, solo participants, and students from any discipline are encouraged to join, learn, and collaborate."
            iconSrc={welcome}
            altText="All Students Welcome"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutUs