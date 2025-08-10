import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // ✅ import this


const ManageMarketNews = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate(); // ✅ get navigate function

  const load = async () => {
    const { data } = await supabase
      .from("Market_news")
      .select("*")
      .order("event_date", { ascending: false });
    setNews(data || []);
  };

  const toggleHidden = async (id, value) => {
    await supabase.from("Market_news").update({ hidden: !value }).eq("id", id);
    load();
  };

  const deleteNews = async (id) => {
    await supabase.from("Market_news").delete().eq("id", id);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Market News</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th>Homepage?</th>
            <th>Hidden?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.title}</td>
              <td className="text-center">{item.view_homepage ? "✅" : "❌"}</td>
              <td className="text-center">{item.hidden ? "✅" : "❌"}</td>
              <td className="p-2 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => toggleHidden(item.id, item.hidden)}>
                  {item.hidden ? "Unhide" : "Hide"}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteNews(item.id)}>
                  Delete
                </Button>
                <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/admin/CreateMarketNews/${item.id}`)}
              >
                Edit
              </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMarketNews;
