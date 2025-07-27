import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "../../Button";
import MathJaxRender from "@/components/MathJaxRender";
import React, { useRef } from "react";


import UndeImage from "/res/screenshots/Unde_Screenshot.png"
import UndeImage1 from "/res/screenshots/Unde_Screenshot2.png"

import PrismaImage from "/res/screenshots/Prisma_Screenshot.png";
import PrismaImage1 from "/res/screenshots/Prisma_Screenshot1.png";

import UndeVideo from "/res/Videos/Unde Videoclip.mp4";
import UndeVideo1 from "/res/Videos/Frecventa Undelor Video.mp4";
import Layout from "../../Layout";

// import PrismaSImulation from "/Simulations/prisma/prisma-simulator.html";

const UndePage = () => {
  const undeImages = [
    { src: UndeImage, alt: "Simulare Unde" },
    { src: UndeImage1, alt: "Simulare Unde" }
  ];

  const prismaImages = [
    { src: PrismaImage, alt: "Simulare Prisma" },
    { src: PrismaImage1, alt: "Simulare Prisma" }
  ];

  const undeVideos = [
    { src: UndeVideo, alt: "Unde" },
    { src: UndeVideo1, alt: "Unde" }
  ];
  // const HtmlPages = [
  //   { src: PrismaSImulation, alt: "Prisma Simulation" }
  // ]

  // Refs for iframe and description
  const modelFrameRef = useRef(null);
  const modelDescRef = useRef(null);

  // Function to change model and description
  const changeModel = (modelId, description) => {
    if (modelFrameRef.current && modelDescRef.current) {
      modelFrameRef.current.src = `https://sketchfab.com/models/${modelId}/embed`;
      modelDescRef.current.innerHTML = `${description}<br>🔁 Poți roti și mări cu mouse-ul<br>🗨 Textul din model este în engleză`;
    }
  };

  return (
    <Layout>
      <div className="resurse-pagina min-h-screen flex flex-col">
        <div style={{ paddingTop: "110px", flex: 1, display: "flex", flexDirection: "column" }}>
          <main className="flex-grow container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Unde</h1>
            
            <div className="max-w-4xl mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                Undele reprezintă fenomenul de propagare a oscilațiilor mecanice, electromagnetice sau de altă natură în diferite medii. 
                Acestea sunt fundamentale pentru înțelegerea multor fenomene naturale, de la sunet și lumină până la undele seismice și radio.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Studiul undelor este esențial în fizică, oferind o înțelegere profundă a modului în care energia și informația se propagă prin spațiu. 
                Undele pot fi clasificate după natura lor (mecanice vs electromagnetice), direcția de oscilație (longitudinale vs transversale) 
                și caracteristicile lor (frecvența, lungimea de undă, amplitudinea).
              </p>
              <p className="text-lg text-muted-foreground">
                În această secțiune, explorăm diferitele tipuri de unde, proprietățile lor fundamentale și aplicațiile practice în viața de zi cu zi.
              </p>
            </div>

            <div className="max-w-4xl mb-10">
              <h3 className="text-xl font-semibold mb-4">Clasificarea undelor:</h3>
              
              <h4 className="text-lg font-semibold mb-2">A. Unde mecanice</h4>
              <p className="text-muted-foreground mb-4">
                Unda mecanică reprezintă o perturbație locală produsă într-un mediu elastic care se transmite în toate direcțiile, din aproape în aproape, 
                din cauza forțelor elastice ce se exercită între particulele constitutive ale acelui mediu. Din acest motiv undele mecanice se mai numesc și elastice.
              </p>
              <p className="text-muted-foreground mb-4">
                Exemple de unde mecanice: undele sonore în aer, undele pe suprafața apei, undele seismice în scoarța terestră, 
                undele de tensiune în coarde vibrante.
              </p>
              
              <h4 className="text-lg font-semibold mb-2">B. Unde electromagnetice</h4>
              <p className="text-muted-foreground mb-4">
                Undele electromagnetice reprezintă o suprapunere dintre un câmp electric și unul magnetic care se generează reciproc și se propagă împreună. 
                Undele electromagnetice nu au nevoie de un mediu suport de propagare, prin urmare undele electromagnetice se propagă și în vid.
              </p>
              <p className="text-muted-foreground mb-4">
                Exemple de unde electromagnetice: lumina vizibilă, undele radio, razele X, radiația infraroșie, radiația ultravioletă, razele gamma.
              </p>

              <h4 className="text-lg font-semibold mb-2">Tipuri de unde după direcția de oscilație:</h4>
              
              <h5 className="text-md font-semibold mb-2">A. Unde longitudinale</h5>
              <p className="text-muted-foreground mb-4">
                Undele longitudinale sunt acele unde în care oscilațiile particulelor se produc în aceeași direcție cu direcția de propagare a undei. 
                Aceste unde se propagă prin comprimarea și rarefierea mediului elastic.
              </p>
              <p className="text-muted-foreground mb-4">
                Exemple: undele sonore în aer, undele seismice P (primare), undele de compresie în lichide.
              </p>
              
              <h5 className="text-md font-semibold mb-2">B. Unde transversale</h5>
              <p className="text-muted-foreground mb-4">
                Undele transversale sunt acele unde în care oscilațiile particulelor se produc perpendicular pe direcția de propagare a undei. 
                Aceste unde se propagă prin vibrarea particulelor mediului elastic în plan perpendicular pe direcția de propagare a undei.
              </p>
              <p className="text-muted-foreground mb-4">
                Exemple: undele electromagnetice, undele pe suprafața apei, undele seismice S (secundare), undele în coarde vibrante.
              </p>

              {/* Videos about waves */}
              <div className="flex flex-row gap-4 my-8 justify-center items-center">
                <video
                  src={undeVideos[0].src}
                  alt={undeVideos[0].alt}
                  controls
                  style={{ width: "50%", height: "20%", objectFit: "cover", borderRadius: "12px", background: "#23232a" }}
                  title="Cum se formeaza undele stationare într-o coardă vibrată? (exemplu video)"
                />
                <video
                  src={undeVideos[1].src}
                  alt={undeVideos[1].alt}
                  controls
                  style={{ width: "50%", height: "20%", objectFit: "cover", borderRadius: "12px", background: "#23232a" }}
                  title="Cum se cum se formează undele sonore într-un tub și cum se determină frecvența fundamentală? (exemplu video)"
                />
              </div>
            </div>

            <div className="space-y-12">
              {/* Simulare de unde in apa */}
              <div className="rounded-container">
                <h2 className="text-2xl font-bold mb-4">Simulare de unde în apă</h2>
                <p className="text-muted-foreground mb-6">
                  Această simulare permite observarea propagării undelor în apă, demonstrând cum se formează și se transmit undele printr-un mediu lichid. 
                  Poți interacționa cu simularea pentru a vedea cum diferite tipuri de unde se comportă în apă.
                </p>
                <p className="text-muted-foreground mb-6">
                  Undele pe suprafața apei sunt un exemplu excelent de unde transversale, unde particulele de apă oscilează pe verticală 
                  în timp ce unda se propagă pe orizontală. Acest fenomen demonstrează clar principiile fundamentale ale propagării undelor.
                </p>
                <div className="image-slider h-64 md:h-80 relative flex items-center justify-center mb-8">
                  <img
                    src={undeImages[0].src}
                    alt={undeImages[0].alt}
                    className="w-full h-full object-contain mx-auto my-auto"
                  />
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Formule fundamentale pentru unde:</h3>
                    
                    <h4 className="text-lg font-semibold mb-2">1. Relația fundamentală a undelor:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( v = \\lambda \\cdot f \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">2. Viteza de propagare:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( v = \\sqrt{\\frac{T}{\\mu}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">3. Ecuația undei progresive:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( y(x,t) = A \\sin(kx - \\omega t + \\phi) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">4. Numărul de undă:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( k = \\frac{2\\pi}{\\lambda} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">5. Viteza unghiulară:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\omega = 2\\pi f \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">6. Energia undei:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( E = \\frac{1}{2}\\mu A^2\\omega^2 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">7. Intensitatea undei:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( I = \\frac{P}{A} = \\frac{1}{2}\\rho v A^2\\omega^2 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      Unde: v este viteza de propagare, λ este lungimea de undă, f este frecvența, T este tensiunea, μ este densitatea liniară, 
                      A este amplitudinea, k este numărul de undă, ω este viteza unghiulară, φ este faza inițială, E este energia, I este intensitatea, 
                      ρ este densitatea mediului.
                    </p>
                  </div>
                  <a
                    href="/simulari/Unde/simulator-unde.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="lg">Vezi simularea</Button>
                  </a>
                </div>
              </div>

              {/* Prisma */}
              <div className="max-w-4xl mb-10">
                <h3 className="text-xl font-semibold mb-4">Prisma și dispersia luminii</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  O prismă este un obiect transparent cu două fețe paralele și cel puțin trei fețe laterale, care refractă lumina. 
                  Prisma este utilizată pentru a descompune lumina albă în spectrul său de culori prin difracție.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Difracția luminii albe prin prisma este un fenomen optic care apare atunci când lumina albă trece printr-o prismă, 
                  rezultând în separarea acesteia în culorile spectrului vizibil. Acest proces se datorează diferențelor de indice de refracție 
                  pentru diferitele lungimi de undă ale luminii.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Prisma este adesea folosită în experimentele de optică pentru a demonstra cum lumina albă poate fi descompusă în culorile sale componente, 
                  cum ar fi roșu, portocaliu, galben, verde, albastru, indigo și violet.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Lumina albă este o suprapunere formată din toate lungimile de undă așa cum a observat prima dată acum mai bine de 300 de ani Isaac Newton 
                  descoperind fenomenul de dispersie a luminii.
                </p>
              </div>

              <div className="rounded-container">
                <h2 className="text-2xl font-bold mb-4">Difracția luminii albe prin prismă</h2>
                <p className="text-muted-foreground mb-6">
                  Această simulare permite observarea difracției luminii albe printr-o prismă, demonstrând cum lumina albă se descompune în spectrul său de culori 
                  atunci când trece printr-un mediu transparent cu un indice de refracție diferit.
                </p>
                <p className="text-muted-foreground mb-6">
                  Fenomenul de dispersie a luminii este fundamental pentru înțelegerea opticii și a modului în care lumina interacționează cu diferitele medii. 
                  Acest proces este esențial în multe aplicații tehnologice, de la spectroscopie până la telecomunicații.
                </p>
                <div className="image-slider h-64 md:h-80 relative flex items-center justify-center mb-8">
                  <img
                    src={prismaImages[1].src}
                    alt={prismaImages[1].alt}
                    className="w-full h-full object-contain mx-auto my-auto"
                  />
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Formule pentru refracția luminii în prismă:</h3>
                    
                    <h4 className="text-lg font-semibold mb-2">1. Legea refracției (Snell):</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">2. Unghiul de deviație în prismă:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\delta = (\\theta_1 + \\theta_2') - A \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">3. Indicele de refracție dependent de lungimea de undă:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( n = n(\\lambda) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">4. Formula Cauchy pentru dispersie:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( n(\\lambda) = A + \\frac{B}{\\lambda^2} + \\frac{C}{\\lambda^4} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">5. Unghiul de deviație minimă:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\delta_{min} = 2\\arcsin(n\\sin\\frac{A}{2}) - A \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">6. Puterea de dispersie:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( P = \\frac{n_F - n_C}{n_D - 1} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">7. Relația între unghiuri în prismă:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\theta_2 + \\theta_1' = A \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      Unde: n₁, n₂ sunt indicii de refracție, θ₁, θ₂ sunt unghiurile de incidență și refracție, δ este unghiul de deviație, 
                      A este unghiul prismului, λ este lungimea de undă, P este puterea de dispersie, n_F, n_C, n_D sunt indicii de refracție 
                      pentru diferite lungimi de undă (F, C, D).
                    </p>
                  </div>
                  <a
                    href="/simulari/prisma/prisma-simulator.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="lg">Vezi simularea</Button>
                  </a>
                </div>
              </div>

              {/* Sketchfab 3D Model Embed */}
              <div className="model-container mt-12">
                <iframe
                  ref={modelFrameRef}
                  id="modelFrame"
                  src="https://sketchfab.com/models/a7e7f0e0b22d4828bbadf3717541d7d2/embed"
                  allowFullScreen
                  mozAllowFullScreen="true"
                  webkitAllowFullScreen="true"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  xr-spatial-tracking="true"
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                  style={{ width: "100%", height: "480px", border: "none" }}
                  title="Undă electromagnetică 3D"
                ></iframe>
                <div
                  ref={modelDescRef}
                  id="modelDescription"
                  className="sketchfab-info1 mt-2 text-muted-foreground"
                >
                  ⚡ Undă electromagnetică<br />🔁 Poți roti și mări cu mouse-ul<br />🗨 Textul din model este în engleză
                </div>
              </div>

              {/* Model Switch Buttons BELOW the model */}
              <div className="model-buttons overlap-buttons">
                <Button
                  onClick={() =>
                    changeModel(
                      "a7e7f0e0b22d4828bbadf3717541d7d2",
                      "⚡ Undă electromagnetică"
                    )
                  }
                  variant="outline"
                >
                  <span className="d-desktop">Undă electromagnetică&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="d-mobile">Undă electromagnetică</span>
                </Button>
                <Button
                  onClick={() =>
                    changeModel(
                      "0bf07181c0314a7c891cb6944a37ea97",
                      "🌀 Polarizarea circulară a unei unde electromagnetice"
                    )
                  }
                  variant="outline"
                >
                  Polarizare circulară
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default UndePage;
