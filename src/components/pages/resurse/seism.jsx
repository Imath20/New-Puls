import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "../../Button";
import MathJaxRender from "@/components/MathJaxRender";

import seismicWaveAnimation from "/res/screenshots/Seism_Screenshot.png";
import Layout from "../../Layout";

const SeismePage = () => {
  const seismImages = [
    { src: seismicWaveAnimation, alt: "Simulare Seisme" },
  ];

  return (
    <Layout>
      <div className="resurse-pagina min-h-screen flex flex-col">
        <div style={{ paddingTop: "110px", flex: 1, display: "flex", flexDirection: "column" }}>
          <main className="flex-grow container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Seisme și Unde Seismice</h1>
            
            <div className="max-w-4xl mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                Un cutremur este un eveniment brusc și violent care are loc în interiorul Pământului, rezultând unde seismice. 
                Aceste evenimente geologice sunt fundamentale pentru înțelegerea structurii interne a Pământului și a proceselor tectonice.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Cutremurele sunt cauzate de eliberarea bruscă de energie în scoarța terestră, generând unde seismice care se propagă prin Pământ. 
                Această energie poate fi eliberată prin mișcări ale plăcilor tectonice, activitate vulcanică, sau alte procese geologice.
              </p>
              <p className="text-lg text-muted-foreground">
                Studiul seismelor și al undelor seismice este esențial pentru seismologia, geofizica și înțelegerea hazardelor naturale. 
                Aceste cunoștințe sunt cruciale pentru construcția de clădiri seismorezistente și pentru protecția civilă.
              </p>
            </div>

            <div className="space-y-12">
              <div className="rounded-container">
                <h2 className="text-2xl font-bold mb-4">Simulare de seisme</h2>
                <p className="text-muted-foreground mb-6">
                  Animația undelor seismice generate în timpul unui cutremur demonstrează modul în care energia seismică se propagă prin diferitele 
                  straturi ale Pământului și cum aceasta poate fi detectată de seismografe.
                </p>
                <p className="text-muted-foreground mb-6">
                  Undele seismice oferă informații valoroase despre structura internă a Pământului, deoarece viteza și direcția de propagare 
                  depind de proprietățile fizice ale materialelor prin care trec. Această tehnică, numită tomografie seismică, 
                  a permis cartografierea detaliată a structurii Pământului.
                </p>
                <div className="image-slider h-64 md:h-80 relative flex items-center justify-center mb-8">
                  <img
                    src={seismImages[0].src}
                    alt={seismImages[0].alt}
                    className="w-full h-full object-contain mx-auto my-auto"
                  />
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Formule fundamentale pentru seisme:</h3>
                    
                    <h4 className="text-lg font-semibold mb-2">1. Viteza undelor P (primare):</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( v_P = \\sqrt{\\frac{K + \\frac{4}{3}G}{\\rho}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">2. Viteza undelor S (secundare):</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( v_S = \\sqrt{\\frac{G}{\\rho}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">3. Viteza de propagare în funcție de distanță:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( v_P = \\frac{d}{t_P} \\)"}
                      <MathJaxRender />
                    </div>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( v_S = \\frac{d}{t_S} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">4. Magnitudinea Richter:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( M_L = \\log_{10} A - \\log_{10} A_0 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">5. Magnitudinea moment seismic:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( M_w = \\frac{2}{3} \\log_{10} M_0 - 10.7 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">6. Momentul seismic:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( M_0 = \\mu A D \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">7. Energia seismică eliberată:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( E = 10^{1.5M + 4.8} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">8. Intensitatea Mercalli modificată:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( I = \\frac{2}{3} M + \\frac{1}{3} \\log_{10} \\frac{d}{d_0} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">9. Timpul de propagare:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( t = \\frac{d}{v} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">10. Distanța epicentrală:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      Unde: v_P, v_S sunt vitezele undelor P și S, K este modulul de compresibilitate, G este modulul de forfecare, 
                      ρ este densitatea, d este distanța, t_P, t_S sunt timpii de propagare, M_L este magnitudinea Richter, 
                      A este amplitudinea, A_0 este amplitudinea de referință, M_w este magnitudinea moment seismic, M_0 este momentul seismic, 
                      μ este modulul de forfecare, A este aria de rupere, D este deplasarea, E este energia, I este intensitatea, 
                      d_0 este distanța de referință.
                    </p>
                  </div>
                  <a
                    href="/simulari/Mix/Cutremur.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="lg">Vezi simularea</Button>
                  </a>
                </div>
              </div>

              <div className="max-w-4xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Tipuri de unde seismice:</h3>
                
                <h4 className="text-lg font-semibold mb-2">A. Unde de corp (Body waves)</h4>
                <p className="text-muted-foreground mb-4">
                  Undele de corp se propagă prin interiorul Pământului și sunt de două tipuri principale: undele P (primare) și undele S (secundare).
                </p>
                
                <h5 className="text-md font-semibold mb-2">Unde P (Primare)</h5>
                <p className="text-muted-foreground mb-4">
                  Undele P sunt unde de compresie care se propagă cel mai rapid (6-8 km/s în scoarță). Particulele oscilează în direcția de propagare, 
                  similar cu undele sonore în aer. Aceste unde pot trece prin toate tipurile de medii: solide, lichide și gazoase.
                </p>
                
                <h5 className="text-md font-semibold mb-2">Unde S (Secundare)</h5>
                <p className="text-muted-foreground mb-4">
                  Undele S sunt unde de forfecare care se propagă mai încet (3-4 km/s în scoarță). Particulele oscilează perpendicular pe direcția de propagare. 
                  Aceste unde nu pot trece prin lichide și gaze, deoarece acestea nu suportă forțe de forfecare.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">B. Unde de suprafață (Surface waves)</h4>
                <p className="text-muted-foreground mb-4">
                  Undele de suprafață se propagă de-a lungul suprafeței Pământului și sunt responsabile pentru majoritatea distrugerilor în timpul cutremurelor.
                </p>
                
                <h5 className="text-md font-semibold mb-2">Unde Rayleigh</h5>
                <p className="text-muted-foreground mb-4">
                  Undele Rayleigh se propagă cu o mișcare eliptică a particulelor, similar cu mișcarea valurilor pe ocean. 
                  Acestea sunt cele mai lente undele seismice și cauzează cele mai mari distrugeri.
                </p>
                
                <h5 className="text-md font-semibold mb-2">Unde Love</h5>
                <p className="text-muted-foreground mb-4">
                  Undele Love se propagă cu o mișcare de forfecare orizontală, perpendicular pe direcția de propagare. 
                  Acestea sunt tipice pentru straturile de sedimente de pe suprafața Pământului.
                </p>
              </div>

              <div className="max-w-4xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Caracteristici importante:</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Undele seismice se propagă prin interiorul Pământului cu viteze diferite în funcție de proprietățile materialelor</li>
                  <li>Există diferite tipuri de unde seismice (P, S, L, R) fiecare cu caracteristici specifice</li>
                  <li>Seismografele înregistrează aceste unde cu precizie ridicată</li>
                  <li>Undele secundare S (transversale) și undele primare P (longitudinale) au viteze diferite</li>
                  <li>Undele de suprafață (L și R) provoacă cele mai mari distrugeri la suprafața solului</li>
                  <li>Viteza de propagare a undelor P este mai mare decât a undelor S</li>
                  <li>Undele S nu se propagă prin lichide, spre deosebire de undele P</li>
                  <li>Magnitudinea cutremurului se măsoară pe scări logaritmice (Richter, moment seismic)</li>
                  <li>Intensitatea seismică descrie efectele cutremurului la suprafață</li>
                  <li>Epicentrul este punctul de pe suprafață deasupra hipocentrului</li>
                </ul>
              </div>

              <h2 className="top-1 p3">Seism prezentat printr-un joc</h2>
              <p className="row"><span>&#9734;<b>Apasa sageata dreapta, sageata stanga pentru a te misca in jurul obiectului 3d.</b></span></p>
              <p className="row"><span>&#9734;<b>Apasa Enter pentru a te duce la urmatorul eveniment.</b></span></p>
              <div className="model-container">
                 <div class="iframe-wrapper">  
                <div className="w-full aspect-[960/700] max-w-[960px] mx-auto">
                  <iframe
                    id="modelFrame"
                    src="https://stefanarctic.github.io/Cutremure-Unity/"
                    className="w-full h-full border-none"
                    allowFullScreen
                    
                  ></iframe>
                  </div>
                </div>

                <div id="modelDescription" className="sketchfab-info1">
                  🌀🌏〰Reprezentare Seism<br />🔁 Poți apasa stanga drepta pentru a te misca<br />🔁Poti apasa Enter pentru a vedea urmatoarea figura
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default SeismePage;