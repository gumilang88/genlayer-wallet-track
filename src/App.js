import React, { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    const seed = Array.from({ length: 4 }).map((_, i) => makeTx(i));
    setTxs(seed);
    const timer = setInterval(() => {
      setTxs((prev) => [makeTx(), ...prev.slice(0, 3)]);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  function makeTx(seed = Math.random()) {
    const actions = [
      "sent 24 GLT",
      "minted NFT",
      "staked 120 GLT",
      "swapped token",
      "bridge completed",
    ];
    const full =
      "0x" +
      Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
    const action = actions[Math.floor(Math.random() * actions.length)];
    return { full, text: `${full.slice(0, 6)}...${full.slice(-4)} ${action}` };
  }

  const searchWallet = () => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setWallet({
        address: query,
        balance: "1,245",
        txs: 28,
        score: 87,
        actions: [
          { name: "Swap Token", count: 12 },
          { name: "NFT Mint", count: 7 },
          { name: "Stake GLT", count: 9 },
        ],
      });
      setLoading(false);
    }, 700);
  };

  const card = {
    background:
      "linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 24,
    padding: 24,
    backdropFilter: "blur(18px)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.58)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 30,
        color: "#fff",
        fontFamily: "Inter,Segoe UI,Roboto,sans-serif",
        background:
          "radial-gradient(circle at top left,#8b5cf6 0%,#111827 24%,#020617 56%,#000 100%), radial-gradient(circle at bottom right, rgba(236,72,153,0.18), transparent 30%)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                margin: "0 0 8px",
                letterSpacing: -2,
                textShadow: "0 10px 35px rgba(168,85,247,.35)",
              }}
            >
              GenLayer Wallet Tracker
            </h1>
            <div style={{ color: "#cbd5e1", fontSize: 18 }}>
              Ultra premium analytics dashboard for ecosystem wallets
            </div>
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#8b5cf6,#ec4899)",
              fontWeight: 900,
              letterSpacing: "1px",
              boxShadow:
                "0 0 28px rgba(168,85,247,0.45), 0 0 48px rgba(236,72,153,0.25)",
            }}
          >
            LIVE
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
            marginBottom: 22,
          }}
        >
          {["Tracked Wallets", "Transactions", "Active Users", "Volume"].map(
            (t, i) => (
              <div key={i} style={card}>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{t}</div>
                <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>
                  {["1,284", "54,392", "812", "$1.2M"][i]}
                </div>
              </div>
            )
          )}
        </div>

        <div style={{ ...card, marginBottom: 22 }}>
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 14 }}>
            Search Wallet Address
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter wallet address..."
              style={{
                flex: 1,
                minWidth: 260,
                padding: 16,
                borderRadius: 14,
                border: "1px solid #374151",
                background: "#0b1120",
                color: "#fff",
              }}
            />
            <button
              onClick={searchWallet}
              style={{
                padding: "16px 28px",
                border: "none",
                borderRadius: 14,
                cursor: "pointer",
                fontWeight: 800,
                color: "#fff",
                background: "linear-gradient(135deg,#8b5cf6,#ec4899)",
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {wallet && (
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div style={card}>
                  <div style={{ color: "#94a3b8" }}>Address</div>
                  <div style={{ marginTop: 8, wordBreak: "break-all" }}>
                    {wallet.address}
                  </div>
                </div>
                <div style={card}>
                  <div style={{ color: "#94a3b8" }}>Balance</div>
                  <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>
                    {wallet.balance}
                  </div>
                </div>
                <div style={card}>
                  <div style={{ color: "#94a3b8" }}>Transactions</div>
                  <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>
                    {wallet.txs}
                  </div>
                </div>
                <div style={card}>
                  <div style={{ color: "#94a3b8" }}>Activity Score</div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      marginTop: 8,
                      color: "#a855f7",
                    }}
                  >
                    {wallet.score}/100
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                  gap: 16,
                }}
              >
                <div style={card}>
                  <div
                    style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}
                  >
                    Portfolio Overview
                  </div>
                  {[
                    "GLT Token|62%|#8b5cf6",
                    "NFT Assets|24%|#ec4899",
                    "Staking|14%|#3b82f6",
                  ].map((row, i) => {
                    const [n, v, c] = row.split("|");
                    return (
                      <div key={i} style={{ marginBottom: 12 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 6,
                          }}
                        >
                          <span>{n}</span>
                          <span>{v}</span>
                        </div>
                        <div
                          style={{
                            height: 8,
                            background: "#1f2937",
                            borderRadius: 999,
                          }}
                        >
                          <div
                            style={{
                              width: v,
                              height: 8,
                              background: c,
                              borderRadius: 999,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={card}>
                  <div
                    style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}
                  >
                    Recent Wallet Actions
                  </div>
                  {wallet.actions.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(255,255,255,.08)",
                      }}
                    >
                      <span>{a.name}</span>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: "#7c3aed",
                          fontSize: 12,
                          fontWeight: 800,
                        }}
                      >
                        TX {a.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
            gap: 16,
          }}
        >
          <div style={card}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 14 }}>
              Latest Transactions
            </div>
            {txs.map((t, i) => {
              const parts = t.text.split(" ");
              const addr = parts[0];
              const rest = parts.slice(1).join(" ");
              return (
                <div
                  key={i}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <span
                    onClick={() =>
                      window.open(
                        `https://testnet-explorer.genlayer.com/address/${t.full}`,
                        "_blank"
                      )
                    }
                    style={{
                      color: "#c084fc",
                      cursor: "pointer",
                      fontWeight: 800,
                    }}
                  >
                    {addr}
                  </span>{" "}
                  {rest}
                </div>
              );
            })}
          </div>
          <div style={card}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 14 }}>
              Top Contributors
            </div>
            {[
              "#1 Oxgumilang - 982 pts",
              "#2 BuilderOne - 877 pts",
              "#3 NodeMaster - 744 pts",
              "#4 AlphaDev - 699 pts",
            ].map((u, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,.08)",
                }}
              >
                {u}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
