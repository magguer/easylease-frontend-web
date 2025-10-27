'use client';

import { useState } from "react";
import { Partner, apiClient } from "@/lib/api";

interface PartnersListProps {
  partners: Partner[];
}

export function PartnersList({ partners: initialPartners }: PartnersListProps) {
  const [partners, setPartners] = useState(initialPartners);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updatePartnerStatus = async (partnerId: string, newStatus: string) => {
    setUpdatingId(partnerId);
    try {
      await apiClient.updatePartnerStatus(partnerId, newStatus);
      
      // Actualizar el estado local
      setPartners(prevPartners => 
        prevPartners.map(partner => 
          partner._id === partnerId 
            ? { ...partner, status: newStatus as Partner['status'] }
            : partner
        )
      );
    } catch (error) {
      console.error('Error updating partner status:', error);
      alert('Error al actualizar el estado del partner');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {partners.map((partner) => (
          <li key={partner._id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {partner.name}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                    {getStatusLabel(partner.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <span className="mr-2">📧</span>
                    <a href={`mailto:${partner.email}`} className="text-blue-600 hover:text-blue-700">
                      {partner.email}
                    </a>
                  </div>
                  {partner.phone && (
                    <div className="flex items-center">
                      <span className="mr-2">📞</span>
                      <a href={`tel:${partner.phone}`} className="text-blue-600 hover:text-blue-700">
                        {partner.phone}
                      </a>
                    </div>
                  )}
                  {partner.company_name && (
                    <div className="flex items-center">
                      <span className="mr-2">🏢</span>
                      <span>{partner.company_name}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span>Registrado: {new Date(partner.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => updatePartnerStatus(partner._id, 'active')}
                disabled={updatingId === partner._id || partner.status === 'active'}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  partner.status === 'active'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                } ${
                  updatingId === partner._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {updatingId === partner._id ? 'Actualizando...' : 'Activar'}
              </button>

              <button
                onClick={() => updatePartnerStatus(partner._id, 'inactive')}
                disabled={updatingId === partner._id || partner.status === 'inactive'}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  partner.status === 'inactive'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                } ${
                  updatingId === partner._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {updatingId === partner._id ? 'Actualizando...' : 'Desactivar'}
              </button>

              {partner.status !== 'pending' && (
                <button
                  onClick={() => updatePartnerStatus(partner._id, 'pending')}
                  disabled={updatingId === partner._id}
                  className={`px-3 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors ${
                    updatingId === partner._id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {updatingId === partner._id ? 'Actualizando...' : 'Marcar como pendiente'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}