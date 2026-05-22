import React, { useEffect, useState } from "react";
import CreateAddress from "./CreateAddress";
import AddressItem from "./AddressItem";
import {
  fetchAddresses,
  fetchPostomat,
  updatePostomat,
} from "./AddressApi";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [postomat, setPostomat] = useState({
    postomat: "",
    city: "",
    phone: "",
    receiver: "",
  });
  const [loading, setLoading] = useState(true);
  const [savingPostomat, setSavingPostomat] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [addressList, postomatData] = await Promise.all([
        fetchAddresses(true),
        fetchPostomat(),
      ]);
      setAddresses(addressList);
      if (postomatData) {
        setPostomat({
          postomat: postomatData.postomat || "",
          city: postomatData.city || "",
          phone: postomatData.phone || "",
          receiver: postomatData.receiver || "",
        });
      }
    } catch (err) {
      setError("Не вдалося завантажити адреси.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePostomatSave = async (e) => {
    e.preventDefault();
    setSavingPostomat(true);
    setMessage("");
    try {
      const updated = await updatePostomat(postomat);
      setPostomat({
        postomat: updated.postomat || "",
        city: updated.city || "",
        phone: updated.phone || "",
        receiver: updated.receiver || "",
      });
      setMessage("Дані поштомату збережено.");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Не вдалося зберегти поштомат."
      );
    } finally {
      setSavingPostomat(false);
    }
  };

  if (loading) return <p>Завантаження адрес...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <p className="text-sm text-gray-700 mb-4">
        Ці адреси відображаються на сторінці контактів і в Telegram-боті.
      </p>

      <CreateAddress
        onCreated={(created) => {
          setAddresses((prev) =>
            [...prev, created].sort(
              (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
            )
          );
        }}
      />

      <div className="overflow-x-auto my-3">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Назва</th>
              <th className="p-3 text-left">Телефон</th>
              <th className="p-3 text-left">Графік</th>
              <th className="p-3 text-left">Порядок</th>
              <th className="p-3 text-left">Дії</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <AddressItem
                key={address._id}
                address={address}
                onUpdate={(updated) =>
                  setAddresses((prev) =>
                    prev
                      .map((item) =>
                        item._id === updated._id ? updated : item
                      )
                      .sort(
                        (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
                      )
                  )
                }
                onDelete={(id) =>
                  setAddresses((prev) => prev.filter((item) => item._id !== id))
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border rounded p-4 mt-6">
        <h3 className="text-lg font-semibold mb-3">Поштомат Нової пошти</h3>
        <form onSubmit={handlePostomatSave} className="grid md:grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Номер поштомату"
            value={postomat.postomat}
            onChange={(e) =>
              setPostomat({ ...postomat, postomat: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            placeholder="Місто"
            value={postomat.city}
            onChange={(e) => setPostomat({ ...postomat, city: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Телефон"
            value={postomat.phone}
            onChange={(e) =>
              setPostomat({ ...postomat, phone: e.target.value })
            }
          />
          <input
            className="border p-2 rounded md:col-span-2"
            placeholder="Отримувач"
            value={postomat.receiver}
            onChange={(e) =>
              setPostomat({ ...postomat, receiver: e.target.value })
            }
          />
          <button
            type="submit"
            disabled={savingPostomat}
            className="md:col-span-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-60 w-fit"
          >
            {savingPostomat ? "Збереження..." : "Зберегти поштомат"}
          </button>
        </form>
        {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default AddressManagement;
