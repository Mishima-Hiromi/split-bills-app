import React from "react";

// 履歴表示専用の部品（onDelete を受け取るように追加）
function HistoryList({ payments, onDelete }) {
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
      <h3 style={titleStyle}>支払い履歴</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
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

            {/* 削除ボタンを追加 */}
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
};

export default HistoryList;
