import { useState, useEffect } from "react";
import MemberSection from "./components/MemberSection";
import PaymentForm from "./components/PaymentForm";
import SettlementResult from "./components/SettlementResult";
import HistoryList from "./components/HistoryList";

function App() {
  // --- 状態管理 (State) ---
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("trip_members");
    return saved ? JSON.parse(saved) : [];
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem("trip_payments");
    return saved ? JSON.parse(saved) : [];
  });

  const [nameInput, setNameInput] = useState("");
  const [payWho, setPayWho] = useState("");
  const [payTitle, setPayTitle] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [targetMembers, setTargetMembers] = useState([]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); //スマホ判定

  // --- 自動保存 (Effect) ---
  useEffect(() => {
    localStorage.setItem("trip_members", JSON.stringify(members));
    localStorage.setItem("trip_payments", JSON.stringify(payments));
  }, [members, payments]);

  // 画面サイズ変更で自動更新
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // メンバーリストが変わったら、入力フォームの選択肢を初期化
  useEffect(() => {
    setTargetMembers(members);
  }, [members]);

  // --- ロジック (Functions) ---
  const addMember = () => {
    const trimmedName = nameInput.trim();
    if (!trimmedName) return;
    if (members.includes(trimmedName)) {
      alert("その名前は既に存在します");
      return;
    }
    setMembers([...members, trimmedName]);
    setNameInput("");
  };

  const deleteMember = (indexToDelete) => {
    if (!window.confirm("このメンバーを削除しますか？")) return;
    setMembers(members.filter((_, i) => i !== indexToDelete));
  };

  const addPayment = () => {
    const amount = parseInt(payAmount);
    if (!payWho || !payTitle || isNaN(amount) || targetMembers.length === 0) {
      alert("入力を確認してください（金額は数字で、対象者も1人以上必要です）");
      return;
    }

    const newPayment = {
      id: Date.now(),
      payer: payWho,
      title: payTitle,
      amount: amount,
      participants: targetMembers,
      date: new Date().toLocaleString("ja-JP", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setPayments([...payments, newPayment]);
    setPayTitle("");
    setPayAmount("");
    setTargetMembers(members); // 対象者をリセット
  };

  const deletePayment = (id) => {
    if (!window.confirm("この記録を削除しますか？")) return;
    setPayments(payments.filter((p) => p.id !== id));
  };

  //データを削除
  const clearAllData = () => {
    if (
      !window.confirm(
        "すべての支払い記録とメンバーを削除してもよろしいですか？\nこの操作は取り消せません。"
      )
    )
      return;

    setPayments([]);
    setMembers([]);
    setPayWho("");
    setPayTitle("");
    setPayAmount("");
    localStorage.clear(); // 保存データも完全に消去
    alert("データをすべてクリアしました");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      boxSizing: "border-box",
      padding: isMobile ? "10px 20px 50px 20px" : "40px 0px",
      color: "white",
      backgroundColor: "#1a1a1a",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    card: {
      width: isMobile ? "calc(100% - 10px)" : "100%",
      maxWidth: "1200px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      padding: "0",
      boxSizing: "border-box",
    },
    // 上段（入力・設定）を横並びにするためのコンテナ
    topRow: {
      display: isMobile ? "flex" : "grid", // スマホはflexで縦並び、PCはgridで横並び
      flexDirection: isMobile ? "column" : "row",
      gridTemplateColumns: isMobile ? "none" : "1fr 1fr",
      gap: "24px",
      alignItems: "stretch",
      height: isMobile ? "auto" : "420px",
      maxHeight: isMobile ? "930px" : "420px",
      overflowY: "auto", // 縦方向に溢れたらスクロールバーを出す
      overflowX: "hidden", // 横方向ははみ出させない
    },
    // 下段を縦に並べるためのコンテナ
    bottomColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      marginBottom: isMobile ? "40px" : "0px",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.topRow}>
          {/* 1. 支払い入力 */}
          <PaymentForm
            isMobile={isMobile}
            members={members}
            payWho={payWho}
            setPayWho={setPayWho}
            payTitle={payTitle}
            setPayTitle={setPayTitle}
            payAmount={payAmount}
            setPayAmount={setPayAmount}
            targetMembers={targetMembers}
            setTargetMembers={setTargetMembers} // 誤字修正: setTargetMenmbers -> setTargetMembers
            onAdd={addPayment}
          />

          {/* 2. メンバー管理 */}
          <MemberSection
            isMobile={isMobile}
            members={members}
            payments={payments}
            nameInput={nameInput}
            setNameInput={setNameInput}
            onAdd={addMember}
            onDelete={deleteMember}
            onClearAll={clearAllData}
          />
        </div>

        <div style={styles.bottomColumn}>
          {/* 3. 精算結果 (重要なので履歴より上か、見えやすい位置に) */}
          <SettlementResult
            isMobile={isMobile}
            members={members}
            payments={payments}
          />
          {/* 4. 履歴一覧 */}
          <HistoryList
            isMobile={isMobile}
            payments={payments}
            onDelete={deletePayment}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
