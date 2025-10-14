import { useEffect, useState } from "react";
import { db } from "../../services/sqliteClient";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { Trash2, Pencil } from "lucide-react"; 

const ManageMarketNews = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate(); 

  const load = async () => {
    const { data } = await (db
      .from("Market_news")
      .select("*")
      .order("event_date", { ascending: false }) as any);
    setNews(data || []);
  };

  const toggleHidden = async (id, value) => {
    await (db.from("Market_news").update({ hidden: !value }).eq("id", id) as any);
    load();
  };

  const deleteNews = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
   
    await (db.from("Market_news").delete().eq("id", id) as any);
    Swal.fire("Deleted!", "The record has been deleted.", "success");

    load();
    } 
    catch (error) {
    Swal.fire("Error!", "Failed to delete the record.", "error");
    }
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Manage Market News</h1>
      <div className="overflow-x-auto">
        <table className="w-full border min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-center">Homepage</th>
              <th className="p-2 text-center">Hidden</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.title}</td>
                <td className="text-center">{item.view_homepage ? "✅" : "❌"}</td>
                <td className="text-center">{item.hidden ? "✅" : "❌"}</td>
                <td className="p-2">
                  <div className="flex gap-2 justify-center">
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => deleteNews(item.id)}
                      className="px-3"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Delete</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/admin/CreateMarketNews/${item.id}`)}
                      className="px-3"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Edit</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMarketNews;
