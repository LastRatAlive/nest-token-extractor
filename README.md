# Nest Token Extractor (Cross-Browser Extension)

A unified browser extension that easily extracts the authentication credentials required for home automation projects integrating Nest devices. It breaks down the outputs into distinct, copyable fields so you can plug them directly into your integration.

Supports major custom components and plugins including:

- [Home Assistant: Nest Legacy](https://github.com/tronikos/nest_legacy)
- [Home Assistant: ha-nest-protect](https://github.com/iMicknl/ha-nest-protect)
- [Homebridge Nest](https://github.com/chrisjshull/homebridge-nest)
- [Homebridge Nest Accfactory](https://github.com/n0rt0nthec4t/homebridge-nest-accfactory)

## Features

- **Multi-Browser Support**: Works identically on Google Chrome, Mozilla Firefox, and Apple Safari.
- **Google Accounts Support**: Automatically extracts both `issueToken` and `cookies` values.
- **Legacy Nest Accounts Support**: Directly fetches the legacy `access_token` session token.
- **Field Test Environment**: Easily toggle between Production (`home.nest.com`) and Field Test (`home.ft.nest.com`).
- **Isolated Fields**: Outputs raw, unencoded fields so you can extract exactly what you need.

## Installation

Download the respective zip file for your browser from the [Releases page](https://github.com/tronikos/nest-token-extractor/releases/latest).

### Google Chrome (and Chromium browsers)

1. Unzip `nest-token-extractor-chrome.zip`.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the unzipped folder.

### Mozilla Firefox

1. Unzip `nest-token-extractor-firefox.zip`.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...**
4. Select the `manifest.json` file inside the unzipped folder.

### Apple Safari (macOS)

Because this is an unsigned community build, you must enable Safari's developer settings to register it:

1. Unzip `nest-token-extractor-safari.zip` and move `Nest Token Extractor.app` to your Applications folder.
2. Open Safari and go to **Safari > Settings > Advanced**. Check **Show features for web developers**.
3. Go to the new **Develop** menu in your system top bar and click **Allow Unsigned Extensions**.
4. Launch `Nest Token Extractor.app` once to register it with macOS.
5. Go back into **Safari > Settings > Extensions** and toggle the checkbox next to the extension to enable it.

## Usage

> [!WARNING]
> **⚠️ CRITICAL BROWSER WARNING (Google Chrome):**
> Do **NOT** use Google Chrome or Microsoft Edge to extract cookies for Google Accounts. Modern Chromium-based browsers use aggressive, hardware-bound session security (Device Bound Session Credentials / DBSC) with Google. Cookies extracted via Chrome are cryptographically bound to the Chrome hardware profile and will fail with `Invalid authentication` in Python/Home Assistant or Homebridge.
> **You MUST use Firefox or Safari** to run this extraction and get a long-lived, portable cookie.

> [!TIP]
> **💡 FIREFOX ENHANCED TRACKING PROTECTION:**
> Firefox's Enhanced Tracking Protection (ETP) blocks third-party cookie transmission in cross-origin frames by default. While this extension implements automatic cookie jar fallbacks, if you still get an empty **Cookies** field, click the **Shield** icon in the Firefox address bar on `home.nest.com` and toggle off **Enhanced Tracking Protection**. Then restart the extraction.

1. **⚠️ IMPORTANT**: Use a standard browsing window. Do **NOT** use Incognito/Private Mode, as third-party login cookies are restricted and you will face endless redirect loops during authentication.
2. Click the extension icon in your browser toolbar.
3. Select your environment (Production or Field Test).
4. Click the **Open Nest & Start Extraction** button. This will automatically redirect you to the appropriate Nest portal.
5. Sign in as you normally would:
    - Log in via Google, **OR**
    - Log in using your legacy Nest email/password.
6. Wait for the extension badge to show a green checkmark (`✓`).
7. Click the extension icon again. Your credentials will be populated in the window.
8. Use the "Copy" buttons next to the respective fields and paste them into your plugin/integration config.
9. **DO NOT explicitly log out of the Nest portal**, as this will immediately kill the session tokens you just extracted. Simply close the tab.

## Privacy & Permissions

This extension requests the bare minimum permissions needed to function:

- **cookies**: Required to capture the Google authentication `SID`, `SSID`, etc. markers.
- **webRequest**: Required to silently intercept the OAuth tokens requested securely by Google.
- **tabs**: To automatically spawn the authentication flow window.

**Data safety guarantee**: This extension runs entirely locally in your browser. None of your tokens or cookies are ever transmitted, tracked, or sent externally. All code is open-source.
