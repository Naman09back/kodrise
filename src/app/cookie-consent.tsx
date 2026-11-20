"use client";

import {useEffect, useState} from "react";
import styles from "./cookie-consent.module.css";

const consentKey = "kodrise-cookie-consent";

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(consentKey);
    setVisible(!saved);
    if (saved) setAnalytics(saved === "all");
    setReady(true);
  }, []);

  function saveConsent(level: "essential" | "all") {
    localStorage.setItem(consentKey, level);
    setVisible(false);
    setSettingsOpen(false);
  }

  if (!ready || !visible) return null;

  return <>
    <aside className={styles.banner} aria-label="Cookie notice" data-cookie-consent-banner="true">
      <p>Our website uses cookies to improve your browsing experience. By clicking “Accept”, you consent to cookies as described in our privacy policy.</p>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={() => saveConsent("all")}>Accept</button>
        <button type="button" className={styles.settingsButton} onClick={() => setSettingsOpen(true)}>Change settings</button>
      </div>
    </aside>
    {settingsOpen && <div className={styles.backdrop} onMouseDown={(event) => {if (event.target === event.currentTarget) setSettingsOpen(false);}}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
        <button className={styles.close} type="button" aria-label="Close settings" onClick={() => setSettingsOpen(false)}>×</button>
        <span className={styles.kicker}>PRIVACY SETTINGS</span>
        <h2 id="cookie-settings-title">Choose your cookie settings</h2>
        <p>Essential cookies keep the site working. You can choose whether to allow optional analytics cookies.</p>
        <div className={styles.settingRow}><span><strong>Essential</strong><small>Required for basic site features</small></span><input type="checkbox" checked disabled aria-label="Essential cookies always enabled" /></div>
        <label className={styles.settingRow}><span><strong>Analytics</strong><small>Helps us understand how the site is used</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
        <div className={styles.dialogActions}><button type="button" onClick={() => saveConsent("essential")}>Essential only</button><button type="button" className={styles.accept} onClick={() => saveConsent(analytics ? "all" : "essential")}>Save preferences</button></div>
      </section>
    </div>}
  </>;
}
