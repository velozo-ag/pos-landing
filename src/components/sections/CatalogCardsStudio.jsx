"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Printer,
  Smartphone,
  Clock,
  Lock,
  Check,
  Maximize2,
  Minimize2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export default function CatalogCardsStudio() {
  const [previewScale, setPreviewScale] = useState(0.85);
  const [exportQuality, setExportQuality] = useState("uhd"); // "uhd" (3240x3240) | "1080" (1080x1080)
  const [downloadingId, setDownloadingId] = useState(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  // Pre-convierte todas las imágenes dentro de la card a DataURL desde los bytes originales HD (sin re-escalar al tamaño CSS)
  const inlineOriginalImages = async (rootEl) => {
    const imgs = Array.from(rootEl.querySelectorAll("img"));
    await Promise.all(
      imgs.map(async (img) => {
        const src = img.getAttribute("src");
        if (!src || src.startsWith("data:")) return;
        try {
          const res = await fetch(src, { cache: "force-cache" });
          const blob = await res.blob();
          const dataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
          img.setAttribute("src", dataUrl);
        } catch (e) {
          console.warn("No se pudo inlinear imagen:", src, e);
        }
      })
    );
  };

  const handleDownloadCard = async (ref, filename, id) => {
    if (!ref.current) return;
    const prevScale = previewScale;
    try {
      setDownloadingId(id);

      // 1. Poner el contenedor en escala 1:1 real y convertir las imágenes a sus bytes HD completos
      if (prevScale !== 1) {
        setPreviewScale(1);
        await new Promise((r) => setTimeout(r, 200));
      }
      await inlineOriginalImages(ref.current);

      const htmlToImage = await new Function(
        "url",
        "return import(url)"
      )("https://esm.sh/html-to-image@1.11.11");

      // 2. Renderizar a Canvas en 3x Retina (3240 x 3240 px reales)
      const hiResCanvas = await htmlToImage.toCanvas(ref.current, {
        width: 1080,
        height: 1080,
        pixelRatio: 3,
        cacheBust: false,
        backgroundColor: id === "card-1" ? "#faf9f8" : "#09090b",
      });

      let finalDataUrl;
      if (exportQuality === "1080") {
        const outCanvas = document.createElement("canvas");
        outCanvas.width = 1080;
        outCanvas.height = 1080;
        const ctx = outCanvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(hiResCanvas, 0, 0, 1080, 1080);
        finalDataUrl = outCanvas.toDataURL("image/png", 1.0);
      } else {
        finalDataUrl = hiResCanvas.toDataURL("image/png", 1.0);
      }

      const link = document.createElement("a");
      link.download = filename;
      link.href = finalDataUrl;
      link.click();
    } catch (err) {
      console.error("Error exportando PNG:", err);
      alert(
        "Si tu navegador bloqueó la descarga automática, poné la vista en Tamaño Real 1080x1080 y hacé captura directa."
      );
    } finally {
      setPreviewScale(prevScale);
      setDownloadingId(null);
    }
  };

  const handleDownloadAll = async () => {
    await handleDownloadCard(
      card1Ref,
      "01-roosty-pos-portada.png",
      "card-1"
    );
    await new Promise((r) => setTimeout(r, 450));
    await handleDownloadCard(
      card2Ref,
      "02-roosty-pos-flujo-cocina.png",
      "card-2"
    );
    await new Promise((r) => setTimeout(r, 450));
    await handleDownloadCard(
      card3Ref,
      "03-roosty-pos-beneficios-socios.png",
      "card-3"
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-8 font-sans">
      {/* Top Studio Controls Bar */}
      <div className="max-w-7xl mx-auto mb-10 p-5 rounded-3xl bg-zinc-900/95 border border-zinc-800 flex flex-col lg:flex-row items-center justify-between gap-4 sticky top-4 z-50 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/roostylogo.png"
              alt="Roosty POS"
              width={48}
              height={32}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg sm:text-xl font-bold text-white">
                WhatsApp Business Catalog Studio
              </h1>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#e85d45]/20 text-[#e85d45] border border-[#e85d45]/30 font-bold">
                Capturas Reales Reescaladas 3x HD
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Usa tus capturas reales del sistema pre-reescaladas en alta resolución (sin object-cover que pixele).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quality Selector */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => setExportQuality("uhd")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                exportQuality === "uhd"
                  ? "bg-zinc-800 text-amber-400 shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Ultra HD 3x (3240×3240)
            </button>
            <button
              type="button"
              onClick={() => setExportQuality("1080")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                exportQuality === "1080"
                  ? "bg-zinc-800 text-white shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              1080×1080 Exacto
            </button>
          </div>

          {/* Preview Scale Switcher */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => setPreviewScale(0.85)}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                previewScale !== 1
                  ? "bg-zinc-800 text-white shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Vista 85%</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewScale(1)}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                previewScale === 1
                  ? "bg-zinc-800 text-white shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Vista 100%</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={Boolean(downloadingId)}
            className="px-5 py-2.5 rounded-xl bg-[#e85d45] hover:bg-[#d44c34] disabled:opacity-60 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#e85d45]/25 transition-all cursor-pointer"
          >
            {downloadingId ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Descargar las 3 Imágenes PNG</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 pb-24">
        {/* ═══════════════════════════════════════════════════════════════════
            IMAGEN 1 — LA PORTADA (CAPTURAS REALES REESCALADAS 3X HD)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#e85d45] font-bold">
                IMAGEN 01 • PORTADA DE CATÁLOGO (MINIATURA PRINCIPAL)
              </span>
              <h2 className="text-lg font-bold text-white">
                Capturas Reales: POS COMANDA MESA + menucoffee.png Inclinado + TICKET COMANDA
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                handleDownloadCard(
                  card1Ref,
                  "01-roosty-pos-portada.png",
                  "card-1"
                )
              }
              disabled={downloadingId === "card-1"}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-2 border border-zinc-700 cursor-pointer self-start sm:self-auto"
            >
              {downloadingId === "card-1" ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#e85d45]" />
              ) : (
                <Download className="w-4 h-4 text-[#e85d45]" />
              )}
              <span>Descargar Imagen 1 (PNG Ultra HD)</span>
            </button>
          </div>

          <div
            className="w-full overflow-x-auto flex justify-center bg-zinc-900/40 rounded-3xl p-6 border border-zinc-800/80"
            style={{
              height:
                previewScale === 1
                  ? "1130px"
                  : `${1080 * previewScale + 48}px`,
            }}
          >
            <div
              style={{
                width: "1080px",
                height: "1080px",
                transform: `scale(${previewScale})`,
                transformOrigin: "top center",
              }}
              className="shrink-0"
            >
              {/* 1080x1080 CANVAS 1 — FONDO LISO #faf9f8 */}
              <div
                ref={card1Ref}
                style={{ width: "1080px", height: "1080px" }}
                className="w-[1080px] h-[1080px] bg-[#faf9f8] text-zinc-950 relative overflow-hidden flex flex-col justify-between px-12 py-11 select-none font-sans antialiased"
              >
                {/* Smooth ambient warmth */}
                <div className="absolute -top-28 -right-28 w-[520px] h-[520px] rounded-full bg-[#e85d45]/[0.06] blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-28 -left-28 w-[520px] h-[520px] rounded-full bg-amber-500/[0.06] blur-[120px] pointer-events-none" />

                {/* TOP HEADER (Logo + separador + ROOSTY POS // GASTRONOMÍA + Título) */}
                <div className="relative z-20 flex flex-col items-center text-center pt-1">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="/roostylogoname.png"
                      alt="Roosty POS"
                      className="h-14 w-auto block"
                    />
                    <span className="h-6 w-[1.5px] bg-zinc-300" />
                    <span className="px-4 py-1.5 rounded-full bg-zinc-900 text-white font-mono text-sm font-extrabold tracking-[0.2em] uppercase shadow-sm">
                      ROOSTY POS // GASTRONOMÍA
                    </span>
                  </div>

                  <h2 className="font-serif text-[52px] font-black tracking-tight text-zinc-950 leading-[1.06] max-w-[920px]">
                    Tu salón, cocina y carta QR{" "}
                    <span className="text-[#e85d45]">en un solo lugar.</span>
                  </h2>
                </div>

                {/* CENTER STAGE: Real POS Screenshot in Notebook + Real menucoffee.png in Tilted Phone + Real TICKET COMANDA */}
                <div className="relative z-20 flex-1 my-3 flex items-center">
                  {/* 1. NOTEBOOK CON CAPTURA REAL REESCALADA (2876x1445 px — SIN object-cover) */}
                  <div className="w-[770px] -ml-6 -mt-8 relative z-10">
                    <div className="bg-[#09090b] rounded-t-[26px] p-3 border-[6px] border-zinc-800 shadow-[0_35px_85px_-15px_rgba(0,0,0,0.45)]">
                      <div className="flex items-center justify-between pb-2 px-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                          <span className="ml-2 font-mono text-[11px] font-bold text-zinc-400">
                            pos.roosty.com.ar — Terminal de Salón y Comandas
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-amber-400 font-mono text-[10px] font-bold border border-zinc-700">
                          ● EN VIVO
                        </span>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#09090b]">
                        <img
                          src="/catalog-hd/pos-comanda-hd.png"
                          alt="Roosty POS Terminal"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>

                    {/* Laptop Aluminum Base */}
                    <div className="mx-auto w-[820px] -ml-[25px] h-5 bg-gradient-to-b from-zinc-300 to-zinc-400 rounded-b-2xl border-t border-zinc-200 flex items-center justify-center shadow-xl">
                      <div className="w-28 h-1.5 rounded-full bg-zinc-500/70" />
                    </div>
                  </div>

                  {/* 2. CELULAR INCLINADO CON CAPTURA REAL menucoffee-hd.png (1176x2571 px — SIN object-cover) */}
                  <div className="absolute right-0 top-1/2 -translate-y-[47%] -rotate-6 z-30 w-[305px]">
                    <div className="mb-2.5 flex justify-center">
                      <div className="px-4 py-1.5 rounded-full bg-zinc-900 text-amber-400 border border-zinc-700 shadow-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Carta Digital QR</span>
                      </div>
                    </div>

                    <div className="p-[3.5px] rounded-[42px] bg-gradient-to-tr from-zinc-800 via-zinc-400 to-zinc-600 shadow-[20px_35px_80px_-10px_rgba(0,0,0,0.65)]">
                      <div className="rounded-[39px] p-2 bg-black border border-zinc-800">
                        <div className="rounded-[31px] overflow-hidden bg-[#110f0d] border border-zinc-800/90">
                          <img
                            src="/catalog-hd/menucoffee-hd.png"
                            alt="Carta QR Roosty POS"
                            className="w-full h-auto block"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. MODAL / TICKET REAL DE COMANDA (ticket-comanda-hd.png 1656x1671 px — SIN object-cover) */}
                  <div className="absolute left-0 -bottom-3 z-30 w-[290px] -rotate-2">
                    <div className="mb-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 text-white border border-zinc-700 shadow-xl">
                      <Printer className="w-4 h-4 text-[#f59e0b]" />
                      <span className="font-sans text-xs font-bold tracking-wide">
                        Comandera Térmica 80mm / 58mm
                      </span>
                    </div>

                    <div className="rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.55)] bg-[#09090b]">
                      <img
                        src="/catalog-hd/ticket-comanda-hd.png"
                        alt="Ticket Comanda Térmica"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>

                {/* BOTTOM HIGHLIGHT BADGE (Sober Editorial Dark & Amber) */}
                <div className="relative z-20 flex flex-col items-center gap-3 pt-2">
                  <div className="inline-flex items-center gap-3.5 px-8 py-3.5 rounded-full bg-zinc-900 text-white shadow-xl border border-zinc-800">
                    <div className="w-7 h-7 rounded-full bg-[#f59e0b] text-zinc-950 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3.5]" />
                    </div>
                    <span className="font-sans text-[26px] font-extrabold tracking-tight leading-none">
                      0% Comisión por pedido
                    </span>
                  </div>

                  <div className="flex items-center gap-5 text-sm font-semibold text-zinc-600">
                    <span>100% Web en la Nube</span>
                    <span>•</span>
                    <span>PC, Tablet y Celular</span>
                    <span>•</span>
                    <span className="font-mono font-bold text-[#e85d45]">
                      pos.roosty.com.ar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            IMAGEN 2 — ZOOM AL FLUJO CRÍTICO (CAPTURAS REALES REESCALADAS)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#e85d45] font-bold">
                IMAGEN 02 • ZOOM AL FLUJO CRÍTICO (COCINA Y COMANDAS)
              </span>
              <h2 className="text-lg font-bold text-white">
                Capturas Reales con Zoom: Modal Pedido #46 (modal pedido web.png) + Pantalla KDS (KDS.png)
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                handleDownloadCard(
                  card2Ref,
                  "02-roosty-pos-flujo-cocina.png",
                  "card-2"
                )
              }
              disabled={downloadingId === "card-2"}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-2 border border-zinc-700 cursor-pointer self-start sm:self-auto"
            >
              {downloadingId === "card-2" ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#e85d45]" />
              ) : (
                <Download className="w-4 h-4 text-[#e85d45]" />
              )}
              <span>Descargar Imagen 2 (PNG Ultra HD)</span>
            </button>
          </div>

          <div
            className="w-full overflow-x-auto flex justify-center bg-zinc-900/40 rounded-3xl p-6 border border-zinc-800/80"
            style={{
              height:
                previewScale === 1
                  ? "1130px"
                  : `${1080 * previewScale + 48}px`,
            }}
          >
            <div
              style={{
                width: "1080px",
                height: "1080px",
                transform: `scale(${previewScale})`,
                transformOrigin: "top center",
              }}
              className="shrink-0"
            >
              {/* 1080x1080 CANVAS 2 — FONDO LISO #09090b CON CAPTURAS REALES */}
              <div
                ref={card2Ref}
                style={{ width: "1080px", height: "1080px" }}
                className="w-[1080px] h-[1080px] bg-[#09090b] text-white relative overflow-hidden flex flex-col justify-between p-11 select-none font-sans antialiased"
              >
                <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-[560px] h-[560px] rounded-full bg-[#e85d45]/10 blur-[120px] pointer-events-none" />

                {/* TOP SHORT HEADLINE */}
                <div className="relative z-20 text-center space-y-2 pb-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b]">
                    <span>FLUJO DIRECTO EN VIVO // WHATSAPP A COCINA</span>
                  </div>

                  <h2 className="font-serif text-[48px] font-black tracking-tight text-white leading-[1.08]">
                    De WhatsApp a la comandera{" "}
                    <span className="text-[#f59e0b]">térmica en 1 clic.</span>
                  </h2>
                </div>

                {/* CENTER ZOOMED CROP OF REAL SCREENSHOTS */}
                <div className="relative z-20 flex-1 flex items-center justify-between gap-6 my-2">
                  {/* LEFT: REAL MODAL PEDIDO WEB (modal-pedido-hd.png 1932x2130 px) */}
                  <div className="w-[465px] shrink-0 relative z-20">
                    <div className="mb-2.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-amber-400 font-mono text-xs font-extrabold uppercase">
                      <span>1. Pedido Entrante desde Carta QR / WhatsApp</span>
                    </div>

                    <div className="rounded-3xl overflow-hidden border-2 border-zinc-700 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.9)] bg-[#121316]">
                      <img
                        src="/catalog-hd/modal-pedido-hd.png"
                        alt="Modal Pedido Entrante Roosty POS"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>

                  {/* RIGHT: REAL KDS SCREENSHOTS (kds-full-hd.png + kds-cards-hd.png) */}
                  <div className="flex-1 space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono text-xs font-extrabold uppercase">
                      <span>2. Pantalla de Cocina KDS con Cronómetro en Vivo</span>
                    </div>

                    {/* Full KDS Header + 3 Cards Preview */}
                    <div className="rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-2xl bg-[#09090b]">
                      <img
                        src="/catalog-hd/kds-full-hd.png"
                        alt="Pantalla KDS Cocina y Barra"
                        className="w-full h-auto block"
                      />
                    </div>

                    {/* Extra Zoomed Crop on Active Cards #038 & #037 */}
                    <div className="rounded-2xl overflow-hidden border-2 border-rose-500/50 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85)] bg-[#09090b]">
                      <img
                        src="/catalog-hd/kds-cards-hd.png"
                        alt="Zoom Tarjetas KDS con Cronómetro"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>

                {/* BOTTOM FOOTER BAR */}
                <div className="relative z-20 flex items-center justify-between pt-3 border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <img
                      src="/roostylogo.png"
                      alt="Roosty POS"
                      className="h-10 w-auto block"
                    />
                    <span className="font-bold text-white text-lg">
                      Roosty POS
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-base text-zinc-300">
                      Sin retipear pedidos • Impresión térmica automática
                    </span>
                  </div>

                  <span className="px-5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-base font-black">
                    pos.roosty.com.ar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            IMAGEN 3 — RESUMEN DE BENEFICIOS (PLACA TÉCNICA PARA SOCIOS)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#e85d45] font-bold">
                IMAGEN 03 • PLACA TÉCNICA DE BENEFICIOS (PARA COMPARTIR ENTRE SOCIOS)
              </span>
              <h2 className="text-lg font-bold text-white">
                Placa Oscura Lisa con Icons Lucide y los 4 Puntos Clave Grandes y Legibles
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                handleDownloadCard(
                  card3Ref,
                  "03-roosty-pos-beneficios-socios.png",
                  "card-3"
                )
              }
              disabled={downloadingId === "card-3"}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-2 border border-zinc-700 cursor-pointer self-start sm:self-auto"
            >
              {downloadingId === "card-3" ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#e85d45]" />
              ) : (
                <Download className="w-4 h-4 text-[#e85d45]" />
              )}
              <span>Descargar Imagen 3 (PNG Ultra HD)</span>
            </button>
          </div>

          <div
            className="w-full overflow-x-auto flex justify-center bg-zinc-900/40 rounded-3xl p-6 border border-zinc-800/80"
            style={{
              height:
                previewScale === 1
                  ? "1130px"
                  : `${1080 * previewScale + 48}px`,
            }}
          >
            <div
              style={{
                width: "1080px",
                height: "1080px",
                transform: `scale(${previewScale})`,
                transformOrigin: "top center",
              }}
              className="shrink-0"
            >
              {/* 1080x1080 CANVAS 3 — FONDO LISO #09090b + LUCIDE ICONS */}
              <div
                ref={card3Ref}
                style={{ width: "1080px", height: "1080px" }}
                className="w-[1080px] h-[1080px] bg-[#09090b] text-white relative overflow-hidden flex flex-col justify-between p-12 select-none font-sans antialiased"
              >
                <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#e85d45]/10 blur-[120px] pointer-events-none" />

                {/* TOP HEADER */}
                <div className="relative z-20 flex items-center justify-between border-b border-zinc-800 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                      <img
                        src="/roostylogo.png"
                        alt="Roosty POS"
                        className="h-12 w-auto block"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-extrabold uppercase tracking-[0.2em] text-[#e85d45] block">
                        FICHA TÉCNICA // ROOSTY POS
                      </span>
                      <h2 className="font-serif text-4xl font-black text-white tracking-tight mt-0.5">
                        Todo tu local en un solo sistema
                      </h2>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-[#121215] border border-zinc-800 text-right">
                    <span className="text-[11px] font-mono text-zinc-400 block uppercase">
                      PLATAFORMA
                    </span>
                    <span className="font-mono text-sm font-extrabold text-amber-400">
                      100% WEB EN LA NUBE
                    </span>
                  </div>
                </div>

                {/* 4 TECHNICAL CARDS */}
                <div className="relative z-20 grid grid-cols-2 gap-6 my-6 flex-1">
                  {/* 1 */}
                  <div className="rounded-3xl bg-[#121215] border border-zinc-800 p-7 flex flex-col justify-between shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#231507] border border-[#78350f] text-[#f59e0b] flex items-center justify-center">
                          <Printer className="w-7 h-7 stroke-[2]" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 font-mono text-xs font-bold text-amber-400">
                          USB • RED • WIFI
                        </span>
                      </div>

                      <h3 className="font-serif text-[27px] font-bold text-white leading-snug pt-1">
                        Impresión térmica ESC/POS (80mm y 58mm).
                      </h3>

                      <p className="text-base text-zinc-300 leading-relaxed">
                        Compatible con las comanderas térmicas que ya tenés en el local. Emisión instantánea en cocina y caja sin servidores locales.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">HARDWARE UNIVERSAL</span>
                      <span className="px-3 py-1 rounded-lg bg-zinc-900 text-amber-300 font-bold border border-zinc-700">
                        Sin equipos propietarios
                      </span>
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="rounded-3xl bg-[#121215] border border-zinc-800 p-7 flex flex-col justify-between shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#27120e] border border-[#e85d45]/40 text-[#e85d45] flex items-center justify-center">
                          <Smartphone className="w-7 h-7 stroke-[2]" />
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 font-mono text-xs font-black">
                          0% COMISIÓN
                        </span>
                      </div>

                      <h3 className="font-serif text-[27px] font-bold text-white leading-snug pt-1">
                        Carta QR con pedidos directos a WhatsApp.
                      </h3>

                      <p className="text-base text-zinc-300 leading-relaxed">
                        Tu propio enlace personalizado con fotos reales, cálculo de adicionales en vivo y pedidos que entran directo a tu WhatsApp y al POS.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-300 font-bold">
                        tulocal.roosty.site
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-zinc-900 text-zinc-200 font-bold border border-zinc-700">
                        100% Tu Rentabilidad
                      </span>
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="rounded-3xl bg-[#121215] border border-zinc-800 p-7 flex flex-col justify-between shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#2a0c14] border border-rose-800 text-rose-400 flex items-center justify-center">
                          <Clock className="w-7 h-7 stroke-[2]" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 font-mono text-xs font-bold text-rose-300">
                          COCINA & BARRA EN VIVO
                        </span>
                      </div>

                      <h3 className="font-serif text-[27px] font-bold text-white leading-snug pt-1">
                        Pantalla de cocina (KDS) por partidas.
                      </h3>

                      <p className="text-base text-zinc-300 leading-relaxed">
                        Cronómetro de demoras en tiempo real, separación automática entre Cocina y Barra, y marcha por tandas sin duplicar platos.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">SEMÁFORO DE TIEMPOS</span>
                      <span className="px-3 py-1 rounded-lg bg-zinc-900 text-rose-300 font-bold border border-zinc-700">
                        Despacho en 1 toque
                      </span>
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="rounded-3xl bg-[#121215] border border-zinc-800 p-7 flex flex-col justify-between shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#042f1f] border border-[#15803d] text-[#34d399] flex items-center justify-center">
                          <Lock className="w-7 h-7 stroke-[2]" />
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <kbd className="px-2.5 py-1 rounded bg-zinc-900 text-[#f59e0b] font-black border border-zinc-700">
                            M
                          </kbd>
                          <kbd className="px-2.5 py-1 rounded bg-zinc-900 text-[#f59e0b] font-black border border-zinc-700">
                            T
                          </kbd>
                          <kbd className="px-2.5 py-1 rounded bg-zinc-900 text-[#f59e0b] font-black border border-zinc-700">
                            F8
                          </kbd>
                          <kbd className="px-2.5 py-1 rounded bg-zinc-900 text-[#f59e0b] font-black border border-zinc-700">
                            F9
                          </kbd>
                        </div>
                      </div>

                      <h3 className="font-serif text-[27px] font-bold text-white leading-snug pt-1">
                        Arqueo ciego de caja y atajos rápidos.
                      </h3>

                      <p className="text-base text-zinc-300 leading-relaxed">
                        Control antifraude al cerrar cada turno, libro diario de gastos y proveedores, exportación a Excel y cobro express por teclado.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">AUDITORÍA DE CAJA</span>
                      <span className="px-3 py-1 rounded-lg bg-[#042f1f] text-[#34d399] font-bold border border-[#15803d]">
                        Cierre sin faltantes
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM CALLOUT BAR */}
                <div className="relative z-20 rounded-2xl bg-[#121215] border border-zinc-800 p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#e85d45] text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-white">
                        14 días de prueba gratis • Cargamos tu menú sin cargo
                      </p>
                      <p className="text-xs text-zinc-400">
                        Funciona en cualquier PC, notebook, tablet o celular sin instalar programas
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-2.5 rounded-xl bg-[#e85d45] text-white font-mono text-lg font-black tracking-wide shadow-lg">
                    pos.roosty.com.ar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
