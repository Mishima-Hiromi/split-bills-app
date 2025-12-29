import React from "react";

function PaymentForm({
  isMobile,
  members = [],
  payWho,
  setPayWho,
  payTitle,
  setPayTitle,
  payAmount,
  setPayAmount,
  targetMembers = [],
  setTargetMembers,
  onAdd,
}) {
  // --- スタイル定義 ---
  const sectionStyle = {
    padding: "20px",
    border: "1px solid #444",
    borderRadius: "12px",
    backgroundColor: "#222",
    height: isMobile ? "auto" : "100%",
    minHeight: isMobile ? "350px" : "0",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
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
    textAlign: "center",
  };
  const badgeStyle = {
    backgroundColor: "#444",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
  };
  const submitBtnStyle = {
    width: "100%",
    padding: "15px",
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "auto",
  };

  const getSelectStyle = (isEmpty) => ({
    ...inputStyle,
    textAlign: "left",
    cursor: "pointer",
    backgroundColor: "#333",
    borderRadius: "4px",
    padding: "4px 25px 4px 10px",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="${
      isEmpty ? "%23888" : "white"
    }"><path d="M7 10l5 5 5-5z"/></svg>')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
    color: isEmpty ? "#888" : "#fff", // ★ 空ならグレー、選ばれたら白
  });

  return (
    <section style={sectionStyle}>
      <h2 style={{ marginTop: "0px", marginBottom: "20px" }}>支払いを入力</h2>
      <div
        style={{ marginTop: "0px", marginBottom: "15px", fontSize: "1.2rem" }}
      >
        {/* 誰が */}
        <select
          style={getSelectStyle(payWho === "")}
          value={payWho}
          onChange={(e) => setPayWho(e.target.value)}
        >
          <option value="" style={{ color: "#444" }}>
            名前を入力
          </option>
          {members.map((name, index) => (
            <option
              key={index}
              value={name}
              style={{
                backgroundColor: "#222",
                color: "#fff",
                textAlign: "left",
              }}
            >
              {name}
            </option>
          ))}
        </select>
        <span> さんが、</span>

        {/* 何に */}
        <input
          style={{ ...inputStyle, width: "100px", textAlign: "center" }}
          placeholder="何に"
          value={payTitle}
          onChange={(e) => setPayTitle(e.target.value)}
        />
        <span> に、</span>

        {/* いくら */}
        <input
          type="number"
          style={{ ...inputStyle, width: "80px", textAlign: "center" }}
          placeholder="金額"
          value={payAmount}
          onChange={(e) => setPayAmount(e.target.value)}
        />
        <span> 円支払った。</span>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "0.8rem", color: "#aaa", marginBottom: "8px" }}>
          支払い対象者：
        </p>
        <div
          style={{
            flex: 1, // ボタンと入力欄以外のスペースを全部使う
            overflowY: "auto", // はみ出したらスクロール
            minHeight: "0", // flex指定時に高さがバグるのを防ぐ
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            maxHeight: "110px",
          }}
        >
          {members.map((name, index) => (
            <label key={index} style={badgeStyle}>
              <input
                type="checkbox"
                checked={targetMembers.includes(name)}
                onChange={() => {
                  if (targetMembers.includes(name)) {
                    setTargetMembers(targetMembers.filter((t) => t !== name));
                  } else {
                    setTargetMembers([...targetMembers, name]);
                  }
                }}
              />
              {name}
            </label>
          ))}
        </div>
      </div>

      <button onClick={onAdd} style={submitBtnStyle}>
        支払いを追加する
      </button>
    </section>
  );
}

export default PaymentForm;
