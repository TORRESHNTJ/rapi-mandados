'use client';

import React, { useState } from 'react';
import { MapPin, Clock, User, Package } from 'lucide-react';

interface Order {
  id: number;
  pickup: string;
  delivery: string;
  description: string;
  customerName: string;
  customerPhone: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
}

const DeliverySystem = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState({
    pickup: '',
    delivery: '',
    description: '',
    customerName: '',
    customerPhone: '',
  });

  const createOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = {
      ...newOrder,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders([...orders, order]);
    setNewOrder({
      pickup: '',
      delivery: '',
      description: '',
      customerName: '',
      customerPhone: '',
    });
  };

  const getStatusClasses = (status: string) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (status === 'in_progress') return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (status: string) => {
    if (status === 'pending') return 'Pendiente';
    if (status === 'in_progress') return 'En Progreso';
    return 'Completado';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Sistema de Rapi Mandados</h1>
      
      <div className="bg-white rounded-lg shadow-lg mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Nuevo Mandado</h2>
          <form onSubmit={createOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Dirección de Recogida
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newOrder.pickup}
                    onChange={(e) => setNewOrder({...newOrder, pickup: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Dirección de Entrega
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newOrder.delivery}
                    onChange={(e) => setNewOrder({...newOrder, delivery: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Descripción del Mandado
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newOrder.description}
                onChange={(e) => setNewOrder({...newOrder, description: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Nombre del Cliente
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newOrder.customerPhone}
                  onChange={(e) => setNewOrder({...newOrder, customerPhone: e.target.value})}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Crear Mandado
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Mandados Activos</h2>
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">{order.description}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Desde: {order.pickup}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Hasta: {order.delivery}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  <span>{order.customerName} - {order.customerPhone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusClasses(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliverySystem;