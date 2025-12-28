# 💰 シンプル旅行精算 (my-seisan-app)

旅行や飲み会の「誰がいくら払ったか」を記録し、最短の手順で精算方法を導き出すシンプルなWebアプリです。

## ✨ 主な機能

- **メンバー管理**: 参加者の追加・削除
- **支払い記録**: 
  - 支払者とタイトルの記録
  - **日時を自動記録**（いつの支払いか一目でわかります）
  - 個別の対象者選択（特定のメンバーだけの支払いにも対応）
- **自動精算ロジック**: 複雑な貸し借りを計算し、「誰が誰にいくら渡すか」を最小限の回数で表示
- **共有機能**: 精算結果をワンクリックでクリップボードにコピー（LINE等への貼り付け用）
- **データ**: ブラウザの LocalStorage を利用し、リロードしてもデータが消えません
- **全クリア**: 精算が終わったらすべてのデータを一括リセット

## 🚀 使い方

1. **メンバーを追加**: 一緒に旅行に行く人の名前を入力します。
2. **支払いを記録**: 「誰が」「何のために」「いくら」払ったかを入力し、対象となるメンバーにチェックを入れて追加します。
3. **結果を確認**: 画面下部に表示される「精算方法」を確認します。
4. **共有する**: 「結果をコピー」ボタンを押し、LINEグループなどに貼り付けてメンバーに伝えます。
5. **クリア**: すべて終わったら「全クリア」でリセットします。

## 🛠 技術スタック

- **React** (Vite)
- **JavaScript**
- **LocalStorage API** (データ保存)
- **GitHub Pages** (ホスティング)

## 📝 開発の背景

旅行後の面倒な計算をスマホでパッと終わらせて、その場でLINE共有するために作成しました。





---

# 💰 Easy Settle Up (seisan-app)

A simple web application to record travel and party expenses and calculate the most efficient way to settle debts among members.

## ✨ Key Features

* **Member Management**: Easily add or remove participants.
* **Payment Records**:
* Record payer and item title.
* **Automatic Timestamping**: Every payment is recorded with the date and time for clear tracking.
* **Individual Selection**: Support for payments that apply only to specific members.


* **Auto-Settlement Logic**: Calculates complex debts and displays "who pays whom, and how much" in the minimum number of transactions.
* **Sharing Function**: Copy settlement results to the clipboard with one click (optimized for sharing on LINE or other messaging apps).
* **Data Persistence**: Uses Browser LocalStorage to ensure data is not lost upon refreshing.
* **Total Reset**: Clear all data at once after settlement is complete.

## 🚀 How to Use

1. **Add Members**: Enter the names of the people participating in the trip or event.
2. **Record Payments**: Enter "Who," "For What," and "How Much," then check the members involved and add the record.
3. **Check Results**: Review the "Settlement Method" displayed at the bottom of the screen.
4. **Share**: Click the "Copy Results" button and paste it into your group chat (e.g., LINE).
5. **Clear**: Once finished, use "Clear All" to reset for your next trip.

## 🛠 Tech Stack

* **React** (Vite)
* **JavaScript**
* **LocalStorage API** (Data persistence)
* **GitHub Pages** (Hosting)

## 📝 Background

Created to eliminate tedious post-trip calculations on the spot and share the results via messaging apps instantly.


