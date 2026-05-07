# Nest Token Extractor (Chrome Extension)

A unified Google Chrome extension that easily extracts the authentication credentials required for home automation projects integrating Nest devices. It breaks down the outputs into distinct, copyable fields so you can plug them directly into your integration.

Supports major custom components and plugins including:

- [Home Assistant: Nest Legacy](https://github.com/tronikos/nest_legacy)
- [Home Assistant: ha-nest-protect](https://github.com/iMicknl/ha-nest-protect)
- [Homebridge Nest](https://github.com/chrisjshull/homebridge-nest)
- [Homebridge Nest Accfactory](https://github.com/n0rt0nthec4t/homebridge-nest-accfactory)

## Features

- **Google Accounts Support**: Automatically extracts both `issueToken` and `cookies` values.
- **Legacy Nest Accounts Support**: Directly fetches the legacy `access_token` session token.
- **Field Test Environment**: Easily toggle between Production (`home.nest.com`) and Field Test (`home.ft.nest.com`) environments.
- **Isolated Fields**: Outputs raw, unencoded fields so you can extract exactly what you need.

## Installation

1. Download the latest `nest-token-extractor.zip` from the [Releases page](https://github.com/tronikos/nest-token-extractor/releases/latest).
2. Unzip the file onto your computer.
3. Open Google Chrome (or a Chromium-based browser) and navigate to `chrome://extensions`.
4. Enable **Developer mode** (toggle in the top-right corner).
5. Click **Load unpacked** and select the unzipped `extension` folder.
6. Pin the extension icon to your browser toolbar for easy access.

## Usage

1. **⚠️ IMPORTANT**: Use a standard Chrome window. Do **NOT** use Incognito Mode, as third-party login cookies are restricted and you will face endless redirect loops during authentication.
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
