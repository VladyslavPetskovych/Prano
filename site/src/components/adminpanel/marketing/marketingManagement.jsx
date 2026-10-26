import React, { useEffect, useState } from "react";
import CustomButton from "../../utils/customButton";
import CampaignItem from "./CampaignItem";
import QrGenerator from "./QrGenerator";
import {
  createCampaign,
  deleteCampaign,
  fetchCampaigns,
  updateCampaign,
} from "./MarketingApi";

const EMPTY_CAMPAIGN = { name: "", promoCode: "", title: "", description: "" };

const getErrorMessage = (error) => error.response?.data?.message || error.message;

function MarketingManagement() {
  const [tab, setTab] = useState("campaigns");
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState(EMPTY_CAMPAIGN);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setCampaigns(await fetchCampaigns());
    } catch (error) {
      console.error("Error fetching campaigns:", error.response || error);
    }
  };

  const handleCreate = async () => {
    if (!newCampaign.name.trim() || !newCampaign.promoCode.trim()) {
      return alert("Вкажіть назву кампанії та промокод");
    }
    try {
      await createCampaign(newCampaign);
      setNewCampaign(EMPTY_CAMPAIGN);
      loadCampaigns();
    } catch (error) {
      alert(`Не вдалося створити кампанію: ${getErrorMessage(error)}`);
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      await updateCampaign(id, payload);
      loadCampaigns();
      return true;
    } catch (error) {
      alert(`Не вдалося зберегти зміни: ${getErrorMessage(error)}`);
      return false;
    }
  };

  const handleDelete = async (campaign) => {
    if (!window.confirm(`Видалити кампанію «${campaign.name}» разом зі статистикою?`)) return;
    try {
      await deleteCampaign(campaign._id);
      loadCampaigns();
    } catch (error) {
      alert(`Не вдалося видалити кампанію: ${getErrorMessage(error)}`);
    }
  };

  return (
    <div className="bg-slate-200 min-h-[50vh] p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Управління маркетингом</h2>

      <div className="flex mb-6">
        <CustomButton
          onClick={() => setTab("campaigns")}
          variant={tab === "campaigns" ? "default" : "outline"}
          className="py-1 px-2 text-base m-1"
        >
          Рекламні кампанії
        </CustomButton>
        <CustomButton
          onClick={() => setTab("qr")}
          variant={tab === "qr" ? "default" : "outline"}
          className="py-1 px-2 text-base m-1"
        >
          Генератор QR
        </CustomButton>
      </div>

      {tab === "qr" && <QrGenerator />}

      {tab === "campaigns" && (
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="font-bold mb-1">Нова кампанія</h3>
            <p className="text-sm text-gray-500 mb-3">
              Для кожної кампанії створюється окрема сторінка з промокодом і
              QR-код, який рахує сканування.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Рекламна кампанія (напр. sportlife)"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Промокод (напр. prano20)"
                value={newCampaign.promoCode}
                onChange={(e) => setNewCampaign({ ...newCampaign, promoCode: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Заголовок сторінки (необов'язково)"
                value={newCampaign.title}
                onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                className="p-2 border rounded md:col-span-2"
              />
              <textarea
                placeholder="Опис пропозиції (напр. -20% на хімчистку для відвідувачів SportLife)"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                rows={3}
                className="p-2 border rounded md:col-span-2"
              />
            </div>
            <CustomButton onClick={handleCreate} className="mt-3">
              Створити кампанію
            </CustomButton>
          </div>

          {campaigns.length === 0 ? (
            <p className="text-center text-gray-500">Кампаній ще немає.</p>
          ) : (
            campaigns.map((campaign) => (
              <CampaignItem
                key={`${campaign._id}-${campaign.updatedAt}`}
                campaign={campaign}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MarketingManagement;
