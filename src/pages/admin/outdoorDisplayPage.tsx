import { useEffect, useState } from "react";
import "../../styles/OutdoorDisplayPage.css";
import { db } from "../../services/sqliteClient";
import { FaImage, FaDesktop } from "react-icons/fa";

interface OutdoorLocation {
  id: number;
  img_url: string;
  location: string;
  size: string;
  outdoor_slug: 'static' | 'screen';
  type : string;
  img_order: number;
}

type TabType = 'static' | 'screen';

const OutdoorDisplayPage = () => {
  const [locations, setLocations] = useState<OutdoorLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('static');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const { data, error } = await (db
        .from("outdoor_locations")
        .select("*")
        .order("img_order", { ascending: true }) as any);

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error("Error loading locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLocations = locations.filter(loc => loc.outdoor_slug === activeTab);

  if (loading) {
    return <div className="loading-container">Loading locations...</div>;
  }

  return (
    <div className="display-container">
      <h1 className="page-title">Outdoor Locations</h1>
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'static' ? 'active' : ''}`}
          onClick={() => setActiveTab('static')}
        >
          <FaImage className="tab-icon" />
          Static Locations ({locations.filter(l => l.outdoor_slug === 'static').length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'screen' ? 'active' : ''}`}
          onClick={() => setActiveTab('screen')}
        >
          <FaDesktop className="tab-icon" />
          Screen Locations ({locations.filter(l => l.outdoor_slug === 'screen').length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {filteredLocations.length === 0 ? (
          <div className="no-locations">
            No {activeTab} locations available
          </div>
        ) : (
          <div className="locations-grid">
            {filteredLocations.map((location) => (
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
                      Type: {location.type}
                    </span>
                    <span className="location-size">Size: {location.size}</span>
                    <span className="location-category">
                      Category: {location.outdoor_slug}
                    </span>
                  </div>
                  <div className="order-badge">Order: #{location.img_order}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutdoorDisplayPage;
