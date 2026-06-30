# Air Fryer Times

エアフライヤーでよく使う食材の加熱時間メモです。

## 掲載している食材

- 細め冷凍ポテト
- 冷凍イカゲソ
- 冷凍砂肝（銀皮なし）
- 鮭、さんま、さば
- 豚もも薄切り、豚ロース1cm

## 使い方

```bash
npm run check
npm start
```

ローカル確認後、GitHubへpushしてVercelへ公開します。

```bash
git status -sb
git add .
git commit -m "Update air fryer times"
git push
vercel --prod --yes
```

## 情報の扱い

- 時間は機種差が出るので、短めから始めて1から2分ずつ追加します。
- 肉と魚は中心温度を優先します。
- 安全温度の根拠はFoodSafety.govの表を参照しています。
