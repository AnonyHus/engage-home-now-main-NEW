import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { supabase } from "../../services/supabaseClient";

const CreateMarketNews = () => {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewHomepage, setViewHomepage] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      (async () => {
        setLoading(true);
        const { data, error } = await supabase.from("Market_news").select("*").eq("id", id).single();
        setLoading(false);
        if (error || !data) {
          setError("Market news item not found.");
        } else {
          setTitle(data.title);
          setEventDate(data.event_date);
          setDescription(data.desc);
          setViewHomepage(data.view_homepage);
          setHidden(data.hidden);
          if (data.event_date) {
            const formattedDate = new Date(data.event_date).toISOString().split("T")[0];
            setEventDate(formattedDate);
          }

        }
      })();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isEdit) {
      result = await supabase
        .from("Market_news")
        .update({
          title,
          event_date: eventDate,
          desc: description,
          view_homepage: viewHomepage,
          hidden: hidden,
        })
        .eq("id", id);
    } else {
      result = await supabase
        .from("Market_news")
        .insert([{
          title,
          event_date: eventDate,
          desc: description,
          view_homepage: viewHomepage,
          hidden : hidden,
        }]);
    }

    setLoading(false);
    if (result.error) {
      Swal.fire("Error", result.error.message, "error");
    } else {
      Swal.fire("Success", isEdit ? "News updated!" : "News created!", "success")
      .then(() => navigate("/admin/ManageMarketNews")); // redirect back
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Market News Post" : "Create Market News Post"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Event Date</label>
          <input
            type="date"
            value={eventDate||""}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" checked={viewHomepage} onChange={(e) => setViewHomepage(e.target.checked)} />
            <span className="ml-2">Show on Homepage</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} />
            <span className="ml-2">Hidden</span>
          </label>
        </div>
        <Button type="submit" disabled={loading}>
       {loading ? (id ? "Updating..." : "Creating...") : (id ? "Update" : "Create")}
      </Button>

      </form>
    </div>
  );
};

export default CreateMarketNews;
