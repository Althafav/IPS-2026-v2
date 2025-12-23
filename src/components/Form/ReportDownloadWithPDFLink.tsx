"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import JsLoader from "@/modules/JsLoader";

function triggerDownload(pdfUrl: string) {

  const a = document.createElement("a");
  a.href = pdfUrl;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function ReportDownloadWithPDFLink({
  pdfUrl,
  buttonText = "Download the Report",
}: {
  pdfUrl?: string | null;
  buttonText?: string;
}) {
  const [open, setOpen] = useState(false);

  if (!pdfUrl) return null;

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="py-2 px-4 bg-primary rounded-full text-white cursor-pointer hover:opacity-90 transition"
      >
        {buttonText}
      </button>

      <NewsLetterPopup
        open={open}
        onClose={() => setOpen(false)}
        pdfUrl={pdfUrl}
      />
    </div>
  );
}

function NewsLetterPopup({
  open,
  onClose,
  pdfUrl,
}: {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
}) {
 
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Watch thank-you div -> when it becomes visible, download PDF + close modal
  const thankYouRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const el = thankYouRef.current;
    if (!el) return;

    let fired = false;

    const checkAndFire = () => {
      if (fired) return;
      const style = window.getComputedStyle(el);
      const visible =
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0" &&
        (el.textContent?.trim()?.length ?? 0) >= 0;

      if (visible) {
        fired = true;
        triggerDownload(pdfUrl);
        onClose();
      }
    };

    // 1) Check immediately (in case script already toggled)
    checkAndFire();

    // 2) Observe changes (style / class / content)
    const obs = new MutationObserver(() => checkAndFire());
    obs.observe(el, {
      attributes: true,
      attributeFilter: ["style", "class"],
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => obs.disconnect();
  }, [open, pdfUrl, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
        aria-label="Close popup"
      />

      {/* modal */}
      <div className="relative z-[1000] mx-auto mt-20 w-[92%] max-w-lg">
        <div className="rounded-3xl border border-white/10 bg-neutral-950/95 shadow-2xl backdrop-blur p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Get the report
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Submit your email to download the PDF.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-3 py-1 text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-6">
            <NewsLetterComponent thankYouRef={thankYouRef} />
          </div>

          <p className="mt-4 text-xs text-white/50 text-center">
            We respect your privacy. No spam.
          </p>
        </div>
      </div>
    </div>
  );
}

function NewsLetterComponent({
  thankYouRef,
}: {
  thankYouRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/newsLetter.js`);
  }, []);

  return (
    <form
      method="POST"
      action="//ac.strategic.ae/proc.php"
      id="_form_235_"
      className="_form _form_235 _inline-form _dark w-full"
      noValidate
    >
      <input type="hidden" name="u" value="235" />
      <input type="hidden" name="f" value="235" />
      <input type="hidden" name="s" />
      <input type="hidden" name="c" value="0" />
      <input type="hidden" name="m" value="0" />
      <input type="hidden" name="act" value="sub" />
      <input type="hidden" name="v" value="2" />
      <input type="hidden" name="or" value="9243508e4fec06bbf20d1c5a63ea74ae" />

      <div className="_form-content">
        <div className="space-y-4">
          <input
            type="text"
            className="form-control text-white mt-1 block w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 placeholder-white/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <div className="flex justify-center">
            <div
              className="g-recaptcha"
              data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              id="_form_235_submit"
              className="newsletter-submit cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
              value="Submit & Download"
            />
          </div>
        </div>
      </div>

      {/* IMPORTANT: we attach ref here so we can detect when it becomes visible */}
      <div
        ref={thankYouRef}
        className="_form-newsletter-thank-you text-white text-center w-full mt-4"
        style={{ display: "none" }}
      />
    </form>
  );
}
