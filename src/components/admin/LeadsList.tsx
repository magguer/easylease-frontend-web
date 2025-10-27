'use client';

import { useState } from "react";
import { Lead, apiClient } from "@/lib/api";

interface LeadsListProps {
  leads: Lead[];
}

export function LeadsList({ leads: initialLeads }: LeadsListProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      await apiClient.updateLeadStatus(leadId, newStatus);
      
      // Actualizar el estado local
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead._id === leadId 
            ? { ...lead, status: newStatus as Lead['status'] }
            : lead
        )
      );
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert('Error al actualizar el estado del lead');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'discarded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Nuevo';
      case 'contacted':
        return 'Contactado';
      case 'converted':
        return 'Convertido';
      case 'discarded':
        return 'Descartado';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {leads.map((lead) => (
          <li key={lead._id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {lead.name}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {getStatusLabel(lead.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <span className="mr-2">📧</span>
                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:text-blue-700">
                      {lead.email}
                    </a>
                  </div>
                  {lead.phone && (
                    <div className="flex items-center">
                      <span className="mr-2">📞</span>
                      <a href={`tel:${lead.phone}`} className="text-blue-600 hover:text-blue-700">
                        {lead.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span>{new Date(lead.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                  {lead.listing_id && (
                    <div className="flex items-center">
                      <span className="mr-2">🏠</span>
                      <span>Listing ID: {lead.listing_id}</span>
                    </div>
                  )}
                </div>

                {lead.message && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">{lead.message}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => updateLeadStatus(lead._id, 'contacted')}
                disabled={updatingId === lead._id || lead.status === 'contacted'}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  lead.status === 'contacted'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                } ${
                  updatingId === lead._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {updatingId === lead._id ? 'Actualizando...' : 'Marcar como contactado'}
              </button>

              <button
                onClick={() => updateLeadStatus(lead._id, 'converted')}
                disabled={updatingId === lead._id || lead.status === 'converted'}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  lead.status === 'converted'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                } ${
                  updatingId === lead._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {updatingId === lead._id ? 'Actualizando...' : 'Marcar como convertido'}
              </button>

              <button
                onClick={() => updateLeadStatus(lead._id, 'discarded')}
                disabled={updatingId === lead._id || lead.status === 'discarded'}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  lead.status === 'discarded'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                } ${
                  updatingId === lead._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {updatingId === lead._id ? 'Actualizando...' : 'Descartar'}
              </button>

              {lead.status !== 'new' && (
                <button
                  onClick={() => updateLeadStatus(lead._id, 'new')}
                  disabled={updatingId === lead._id}
                  className={`px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors ${
                    updatingId === lead._id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {updatingId === lead._id ? 'Actualizando...' : 'Marcar como nuevo'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}