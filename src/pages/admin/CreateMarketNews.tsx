import { useState,useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { createMarketNewsPost } from '../../services/marketNewsService'; 
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

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await supabase.from("Market_news").select("*").eq("id", id).single();
        if (data) {
          setTitle(data.title);
          setEventDate(data.event_date);
          setDescription(data.desc);
          setViewHomepage(data.view_homepage);
          setHidden(data.hidden);
        }
      })();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let result;
    if (id) {
      result = await supabase.from("Market_news").update({
        title, event_date: eventDate, desc: description,
        view_homepage: viewHomepage, hidden
      }).eq("id", id);
    } else {
      result = await supabase.from("Market_news").insert([{
        title, event_date: eventDate, desc: description,
        view_homepage: viewHomepage, hidden
      }]);
    }
  
    setLoading(false);
    if (result.error) Swal.fire("Error", result.error.message, "error");
    else Swal.fire("Success", id ? "News updated!" : "News created!", "success");
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Market News Post</h1>
      {error && <p className="text-red-500">{error}</p>}
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
            value={eventDate}
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
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
};

export default CreateMarketNews;
