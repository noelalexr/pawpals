import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/DeveloperDashboard";

const API = import.meta.env.VITE_API_URL;

export default function DeveloperDashboard() {
  const [kennels, setKennels] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch all kennels (pending + approved)
  useEffect(() => {
    const fetchKennels = async () => {
      try {
        const res = await fetch(`${API}/api/dev/kennels`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const formatted = data.map((k) => ({
          ...k,
          status: k.isApproved ? "approved" : "pending",
        }));
        setKennels(formatted);
      } catch (error) {
        console.error("Error fetching kennels:", error);
      }
    };

    fetchKennels();
  }, []);

  const filteredKennels = kennels.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase()) ||
    k.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = async (id, action) => {
    const url = `${API}/api/dev/kennel/${id}/${action}`;
    const method = action === "approve" ? "PATCH" : "DELETE";

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
      });

      if (!res.ok) throw new Error(`${action} failed`);

      setKennels((prev) =>
        prev.map((k) =>
          k._id === id
            ? {
                ...k,
                isApproved: action === "approve",
                status: action === "approve" ? "approved" : "rejected",
              }
            : k
        )
      );

      if (selected && selected._id === id) {
        setSelected((prev) => ({
          ...prev,
          isApproved: action === "approve",
          status: action === "approve" ? "approved" : "rejected",
        }));
      }
    } catch (error) {
      console.error(`${action} error:`, error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/api/dev/logout`, { credentials: "include" });
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      navigate("/login");
    }
  };

  const groupedKennels = {
    pending: filteredKennels.filter((k) => k.status === "pending"),
    approved: filteredKennels.filter((k) => k.status === "approved"),
    rejected: filteredKennels.filter((k) => k.status === "rejected"),
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerWrapper}>
        <div style={styles.sidebar}>
          <div style={styles.header}>
            <h1 style={styles.heading}>
              Paw<span style={{ color: "#749CC9" }}>Pals</span> Developer Dashboard
            </h1>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>

          <input
            type="text"
            placeholder="Search applicants..."
            style={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {Object.entries(groupedKennels).map(([status, list]) => (
            <div key={status}>
              <h2 style={styles.sectionTitle}>
                {status.charAt(0).toUpperCase() + status.slice(1)} Kennels
              </h2>
              {list.length === 0 ? (
                <p>No {status} kennels.</p>
              ) : (
                list.map((k) => (
                  <div
                    key={k._id}
                    style={{
                      ...styles.listItem,
                      ...(selected?._id === k._id ? styles.activeItem : {}),
                    }}
                    onClick={() => setSelected(k)}
                  >
                    {k.name}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        <div style={styles.detailsPanel}>
          {selected ? (
            <div>
              <h2 style={styles.detailName}>{selected.name}</h2>
              <p style={styles.detailText}><strong>Email:</strong> {selected.email}</p>
              <p style={styles.detailText}><strong>Contact:</strong> {selected.contact}</p>
              <p style={styles.detailText}><strong>Address:</strong> {selected.location?.fullAddress} ({selected.location?.citySort})</p>
              <p style={styles.detailText}><strong>Website:</strong> <a href={selected.website} target="_blank" rel="noreferrer">{selected.website}</a></p>
              <p style={styles.detailText}><strong>Facebook:</strong> <a href={selected.socialLinks?.facebook} target="_blank" rel="noreferrer">{selected.socialLinks?.facebook}</a></p>
              <p style={styles.detailText}><strong>Instagram:</strong> <a href={selected.socialLinks?.instagram} target="_blank" rel="noreferrer">{selected.socialLinks?.instagram}</a></p>
              <p style={styles.detailText}><strong>TikTok:</strong> <a href={selected.socialLinks?.tiktok} target="_blank" rel="noreferrer">{selected.socialLinks?.tiktok}</a></p>
              <p style={styles.detailText}>
                <strong>Documents:</strong>{" "}
                {Array.isArray(selected.documents)
                  ? selected.documents.map((doc, i) => (
                      <div key={i}>
                        <a href={doc} target="_blank" rel="noreferrer">View Document {i + 1}</a>
                      </div>
                    ))
                  : <a href={selected.documents} target="_blank" rel="noreferrer">View</a>}
              </p>
              <div style={styles.buttonGroup}>
                {selected.status !== "approved" && (
                  <button
                    style={{ ...styles.button, ...styles.approveBtn }}
                    onClick={() => handleAction(selected._id, "approve")}
                  >
                    Approve
                  </button>
                )}
                {selected.status !== "rejected" && (
                  <button
                    style={{ ...styles.button, ...styles.rejectBtn }}
                    onClick={() => handleAction(selected._id, "reject")}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>Select a kennel to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
