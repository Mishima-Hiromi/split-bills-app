import React from "react";

function MemberSection({
  members,
  payments,
  nameInput,
  setNameInput,
  onAdd,
  onDelete,
  onClearAll,
}) {
  return (
    <section style={sectionStyle}>
      <h2 style={{ marginTop: "0px", marginBottom: "20px" }}>メンバー管理</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          style={inputStyle}
          placeholder="名前を入力"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        {/* メンバー追加ボタン */}
        <button onClick={onAdd} style={addBtnStyle}>
          メンバーを追加
        </button>

        {/* 全クリアボタン */}
        <button onClick={onClearAll} style={clearBtnStyle}>
          全クリア
        </button>
      </div>

      <div style={scrollContainerStyle}>
        {members.map((name, index) => {
          const paid = payments
            .filter((p) => p.payer === name)
            .reduce((sum, p) => sum + p.amount, 0);

          const burden = payments
            .filter((p) => p.participants.includes(name))
            .reduce((sum, p) => sum + p.amount / p.participants.length, 0);

          return (
            <div key={index} style={memberRowStyle}>
              <div style={{ flex: 1, fontWeight: "bold" }}>{name}</div>

              <div style={amountGroupStyle}>
                <div style={amountDetailStyle}>
                  <span style={labelStyle}>立て替え額</span>

                  <span style={{ color: "#4caf50" }}>
                    ¥{paid.toLocaleString()}
                  </span>
                </div>

                <div style={amountDetailStyle}>
                  <span style={labelStyle}>利用額</span>

                  <span style={{ color: "#ff5252" }}>
                    ¥{Math.round(burden).toLocaleString()}
                  </span>
                </div>
              </div>

              <button onClick={() => onDelete(index)} style={deleteBtnStyle}>
                削除
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// スタイル定義

const sectionStyle = {
  padding: "20px",
  border: "1px solid #444",
  borderRadius: "12px",
  backgroundColor: "#222",
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minHeight: 0,
};

const inputStyle = {
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "2px solid #555",
  color: "#fff",
  fontSize: "1.1rem",
  padding: "2px 5px",
  outline: "none",
  flex: 1,
};

const addBtnStyle = {
  padding: "5px 15px",
  cursor: "pointer",
  backgroundColor: "#2196f3",
};

const memberRowStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#333",
  padding: "10px 15px",
  borderRadius: "8px",
  gap: "15px",
};

const amountGroupStyle = {
  display: "flex",
  gap: "20px",
  fontSize: "0.85rem",
  textAlign: "right",
};

const amountDetailStyle = { display: "flex", flexDirection: "column" };

const labelStyle = { color: "#888", fontSize: "0.7rem", marginBottom: "2px" };

const deleteBtnStyle = {
  border: "none",
  background: "none",
  color: "#666",
  cursor: "pointer",
  fontSize: "1rem",
};

const scrollContainerStyle = {
  flex: 1, // ボタンと入力欄以外のスペースを全部使う
  overflowY: "auto", // はみ出したらスクロール
  minHeight: 0, // flex指定時に高さがバグるのを防ぐ
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingRight: "5px",
};

// クリアボタン
const clearBtnStyle = {
  backgroundColor: "transparent",
  color: "#ff5252", // 警告の赤色
  border: "1px solid #ff5252",
  borderRadius: "4px",
  padding: "4px 8px",
  fontSize: "0.75rem",
  cursor: "pointer",
  transition: "all 0.2s",
};

export default MemberSection;
