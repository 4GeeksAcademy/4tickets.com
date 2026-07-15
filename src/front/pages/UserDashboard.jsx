import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaUser } from "react-icons/fa";
import { BASE_BACK_URL } from "../core/constantsUrl";

export const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ email: "", address: "", phone: "", avatar: "" });
  const token = localStorage.getItem("token")?.replace(/['"]+/g, '');
  const authHeaders = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };

  useEffect(() => {
    fetch(`${BASE_BACK_URL}api/user/profile`, { headers: authHeaders })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setForm({ email: data.email || "", address: data.address || "", phone: data.phone || "", avatar: data.avatar || "" });
      })
      .catch(err => console.error("Error perfil:", err));

    fetch(`${BASE_BACK_URL}api/user/tickets`, { headers: authHeaders })
      .then(res => res.json())
      .then(data => setTickets(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error tickets:", err));
  }, []);

  const handleSave = async () => {
    const res = await fetch(`${BASE_BACK_URL}api/user/profile`, {
      method: "PUT", headers: authHeaders, body: JSON.stringify(form)
    });
    const data = await res.json();
    setUser(data.user);
    setEditing(false);
  };

  const AvatarBox = () => (
    form.avatar ? (
      <img src={form.avatar} alt="avatar"
        style={{ width: 160, height: 160, borderRadius: "50%", objectFit: "cover" }} />
    ) : (
      <div className="d-flex justify-content-center align-items-center bg-secondary bg-opacity-25"
        style={{ width: 160, height: 160, borderRadius: "50%" }}>
        <FaUser style={{ fontSize: 70 }} className="text-secondary" />
      </div>
    )
  );

  if (!user) return <p className="container py-5">Loanging...</p>;

  return (
    <div className="container py-4">

      <h2 className="mb-3">My account</h2>
      <div className="card shadow-sm p-4 mb-5">
        <div className="row align-items-center">

          <div className="col-md-8 order-2 order-md-1">
            <label className="fw-bold mb-1">Full name</label>
            <input className="form-control mb-3" value={user.name || ""} disabled />

            <label className="fw-bold mb-1">User</label>
            <input className="form-control mb-3" value={user.username || ""} disabled />

            <label className="fw-bold mb-1">Email</label>
            <input className="form-control mb-3"
              value={form.email} disabled={!editing}
              onChange={e => setForm({ ...form, email: e.target.value })} />

            <label className="fw-bold mb-1">Address</label>
            <input className="form-control mb-3"
              value={form.address} disabled={!editing}
              onChange={e => setForm({ ...form, address: e.target.value })} />

            <label className="fw-bold mb-1">Phone</label>
            <input className="form-control mb-3"
              value={form.phone} disabled={!editing}
              onChange={e => setForm({ ...form, phone: e.target.value })} />

            {editing && (
              <>
                <label className="fw-bold mb-1">Avatar (image URL)</label>
                <input className="form-control mb-3" placeholder="https://..."
                  value={form.avatar}
                  onChange={e => setForm({ ...form, avatar: e.target.value })} />
              </>
            )}

            {editing ? (
              <div>
                <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            ) : (
              <button className="btn btn-primary w-100" onClick={() => setEditing(true)}>Modify data</button>
            )}
          </div>

          <div className="col-md-4 order-1 order-md-2 d-flex justify-content-center align-items-center mb-4 mb-md-0">
            <AvatarBox />
          </div>

        </div>
      </div>

      <h2 className="mb-3">My events</h2>
      <div className="card shadow-sm p-4">
        {tickets.length === 0 && <p className="text-muted mb-0">You haven't bought tickets yet.</p>}
        <div className="row">
          {tickets.map(t => (
            <div className="col-md-6 mb-3" key={t.id}>
              <div className="card p-3 h-100">
                {t.image_url && <img src={t.image_url} alt={t.event_title} className="mb-2" style={{ maxHeight: 150, objectFit: "cover" }} />}
                <h5>{t.event_title}</h5>
                <p className="mb-1">📅 {t.date}</p>
                <p className="mb-1">📍 {t.location}</p>
                <p className="mb-1">🏷️ {t.category} · {t.price}€</p>
                <p className="text-muted small">{t.description}</p>
                <QRCodeCanvas value={t.qr_code_data} size={140} />
                <small className="text-muted d-block mt-1">Código: {t.qr_code_data}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};