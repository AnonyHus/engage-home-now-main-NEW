import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { FaArrowUp, FaArrowDown, FaSave } from "react-icons/fa";
import "../../styles/orderManagement.css";
import { supabase } from "../../services/supabaseClient";

interface OutdoorLocation {
  id: number;
  img_url: string;
  location: string;
  outdoor_slug: string;
  img_order: number;
}

const OutdoorOrderManagement = () => {
  const [locations, setLocations] = useState<OutdoorLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

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

  const moveItem = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === locations.length - 1)
    ) {
      return;
    }

    setSaving(true);
    
    try {
      const newLocations = [...locations];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      
      // Get the current items
      const currentItem = newLocations[index];
      const targetItem = newLocations[targetIndex];
      
      // Swap the img_order values
      const tempOrder = currentItem.img_order;
      currentItem.img_order = targetItem.img_order;
      targetItem.img_order = tempOrder;
      
      // Swap positions in array
      [newLocations[index], newLocations[targetIndex]] = [
        newLocations[targetIndex],
        newLocations[index],
      ];

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
      // Swal.fire("Success!", "Order updated successfully!", "success");

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
      const updates = locations.map((loc, index) =>
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

      Swal.fire("Success!", "Order saved successfully!", "success");
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
        <button
          className="save-order-btn"
          onClick={saveAllOrder}
          disabled={saving}
        >
          <FaSave className="icon" />
          {saving ? "Saving..." : "Save All Order"}
        </button>
      </div>

      <div className="locations-grid">
        {locations.map((location, index) => (
          <div key={location.id} className="location-card">
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
                disabled={index === locations.length - 1 || saving}
                className="move-btn"
              >
                <FaArrowDown />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutdoorOrderManagement;
