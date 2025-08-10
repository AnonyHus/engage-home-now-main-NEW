import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaArrowUp, FaArrowDown, FaSave, FaImage, FaDesktop } from "react-icons/fa";
import "../../styles/orderManagement.css";
import { supabase } from "../../services/supabaseClient";

interface OutdoorLocation {
  id: number;
  img_url: string;
  location: string;
  outdoor_slug: 'static' | 'screen'; 
  img_order: number;
}
type TabType = 'static' | 'screen';

const OutdoorOrderManagement = () => {
  const [locations, setLocations] = useState<OutdoorLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('static');

  useEffect(() => {
    fetchLocations();
  }, []);
  
  const deleteLocation = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the location image.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });
  
    if (!confirm.isConfirmed) return;
  
    try {
      const { error } = await supabase
        .from("outdoor_locations")
        .delete()
        .eq("id", id);
  
      if (error) throw error;
  
      // Remove from UI without re-fetch
      setLocations(prev => prev.filter(loc => loc.id !== id));
  
      Swal.fire("Deleted!", "The location image has been removed.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete location", "error");
    }
  };
  
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("outdoor_locations")
        .select("id, img_url, location, outdoor_slug, img_order")
        .order("img_order", { ascending: true });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      Swal.fire("Error", "Failed to load locations", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredLocations = locations.filter(loc => loc.outdoor_slug === activeTab);

  const moveItem = async (index: number, direction: "up" | "down") => {
    const currentTypeLocations = filteredLocations;
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === currentTypeLocations.length - 1)
    ) {
      return;
    }

    setSaving(true);
    
    try {
      // const newLocations = [...locations];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      
      // Get the current items
      const currentItem = currentTypeLocations[index];
      const targetItem = currentTypeLocations[targetIndex];
      
      // Swap the img_order values
      const tempOrder = currentItem.img_order;
      currentItem.img_order = targetItem.img_order;
      targetItem.img_order = tempOrder;
      
        // Update the main locations array
        const newLocations = locations.map(loc => {
          if (loc.id === currentItem.id) return currentItem;
          if (loc.id === targetItem.id) return targetItem;
          return loc;
        });

      // Update state immediately for UI feedback
      setLocations(newLocations);

      // Update both items in database
      const updates = [
        supabase
          .from("outdoor_locations")
          .update({ img_order: currentItem.img_order })
          .eq("id", currentItem.id),
        supabase
          .from("outdoor_locations")
          .update({ img_order: targetItem.img_order })
          .eq("id", targetItem.id)
      ];

      const results = await Promise.all(updates);
      const errors = results.filter((res) => res.error);

      if (errors.length > 0) {
        console.error("Update errors:", errors);
        throw new Error("Failed to update order in database");
      }

      // Optionally show success message for individual moves
       Swal.fire("Success!", "Order updated successfully!", "success");
       

    } catch (error) {
      console.error("Error updating order:", error);
      Swal.fire("Error", "Failed to update order", "error");
      // Revert the state change on error
      await fetchLocations();
    } finally {
      setSaving(false);
    }
  };

  // Alternative: Bulk save approach
  const saveAllOrder = async () => {
    setSaving(true);
    try {
      const currentTypeLocations = filteredLocations;
      const updates = currentTypeLocations.map((loc, index) =>
        supabase
          .from("outdoor_locations")
          .update({ img_order: index + 1 })
          .eq("id", loc.id)
      );

      const results = await Promise.all(updates);
      const errors = results.filter((res) => res.error);

      if (errors.length > 0) {
        console.error("Update errors:", errors);
        throw new Error("Some updates failed");
      }

      Swal.fire("Success!", `${activeTab} order saved successfully!`, "success");
       await fetchLocations();

    } catch (error) {
      console.error("Error saving order:", error);
      Swal.fire("Error", "Failed to save order", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading locations...</div>;
  }

  if (locations.length === 0) {
    return <div className="no-locations">No locations found</div>;
  }

  return (
    <div className="order-management-container">
      <div className="header-section">
        <h1>Manage Outdoor Locations Order</h1>

        {/* Tab Navigation */}
        <div className="tab-navigation">
            <button
            className={`tab-btn ${activeTab === 'static' ? 'active' : ''}`}
            onClick={() => setActiveTab('static')}
            disabled={saving}
          >
            <FaImage className="tab-icon" />
            Static Locations ({locations.filter(l => l.outdoor_slug === 'static').length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'screen' ? 'active' : ''}`}
            onClick={() => setActiveTab('screen')}
            disabled={saving}
          >
            <FaDesktop className="tab-icon" />
            Screen Locations ({locations.filter(l => l.outdoor_slug === 'screen').length})
          </button>
        </div>

        <button
          className="save-order-btn"
          onClick={saveAllOrder}
          disabled={saving || filteredLocations.length === 0}
        >
          <FaSave className="icon" />
          {saving ? "Saving..." : `Save ${activeTab} Order`}
        </button>
      </div>
      <div className="tab-content">
        {filteredLocations.length === 0 ? (
          <div className="no-locations">
            No {activeTab} locations found
          </div>
        ) : (
      <div className="locations-grid">
        {filteredLocations.map((location, index) => (
          <div key={location.id} className="location-card" style={{ order: location.img_order }}>
            <div className="image-container">
              {location.img_url ? (
                <img
                  src={location.img_url}
                  alt={location.location}
                  className="location-image"
                />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}
            </div>
            
            <div className="location-info">
              <h3 className="location-name">{location.location}</h3>
              <p className="location-type">
                Type: <span className="type-badge">{location.outdoor_slug}</span>
              </p>
              <p className="location-order">Order: {location.img_order}</p>
            </div>

            <div className="move-buttons">
              <button
                onClick={() => moveItem(index, "up")}
                disabled={index === 0 || saving}
                className="move-btn"
              >
                <FaArrowUp />
              </button>
              <button
                onClick={() => moveItem(index, "down")}
                disabled={index === filteredLocations.length - 1 || saving}
                className="move-btn"
              >
                <FaArrowDown />
              </button>
              <button
              onClick={() => deleteLocation(location.id)}
              disabled={saving}
              className="delete-btn"
              style={{ background: "#dc2626", color: "#fff", padding: "6px 10px", borderRadius: "4px" }}
              >
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
        )}
    </div>
    </div>

  );
};

export default OutdoorOrderManagement;
