'use client';

import { useState } from 'react';
import { Listing, apiClient } from '@/lib/api';
import { CheckCircle } from 'lucide-react';

interface ContactFormProps {
  listingId: string;
  listingTitle: string;
}

export function ContactForm({ listingId, listingTitle }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hola, me interesa la habitación "${listingTitle}". ¿Podríamos hablar?`
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await apiClient.createLead({
        ...formData,
        listing_id: listingId,
      });
      
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-neutral-600 mb-4">
          Hemos recibido tu consulta. El propietario se pondrá en contacto contigo pronto.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: `Hola, me interesa la habitación "${listingTitle}". ¿Podríamos hablar?`
            });
          }}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
        Contactar propietario
      </h3>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="+34 600 123 456"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-600 text-white py-3 px-4 rounded-md font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        Al enviar este formulario, aceptas que el propietario se ponga en contacto contigo.
      </p>
    </form>
  );
}