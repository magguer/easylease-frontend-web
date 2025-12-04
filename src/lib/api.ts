const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8008';

export interface Listing {
  _id: string;
  title: string;
  slug: string;
  price_per_week: number;
  bond: number;
  bills_included: boolean;
  address: string;
  suburb?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  room_type: "master" | "double" | "single";
  available_from?: string;
  min_term_weeks: number;
  preferred_tenants: string[];
  house_features: string[];
  rules: string[];
  images: string[];
  owner_id?: string | { _id: string; name: string; email: string };
  locale: "es" | "en";
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  listing_id?: string;
  status: "new" | "contacted" | "converted" | "discarded";
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      cache: 'no-store', // Disable Next.js caching
      next: { revalidate: 0 }, // Force revalidation on every request
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Listings API
  async getListings(params?: {
    suburb?: string;
    room_type?: string;
    min_price?: number;
    max_price?: number;
    limit?: number;
  }): Promise<ApiResponse<Listing[]>> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request<Listing[]>(`/listings/public${query ? `?${query}` : ''}`);
  }

  async getListingBySlug(slug: string): Promise<ApiResponse<Listing>> {
    return this.request<Listing>(`/listings/slug/${slug}`);
  }

  async createListing(listing: Partial<Listing>): Promise<ApiResponse<Listing>> {
    return this.request<Listing>('/listings', {
      method: 'POST',
      body: JSON.stringify(listing),
    });
  }

  async updateListing(id: string, listing: Partial<Listing>): Promise<ApiResponse<Listing>> {
    return this.request<Listing>(`/listings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(listing),
    });
  }

  async deleteListing(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/listings/${id}`, {
      method: 'DELETE',
    });
  }

  // Leads API
  async getLeads(status?: string): Promise<ApiResponse<Lead[]>> {
    const query = status ? `?status=${status}` : '';
    return this.request<Lead[]>(`/leads${query}`);
  }

  async createLead(lead: Partial<Lead>): Promise<ApiResponse<Lead>> {
    return this.request<Lead>('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
  }

  async updateLeadStatus(id: string, status: string): Promise<ApiResponse<Lead>> {
    return this.request<Lead>(`/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Partners API
  async getPartners(status?: string): Promise<ApiResponse<Partner[]>> {
    const query = status ? `?status=${status}` : '';
    return this.request<Partner[]>(`/partners${query}`);
  }

  async createPartner(partner: Partial<Partner>): Promise<ApiResponse<Partner>> {
    return this.request<Partner>('/partners', {
      method: 'POST',
      body: JSON.stringify(partner),
    });
  }

  async updatePartnerStatus(id: string, status: string): Promise<ApiResponse<Partner>> {
    return this.request<Partner>(`/partners/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Health check
  async healthCheck(): Promise<{ok: boolean; status: string; timestamp: string}> {
    const url = `${this.baseUrl}/api/health`;
    const response = await fetch(url);
    return response.json();
  }
}

export const apiClient = new ApiClient();