import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VnpayReturn = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const responseCode = query.get("vnp_ResponseCode");
  const txnRef = query.get("vnp_TxnRef");
  const bankTranNo = query.get("vnp_BankTranNo");
  const amountParam = query.get("vnp_Amount");
  const amount = amountParam ? Number(amountParam) / 100 : 0;

  const isSuccess = responseCode === "00";

  const formatVnd = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(n || 0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: "100%",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          background: "#fff",
        }}
      >
        <div style={{ padding: 24, textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isSuccess ? "#E6F7ED" : "#FDECEC",
              color: isSuccess ? "#16a34a" : "#dc2626",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            {isSuccess ? "✓" : "✕"}
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
          </h2>
        </div>
        <div style={{ padding: "0 24px 24px", color: "#374151" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <span>Mã giao dịch</span>
            <strong>{txnRef || bankTranNo || "-"}</strong>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <span>Số tiền</span>
            <strong>{formatVnd(amount)}</strong>
          </div>
        </div>
        <div
          style={{
            padding: 24,
            textAlign: "center",
            borderTop: "1px solid #f3f4f6",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 16px",
              background: "#111827",
              color: "#fff",
              border: 0,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default VnpayReturn;
