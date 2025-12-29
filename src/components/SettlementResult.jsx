import React from "react";

function SettlementResult({ isMobile, members = [], payments = [] }) {
  // --- 1. 全員の「立て替え額」「利用額」「収支」を計算 ---
  const stats = members.map((name) => {
    // 自分が支払った合計
    const paid = payments
      .filter((p) => p?.payer === name)
      .reduce((sum, p) => sum + (Number(p?.amount) || 0), 0);

    // 自分が参加した支払いの負担合計
    const burden = payments
      .filter((p) => p?.participants?.includes(name))
      .reduce((sum, p) => {
        const participantCount = p?.participants?.length || 1;
        return sum + (Number(p?.amount) || 0) / participantCount;
      }, 0);

    return { name, paid, burden, diff: paid - burden };
  });

  // --- 2. 精算マッチング処理 (債務者と債権者に分ける) ---
  let debtors = stats
    .filter((s) => s.diff < -0.9)
    .map((s) => ({ ...s, diff: Math.abs(s.diff) }));
  let creditors = stats.filter((s) => s.diff > 0.9);

  const results = [];
  debtors.forEach((debtor) => {
    creditors.forEach((creditor) => {
      if (debtor.diff <= 0 || creditor.diff <= 0) return;
      const amount = Math.min(debtor.diff, creditor.diff);
      results.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(amount),
      });
      debtor.diff -= amount;
      creditor.diff -= amount;
    });
  });

  // --- 3. クリップボードへコピーする関数 ---
  const handleCopy = () => {
    const now = new Date().toLocaleString("ja-JP");
    let text = `【精算レポート】\n作成日: ${now}\n\n`;

    text += "■各自の状況\n";
    stats.forEach((s) => {
      text += `${
        s.name
      }\n  立て替え額: ¥${s.paid.toLocaleString()}\n  利用額: ¥${Math.round(
        s.burden
      ).toLocaleString()}\n`;
    });

    text += "\n■精算方法\n";
    if (results.length === 0) {
      text += "精算の必要はありません。";
    } else {
      results.forEach((res) => {
        text += `${res.from} → ${res.to} : ¥${res.amount.toLocaleString()}\n`;
      });
    }

    navigator.clipboard
      .writeText(text)
      .then(() =>
        alert("精算結果をコピーしました！LINEなどで共有してください。")
      )
      .catch(() => alert("コピーに失敗しました"));
  };

  if (results.length === 0 && stats.every((s) => s.paid === 0)) return null;

  // --- スタイル  ---
  const sectionStyle = {
    padding: "20px",
    border: "2px solid #2196f3",
    borderRadius: "12px",
    height: results.length <= 4 ? "auto" : isMobile ? "250px" : "250px",
    overflowY: "auto", // ここでスクロール
  };

  const resultRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 0",
    borderBottom: "1px solid #334155",
  };

  const amountStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fbbf24",
    marginLeft: "auto",
  };

  const shareBtnStyle = {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.8rem",
  };

  return (
    <section style={sectionStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "15px",
        }}
      >
        <h2 style={{ color: "#2196f3", margin: 0 }}>💰 精算結果</h2>
        <button onClick={handleCopy} style={shareBtnStyle}>
          結果をコピー
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {results.length > 0 ? (
          results.map((res, i) => (
            <div key={i} style={resultRowStyle}>
              <span style={{ fontWeight: "bold" }}>{res.from}</span>
              <span style={{ fontSize: "0.8rem", color: "#aaa" }}>さんが</span>
              <span style={{ fontWeight: "bold" }}>{res.to}</span>
              <span style={{ fontSize: "0.8rem", color: "#aaa" }}>さんへ</span>
              <span style={amountStyle}>{res.amount.toLocaleString()} 円</span>
              <span>渡す</span>
            </div>
          ))
        ) : (
          <div style={{ color: "#888", textAlign: "center", padding: "10px" }}>
            精算の必要はありません
          </div>
        )}
      </div>
    </section>
  );
}

export default SettlementResult;
