# SCT LMS Login Manager Chrome Extension

## Overview

**Japanese description follows below.**

SCT LMS Login Manager is a Chrome extension designed to automate logout processes on the SCT LMS website (https://sct-lms.com). This extension starts a timer after the login button is clicked, logs out automatically after the specified time has passed, and clicks a specific button on the logout page.

## Features

- **Start Timer on Login**: Starts a timer when the login button is clicked, counting down to the automatic logout.
- **Automatic Logout**: Automatically logs out after the specified time has elapsed, reloads open tabs, and navigates to the logout page.
- **Post-Logout Processing**: Clicks the "Continue" button on the logout page.
- **Settings Page**: Provides a settings page to configure the logout timer.

## Installation

1. Open Google Chrome.
2. Navigate to [Chrome Extensions Management Page](chrome://extensions/).
3. Turn on "Developer mode" in the upper right corner.
4. Click "Load unpacked" and select the directory containing the extension's source code.
5. The extension should now be installed and an icon will appear in the toolbar.

## Configuration

1. Click the extension icon to open the settings page.
2. Enter the logout time in the `Logout Time` field in `hh:mm:ss` format. The maximum allowed value is `08:00:00`.
3. Click the "Save" button to save the settings.

## Usage

1. Log in to the SCT LMS website.
2. Click the login button to start the timer.
3. After the configured time has elapsed, the extension will automatically log out.
4. The logout page will open, and the extension will click the "Continue" button and close the tab.

## Troubleshooting

- **Extension Not Working**: Ensure the extension icon is active and check that the SCT LMS website is properly loaded.
- **Settings Not Saving**: If an error occurs when clicking the "Save" button, try clearing your browser's cache and reinstalling the extension.

## Developer

- **Name**: Kyosuke Homma
- **Contact**: kyosukehomma@gmail.com

---

# SCT LMS ログインマネージャー Chrome 拡張機能

## 概要

SCT LMS ログインマネージャーは、SCT LMS ウェブサイト（https://sct-lms.com）でのログアウトを自動化するための Chrome 拡張機能です。この拡張機能は、ログインボタンがクリックされた後にタイマーを開始し、指定された時間が経過すると自動的にログアウトします。また、ログアウトページで特定のボタンをクリックします。

## 主な機能

- **ログイン時にタイマー開始**: ログインボタンがクリックされると、タイマーが開始され、自動ログアウトまでカウントダウンします。
- **自動ログアウト**: 指定された時間が経過した後に自動でログアウトし、開いているタブをリロードし、ログアウトページに遷移します。
- **ログアウト後の処理**: ログアウトページで「続ける」ボタンをクリックします。
- **設定ページ**: ログアウトタイマーを設定するための設定ページです。

## インストール方法

1. Google Chrome を開きます。
2. [Chrome 拡張機能の管理ページ](chrome://extensions/) にアクセスします。
3. 右上の「デベロッパーモード」をオンにします。
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、拡張機能のソースコードが含まれるディレクトリを選択します。
5. 拡張機能がインストールされ、ツールバーにアイコンが表示されます。

## 設定方法

1. 拡張機能のアイコンをクリックして設定ページを開きます。
2. `Logout Time` フィールドに、`hh:mm:ss` 形式でログアウトまでの時間を入力します。最大値は `08:00:00` です。
3. 「Save」ボタンをクリックして設定を保存します。

## 使用方法

1. SCT LMS ウェブサイトにログインします。
2. ログインボタンをクリックしてタイマーを開始します。
3. 設定した時間が経過すると、拡張機能が自動的にログアウト処理を実行します。
4. ログアウトページが開かれると、「続ける」ボタンがクリックされ、そのタブが自動で閉じられます。

## トラブルシューティング

- **拡張機能が動作しない**: 拡張機能のアイコンがアクティブであることを確認し、SCT LMS ウェブサイトが正しく開かれているか確認してください。
- **設定が保存されない**: 「Save」ボタンをクリックした際にエラーが表示された場合は、ブラウザのキャッシュをクリアし、拡張機能を再インストールしてみてください。

## 開発者

- **名前**: Kyosuke Homma
- **連絡先**: kyosukehomma@gmail.com

