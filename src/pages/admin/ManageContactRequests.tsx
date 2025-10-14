import { useEffect, useState } from "react";
import { db } from "../../services/sqliteClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Swal from "sweetalert2";
import { Mail, Phone, Calendar, User, MessageSquare, Trash2, Eye, CheckCircle, Clock } from "lucide-react";

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  status?: string;
  read?: boolean;
}

const ManageContactRequests = () => {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const loadRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await (db
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false }) as any);

      if (error) {
        console.error("Error loading contact requests:", error);
        Swal.fire("Error", "Failed to load contact requests", "error");
      } else {
        setRequests(data || []);
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Failed to load contact requests", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const { error } = await (db
        .from("contact_requests")
        .update({ read: true })
        .eq("id", id) as any);

      if (error) {
        Swal.fire("Error", "Failed to mark as read", "error");
      } else {
        loadRequests();
        Swal.fire({
          icon: "success",
          title: "Marked as Read",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Failed to mark as read", "error");
    }
  };

  const deleteRequest = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this contact request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      try {
        const { error } = await (db
          .from("contact_requests")
          .delete()
          .eq("id", id) as any);

        if (error) {
          Swal.fire("Error", "Failed to delete request", "error");
        } else {
          loadRequests();
          Swal.fire("Deleted!", "Contact request has been deleted.", "success");
        }
      } catch (err) {
        console.error("Error:", err);
        Swal.fire("Error", "Failed to delete request", "error");
      }
    }
  };

  const viewDetails = (request: ContactRequest) => {
    Swal.fire({
      title: `<div style="color: #1e293b; font-weight: 600;">Message from ${request.name}</div>`,
      html: `
        <div style="text-align: left; padding: 20px; background: #f8fafc; border-radius: 8px;">
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">📧 Email:</strong>
            <div style="color: #1e293b; margin-top: 5px;">${request.email}</div>
          </div>
          ${request.phone ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">📱 Phone:</strong>
              <div style="color: #1e293b; margin-top: 5px;">${request.phone}</div>
            </div>
          ` : ''}
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">📅 Date:</strong>
            <div style="color: #1e293b; margin-top: 5px;">${new Date(request.created_at).toLocaleString()}</div>
          </div>
          <div>
            <strong style="color: #475569;">💬 Message:</strong>
            <div style="color: #1e293b; margin-top: 5px; white-space: pre-wrap; line-height: 1.6;">${request.message}</div>
          </div>
        </div>
      `,
      width: 600,
      confirmButtonText: "Close",
      confirmButtonColor: "#3b82f6",
      customClass: {
        popup: 'luxury-popup'
      }
    });

    // Mark as read when viewing
    if (!request.read) {
      markAsRead(request.id);
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'unread') return !req.read;
    if (filter === 'read') return req.read;
    return true;
  });

  const unreadCount = requests.filter(r => !r.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <style>{`
        .luxury-popup {
          border-radius: 16px !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-2">
                Contact Requests
              </h1>
              <p className="text-sm md:text-base text-slate-600">
                Manage and respond to customer inquiries
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white px-3 md:px-4 py-1 md:py-2 text-sm md:text-lg">
                  {unreadCount} Unread
                </Badge>
              )}
              <Button
                onClick={loadRequests}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={`text-sm md:text-base ${filter === 'all' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            All ({requests.length})
          </Button>
          <Button
            onClick={() => setFilter('unread')}
            variant={filter === 'unread' ? 'default' : 'outline'}
            className={`text-sm md:text-base ${filter === 'unread' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Unread ({unreadCount})
          </Button>
          <Button
            onClick={() => setFilter('read')}
            variant={filter === 'read' ? 'default' : 'outline'}
            className={`text-sm md:text-base ${filter === 'read' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Read ({requests.length - unreadCount})
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredRequests.length === 0 && (
          <Card className="shadow-xl border-0">
            <CardContent className="py-20 text-center">
              <MessageSquare className="w-20 h-20 mx-auto text-slate-300 mb-4" />
              <h3 className="text-2xl font-semibold text-slate-700 mb-2">
                No Contact Requests
              </h3>
              <p className="text-slate-500">
                {filter === 'unread' ? 'All caught up! No unread messages.' : 
                 filter === 'read' ? 'No read messages yet.' :
                 'No contact requests have been submitted yet.'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Contact Requests Grid */}
        {!loading && filteredRequests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredRequests.map((request) => (
              <Card
                key={request.id}
                className={`shadow-lg hover:shadow-2xl transition-all duration-300 border-0 ${
                  !request.read ? 'bg-blue-50 ring-2 ring-blue-200' : 'bg-white'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <CardTitle className="text-xl text-slate-800">
                          {request.name}
                        </CardTitle>
                        {!request.read && (
                          <Badge className="bg-red-500 text-white">New</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(request.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <a
                        href={`mailto:${request.email}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {request.email}
                      </a>
                    </div>
                    
                    {request.phone && (
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone className="w-4 h-4 text-green-600" />
                        <a
                          href={`tel:${request.phone}`}
                          className="hover:text-green-600 transition-colors"
                        >
                          {request.phone}
                        </a>
                      </div>
                    )}

                    <div className="flex items-start gap-2 text-slate-700">
                      <MessageSquare className="w-4 h-4 text-purple-600 mt-1" />
                      <p className="text-sm line-clamp-3 flex-1">
                        {request.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={() => viewDetails(request)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
                      size="sm"
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                    
                    {!request.read && (
                      <Button
                        onClick={() => markAsRead(request.id)}
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                        size="sm"
                      >
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => deleteRequest(request.id)}
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      size="sm"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContactRequests;
