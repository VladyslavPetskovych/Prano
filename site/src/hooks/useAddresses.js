import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, getApiOrigin } from "../config/apiOrigin";

import Lyp1 from "../assets/contacts/lyp1.webp";
import Lyp2 from "../assets/contacts/lyp2.webp";
import Lyp3 from "../assets/contacts/lyp3.webp";
import Dub1 from "../assets/contacts/dub1.webp";
import Dub2 from "../assets/contacts/dub2.webp";
import Dub3 from "../assets/contacts/dub3.webp";
import Kal1 from "../assets/contacts/kal1.webp";
import Kal2 from "../assets/contacts/kal2.webp";
import Kal3 from "../assets/contacts/kal3.webp";
import Leo1 from "../assets/contacts/leo1.png";

const LEGACY_IMAGES = {
  "Липинського, 54": [Lyp1, Lyp2, Lyp3],
  "Під Дубом, 26а": [Dub1, Dub2, Dub3],
  "Червоної Калини, 60": [Kal1, Kal2, Kal3],
  "Мельника, 18": [Leo1],
};

export const getAddressImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return `${getApiOrigin()}/api/addressImages/${imagePath}`;
};

const resolveImages = (address) => {
  if (address.images?.length) {
    return address.images.map(getAddressImageUrl).filter(Boolean);
  }
  return LEGACY_IMAGES[address.name] || [];
};

export const useAddresses = () => {
  const [locations, setLocations] = useState([]);
  const [postomatData, setPostomatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [addressesRes, postomatRes] = await Promise.all([
          axios.get(apiUrl("/addresses")),
          axios.get(apiUrl("/addresses/postomat")),
        ]);

        const list = (addressesRes.data?.data || []).map((address) => ({
          ...address,
          images: resolveImages(address),
        }));

        setLocations(list);
        setPostomatData(postomatRes.data || null);
      } catch (err) {
        setError("Не вдалося завантажити адреси.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { locations, postomatData, loading, error };
};
