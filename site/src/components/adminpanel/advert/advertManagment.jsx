import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AdvertStats from "./AdvertStats";

const API_URL = "https://prano.group/api/advertisement";
const IMAGE_URL = "https://prano.group/api/advertisementImages";

// Обмеження з серверного валідатора та Telegram API
const TITLE_MIN = 3;
const TITLE_MAX = 120;
const DESCRIPTION_MIN = 5;
const TG_CAPTION_MAX = 1024; // підпис до фото
const TG_MESSAGE_MAX = 4096; // звичайне повідомлення

const emptyForm = { title: "", description: "", imageFile: null };

function AdvertManagement() {
  const [adverts, setAdverts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingAdvert, setEditingAdvert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null); // { type: "error" | "success", text }
  const [statsKey, setStatsKey] = useState(0);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) fetchAdverts();
  }, [accessToken]);

  // Прев'ю вибраного фото
  const imagePreview = useMemo(
    () => (form.imageFile ? URL.createObjectURL(form.imageFile) : null),
    [form.imageFile]
  );
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const previewImageSrc =
    imagePreview ||
    (editingAdvert?.image ? `${IMAGE_URL}/${editingAdvert.image}` : null);

  const title = form.title.trim();
  const description = form.description.trim();
  const telegramLength = title.length + 2 + description.length;
  const telegramLimit = previewImageSrc ? TG_CAPTION_MAX : TG_MESSAGE_MAX;

  const validationError =
    title.length < TITLE_MIN
      ? `Назва має містити щонайменше ${TITLE_MIN} символи`
      : title.length > TITLE_MAX
      ? `Назва не може бути довшою за ${TITLE_MAX} символів`
      : description.length < DESCRIPTION_MIN
      ? `Опис має містити щонайменше ${DESCRIPTION_MIN} символів`
      : null;

  const fetchAdverts = async () => {
    try {
      const response = await axios.get(API_URL);
      setAdverts(response.data);
    } catch (error) {
      console.error("Error fetching adverts:", error.response || error);
      showError(error, "Не вдалося завантажити пропозиції");
    }
  };

  const showError = (error, fallback) => {
    setMessage({
      type: "error",
      text: error?.response?.data?.message || fallback,
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingAdvert(null);
  };

  const startEditing = (advert) => {
    setEditingAdvert(advert);
    setForm({
      title: advert.title,
      description: advert.description,
      imageFile: null,
    });
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const createAdvert = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (form.imageFile) formData.append("image", form.imageFile);

    await axios.post(API_URL, formData, {
      headers: { Authorization: `${accessToken}` },
    });
  };

  const updateAdvert = async () => {
    const headers = { Authorization: `${accessToken}` };
    await axios.patch(
      `${API_URL}/${editingAdvert._id}`,
      { title, description },
      { headers }
    );

    if (form.imageFile) {
      const formData = new FormData();
      formData.append("image", form.imageFile);
      await axios.post(`${API_URL}/${editingAdvert._id}/image`, formData, {
        headers,
      });
    }
  };

  const handleSave = async () => {
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }
    if (
      !editingAdvert &&
      adverts.length > 0 &&
      !window.confirm("Нова пропозиція замінить поточну. Продовжити?")
    ) {
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      if (editingAdvert) {
        await updateAdvert();
      } else {
        await createAdvert();
      }
      setMessage({
        type: "success",
        text: editingAdvert ? "Пропозицію оновлено" : "Пропозицію збережено",
      });
      resetForm();
      fetchAdverts();
      setStatsKey((key) => key + 1);
    } catch (error) {
      console.error("Error saving advert:", error.response || error);
      showError(error, "Не вдалося зберегти пропозицію");
    } finally {
      setSaving(false);
    }
  };

  const deleteAdvert = async (_id) => {
    if (!window.confirm("Видалити пропозицію?")) return;
    try {
      await axios.delete(`${API_URL}/${_id}`, {
        headers: { Authorization: `${accessToken}` },
      });
      if (editingAdvert?._id === _id) resetForm();
      fetchAdverts();
      setStatsKey((key) => key + 1);
    } catch (error) {
      console.error("Error deleting advert:", error.response || error);
      showError(error, "Не вдалося видалити пропозицію");
    }
  };

  const deleteImage = async (_id) => {
    if (!window.confirm("Видалити фото пропозиції?")) return;
    try {
      const response = await axios.delete(`${API_URL}/${_id}/image`, {
        headers: { Authorization: `${accessToken}` },
      });
      if (editingAdvert?._id === _id) setEditingAdvert(response.data);
      fetchAdverts();
    } catch (error) {
      console.error("Error deleting image:", error.response || error);
      showError(error, "Не вдалося видалити фото");
    }
  };

  const sendToTelegram = async () => {
    if (adverts.length !== 1) {
      alert("Оголошення відсутнє або їх більше одного.");
      return;
    }
    if (
      !window.confirm(
        "Надіслати пропозицію всім користувачам Телеграм-бота? Це не можна скасувати."
      )
    ) {
      return;
    }

    setSending(true);
    try {
      const { data: broadcast } = await axios.post(
        `${API_URL}/telegram/send/${adverts[0]._id}`,
        {},
        {
          headers: { Authorization: `${accessToken}` },
        }
      );
      setMessage({
        type: broadcast?.total && !broadcast.sent ? "error" : "success",
        text: broadcast?.total
          ? `Пропозицію надіслано: доставлено ${broadcast.sent} з ${broadcast.total}` +
            (broadcast.failed
              ? `, не доставлено ${broadcast.failed} (з них заблокували бота: ${broadcast.blocked})`
              : "")
          : "Пропозицію надіслано користувачам в Телеграм",
      });
    } catch (error) {
      console.error(
        "Error sending adverts to Telegram:",
        error.response || error
      );
      showError(error, "Не вдалося надіслати пропозицію в Телеграм");
    } finally {
      setSending(false);
      setStatsKey((key) => key + 1);
    }
  };

  const counterClass = (length, max) =>
    length > max ? "text-red-600 font-semibold" : "text-gray-500";

  return (
    <div className="bg-slate-200 min-h-[50vh] p-4 md:p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Управління пропозиціями</h2>

      <button
        onClick={sendToTelegram}
        disabled={sending}
        className="bg-slate-400 py-2 px-6 rounded hover:bg-blue-300 transition mb-6 disabled:opacity-50"
      >
        {sending ? "Надсилання..." : "Надіслати пропозицію користувачам в Телеграм"}
      </button>

      {message && (
        <div
          className={`w-full max-w-6xl mb-4 px-4 py-3 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <AdvertStats refreshKey={statsKey} />

      <div className="w-full max-w-6xl grid gap-6 lg:grid-cols-2 mb-8">
        {/* Редактор */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
          <h3 className="text-lg font-semibold">
            {editingAdvert ? "Редагування пропозиції" : "Нова пропозиція"}
          </h3>

          <label className="flex flex-col gap-1">
            <span className="flex justify-between text-sm font-medium">
              Назва
              <span className={counterClass(title.length, TITLE_MAX)}>
                {title.length}/{TITLE_MAX}
              </span>
            </span>
            <input
              type="text"
              placeholder="Напр.: Профілактика + набійки"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="p-2 border rounded"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="flex justify-between text-sm font-medium">
              Текст пропозиції
              <span className={counterClass(telegramLength, telegramLimit)}>
                Телеграм: {telegramLength}/{telegramLimit}
              </span>
            </span>
            <textarea
              placeholder="Текст пропозиції. Переноси рядків, порожні рядки та емодзі зберігаються."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={16}
              className="p-2 border rounded resize-y min-h-[12rem] leading-relaxed"
            />
            {telegramLength > telegramLimit && (
              <span className="text-sm text-red-600">
                {previewImageSrc
                  ? `Телеграм обмежує підпис до фото ${TG_CAPTION_MAX} символами — скоротіть текст або приберіть фото.`
                  : `Телеграм обмежує повідомлення ${TG_MESSAGE_MAX} символами.`}
              </span>
            )}
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Фото</span>
            <input
              key={editingAdvert?._id || "new"}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, imageFile: e.target.files[0] || null })
              }
              className="p-2 border rounded bg-white"
            />
            {editingAdvert?.image && !form.imageFile && (
              <button
                type="button"
                onClick={() => deleteImage(editingAdvert._id)}
                className="self-start text-sm text-red-600 underline"
              >
                Видалити поточне фото
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            {editingAdvert && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Скасувати
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-Nblue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50"
            >
              {saving
                ? "Збереження..."
                : editingAdvert
                ? "Зберегти зміни"
                : "Додати"}
            </button>
          </div>
        </div>

        {/* Прев'ю як на сайті */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">
            Попередній перегляд (як на сайті)
          </span>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {previewImageSrc && (
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={previewImageSrc}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 break-words">
                {title || <span className="text-gray-400">Назва</span>}
              </h3>
              <p className="mt-3 text-gray-700 whitespace-pre-line break-words">
                {description || (
                  <span className="text-gray-400">Текст пропозиції</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-3">Поточна пропозиція</h3>
        {adverts.length === 0 && (
          <p className="text-gray-600">Пропозицій немає.</p>
        )}
        {adverts.map((advert) => (
          <div
            key={advert._id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden mb-6"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => startEditing(advert)}
                className="bg-Nblue text-white px-4 py-3 text-sm rounded hover:bg-blue-600 transition"
              >
                Редагувати
              </button>
              <button
                onClick={() => deleteAdvert(advert._id)}
                className="bg-red-500 text-white px-4 py-3 text-sm rounded hover:bg-red-600 transition"
              >
                Видалити
              </button>
            </div>

            {advert.image && (
              <img
                src={`${IMAGE_URL}/${advert.image}`}
                alt={advert.title}
                className="w-full h-64 object-cover"
              />
            )}

            <div className={`p-4 ${advert.image ? "" : "pt-16"}`}>
              <h3 className="text-xl font-bold mb-2">{advert.title}</h3>
              <p className="text-gray-700 whitespace-pre-line break-words">
                {advert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvertManagement;
