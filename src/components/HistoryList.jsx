import React, { useState } from "react";

function HistoryList({ isMobile, payments, onDelete }) {
  const [copiedId, setCopiedId] = useState(null);
  const [allCopied, setAllCopied] = useState(false);

  const formatItem = (p) =>
    `[${p.date}] ${p.payer}さんが「${p.title}」に${p.amount.toLocaleString()}円支払った。\n対象：${p.participants.join(", ")}`;

  const handleCopyItem = (p) => {
    navigator.clipboard
      .writeText(formatItem(p))
      .then(() => {
        setCopiedId(p.id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch(() => alert("コピーに失敗しました"));
  };

  const handleCopyAll = () => {
    const now = new Date().toLocaleString("ja-JP");
    const text =
      `【支払い履歴】\n作成日: ${now}\n\n` +
      payments.map(formatItem).join("\n\n");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setAllCopied(true);
        setTimeout(() => setAllCopied(false), 2000);
      })
      .catch(() => alert("コピーに失敗しました"));
  };

  // --- スタイル定義 ---
  const sectionStyle = {
    padding: "20px",
    border: "1px solid #444",
    borderRadius: "12px",
    backgroundColor: "#222",
  };

  const titleStyle = {
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "1.1rem",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #333",
    padding: "15px 0",
    gap: "10px",
  };

  const deleteBtnStyle = {
    backgroundColor: "transparent",
    border: "1px solid #555",
    color: "#666",
    borderRadius: "4px",
    width: "28px",
    height: "28px",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    flexShrink: 0,
  };

  const copyBtnStyle = (active) => ({
    backgroundColor: active ? "#388e3c" : "transparent",
    border: `1px solid ${active ? "#388e3c" : "#555"}`,
    color: active ? "#fff" : "#888",
    borderRadius: "4px",
    padding: "2px 7px",
    cursor: "pointer",
    fontSize: "0.72rem",
    whiteSpace: "nowrap",
    transition: "all 0.2s",
    flexShrink: 0,
  });

  const allCopyBtnStyle = {
    backgroundColor: allCopied ? "#388e3c" : "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "4px 10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.75rem",
  };

  if (payments.length === 0) {
    return (
      <section style={sectionStyle}>
        <h3 style={titleStyle}>支払い履歴</h3>
        <p style={{ color: "#888", textAlign: "center" }}>
          まだ記録がありません
        </p>
      </section>
    );
  }

  return (
    <section style={sectionStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ ...titleStyle, marginBottom: 0 }}>支払い履歴</h3>
        <button onClick={handleCopyAll} style={allCopyBtnStyle}>
          {allCopied ? "コピー済み ✓" : "全件コピー"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: payments.length <= 3 ? "auto" : "300px",
          overflowY: "auto",
        }}
      >
        {payments.map((p) => (
          <div key={p.id} style={itemStyle}>
            <div style={{ flex: 1 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "0.75rem", color: "#888" }}>
                  {p.date}
                </span>
              </div>
              <div>
                <strong>{p.payer}</strong> さんが
                <strong> {p.title} </strong> に
                <strong> {p.amount.toLocaleString()} </strong> 円支払った。
              </div>
              <div
                style={{ fontSize: "0.8rem", color: "#888", marginTop: "4px" }}
              >
                対象：{p.participants.join(", ")}
              </div>
            </div>

            <button
              onClick={() => handleCopyItem(p)}
              style={copyBtnStyle(copiedId === p.id)}
              title="この項目をコピー"
            >
              {copiedId === p.id ? "✓" : "コピー"}
            </button>

            <button
              onClick={() => onDelete(p.id)}
              style={deleteBtnStyle}
              title="削除"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HistoryList;
