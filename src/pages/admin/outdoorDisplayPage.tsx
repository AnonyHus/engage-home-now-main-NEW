import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../../styles/OutdoorDisplayPage.css";
import { supabase } from "../../services/supabaseClient";



interface OutdoorLocation {
  id: number;
  img_url: string;
  location: string;
  size: string;
  type: string;
  outdoor_slug: string;
  img_order: number;
}

const OutdoorDisplayPage = () => {
  const [locations, setLocations] = useState<OutdoorLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("outdoor_locations")
        .select("*")
        .order("img_order", { ascending: true });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error("Error loading locations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading locations...</div>;
  }

  if (locations.length === 0) {
    return <div className="no-locations">No locations available</div>;
  }

  return (
    <div className="display-container">
      <h1 className="page-title">Outdoor Locations</h1>
      
      <div className="locations-grid">
        {locations.map((location) => (
          <div key={location.id} className="location-card">
            {location.img_url ? (
              <img
                src={location.img_url}
                alt={location.location}
                className="location-image"
              />
            ) : (
              <div className="image-placeholder">No Image Available</div>
            )}
            
            <div className="location-details">
              <h2 className="location-name">{location.location}</h2>
              <div className="location-meta">
                <span className="location-type">
                  Type: {location.outdoor_slug}
                </span>
                <span className="location-size">Size: {location.size}</span>
                <span className="location-category">
                  Category: {location.type}
                </span>
              </div>
              <div className="order-badge">Order: #{location.img_order}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutdoorDisplayPage;