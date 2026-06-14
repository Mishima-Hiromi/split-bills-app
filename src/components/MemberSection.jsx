import React from "react";

function MemberSection({
  isMobile,
  members,
  payments,
  nameInput,
  setNameInput,
  onAdd,
  onDelete,
  onClearAll,
}) {
  // スタイル定義

  // モバイル: 1行≒95px+gap10px、PC: 1行≒58px+gap10px で4人分まで非スクロール
  const rowH = isMobile ? 95 : 58;
  const scrollMaxHeight =
    members.length <= 4 ? "none" : `${4 * rowH + 3 * 10}px`;

  const sectionStyle = {
    padding: "20px",
    border: "1px solid #444",
    borderRadius: "12px",
    backgroundColor: "#222",
    boxSizing: "border-box",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    width: "100%",
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
    alignItems: isMobile ? "flex-start" : "center",
    flexDirection: isMobile ? "column" : "row",
    backgroundColor: "#333",
    padding: "10px 15px",
    borderRadius: "8px",
    gap: isMobile ? "6px" : "15px",
  };

  const memberTopRowStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "10px",
  };

  const amountGroupStyle = {
    display: "flex",
    gap: isMobile ? "12px" : "20px",
    fontSize: "0.85rem",
    textAlign: "right",
    width: isMobile ? "100%" : "auto",
    justifyContent: isMobile ? "space-between" : "flex-end",
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
    overflowY: members.length > 4 ? "auto" : "visible",
    maxHeight: scrollMaxHeight,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingRight: "5px",
    paddingBottom: isMobile ? "10px" : "0",
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

  // ボタン2つを横に並べるための囲み
  const buttonGroupStyle = {
    display: "flex",
    gap: "10px",
    width: isMobile ? "100%" : "auto", // スマホなら横幅いっぱい
  };

  // ボタン共通のレスポンシブスタイル
  const getResponsiveBtnStyle = (baseStyle) => {
    const isClear = baseStyle === clearBtnStyle;
    return {
      ...baseStyle,
      flex: isMobile ? 1 : "none", // スマホなら均等に幅を分ける
      height: isMobile ? "45px" : "auto", // スマホで押しやすく少し高く
      borderRadius: "6px",

      color: isClear ? "#ff5252" : "white",
      border: isClear ? "1px solid #ff5252" : "none",
      backgroundColor: isClear ? "transparent" : baseStyle.backgroundColor,
      fontWeight: "bold",
    };
  };

  return (
    <section style={sectionStyle}>
      <h2 style={{ marginTop: "0px", marginBottom: "20px" }}>メンバー管理</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <input
          style={inputStyle}
          placeholder="名前を入力(最大10文字)"
          value={nameInput}
          maxlength={10}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <div style={buttonGroupStyle}>
          {/* メンバー追加ボタン */}
          <button onClick={onAdd} style={getResponsiveBtnStyle(addBtnStyle)}>
            メンバーを追加
          </button>

          {/* 全クリアボタン */}
          <button
            onClick={onClearAll}
            style={getResponsiveBtnStyle(clearBtnStyle)}
          >
            全クリア
          </button>
        </div>
      </div>
      <div style={scrollContainerStyle}>
        {members.map((name, index) => {
          const paid = payments
            .filter((p) => p.payer === name)
            .reduce((sum, p) => sum + p.amount, 0);

          const burden = payments
            .filter((p) => p.participants.includes(name))
            .reduce((sum, p) => sum + p.amount / p.participants.length, 0);

          const diff = Math.round(paid - burden);
          const diffColor = diff > 0 ? "#4caf50" : diff < 0 ? "#ff5252" : "#888";
          const diffLabel = diff > 0 ? `+¥${diff.toLocaleString()}` : diff < 0 ? `-¥${Math.abs(diff).toLocaleString()}` : "±¥0";

          return (
            <div key={index} style={memberRowStyle}>
              {isMobile ? (
                <>
                  <div style={memberTopRowStyle}>
                    <div style={{ flex: 1, fontWeight: "bold" }}>{name}</div>
                    <button onClick={() => onDelete(index)} style={deleteBtnStyle}>
                      削除
                    </button>
                  </div>
                  <div style={amountGroupStyle}>
                    <div style={amountDetailStyle}>
                      <span style={labelStyle}>立替</span>
                      <span style={{ color: "#4caf50" }}>¥{paid.toLocaleString()}</span>
                    </div>
                    <div style={amountDetailStyle}>
                      <span style={labelStyle}>利用</span>
                      <span style={{ color: "#ff5252" }}>¥{Math.round(burden).toLocaleString()}</span>
                    </div>
                    <div style={amountDetailStyle}>
                      <span style={labelStyle}>収支</span>
                      <span style={{ color: diffColor, fontWeight: "bold" }}>{diffLabel}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ flex: 1, fontWeight: "bold" }}>{name}</div>
                  <div style={amountGroupStyle}>
                    <div style={amountDetailStyle}>
                      <span style={labelStyle}>立替</span>
                      <span style={{ color: "#4caf50" }}>¥{paid.toLocaleString()}</span>
                    </div>
                    <div style={amountDetailStyle}>
                      <span style={labelStyle}>利用</span>
                      <span style={{ color: "#ff5252" }}>¥{Math.round(burden).toLocaleString()}</span>
                    </div>
                    <div style={amountDetailStyle}>
                      <span style={labelStyle}>収支</span>
                      <span style={{ color: diffColor, fontWeight: "bold" }}>{diffLabel}</span>
                    </div>
                  </div>
                  <button onClick={() => onDelete(index)} style={deleteBtnStyle}>
                    削除
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MemberSection;
