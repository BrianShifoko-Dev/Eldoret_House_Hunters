import { neighborhoods } from './mockData';
import { School, ShoppingCart, Bus, Shield, MapPin, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';

export function NeighborhoodsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 mb-4">Eldoret Neighborhoods</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the best areas in Eldoret. Get insights on schools, shopping, transport, and average property prices.
          </p>
        </div>

        {/* Neighborhoods Grid */}
        <div className="space-y-8 pb-16">
          {neighborhoods.map((neighborhood) => (
            <div key={neighborhood.id} className="bg-white rounded-2xl p-8 space-y-6 shadow-sm border border-gray-200">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-gray-900 mb-2">{neighborhood.name}</h2>
                  <p className="text-gray-600">{neighborhood.description}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-600 border-blue-200">
                  <MapPin className="w-3 h-3 mr-1" />
                  Eldoret
                </Badge>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Schools */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-200">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <School className="w-5 h-5" />
                    <span className="font-semibold">Schools</span>
                  </div>
                  <div className="space-y-1">
                    {neighborhood.schools.map((school, idx) => (
                      <div key={idx} className="text-sm text-gray-600">• {school}</div>
                    ))}
                  </div>
                </div>

                {/* Shopping */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-200">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-semibold">Shopping</span>
                  </div>
                  <div className="space-y-1">
                    {neighborhood.shopping.map((place, idx) => (
                      <div key={idx} className="text-sm text-gray-600">• {place}</div>
                    ))}
                  </div>
                </div>

                {/* Transport */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-200">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Bus className="w-5 h-5" />
                    <span className="font-semibold">Transport</span>
                  </div>
                  <p className="text-sm text-gray-600">{neighborhood.transport}</p>
                </div>

                {/* Safety */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-200">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Safety</span>
                  </div>
                  <p className="text-sm text-gray-600">{neighborhood.safety}</p>
                </div>
              </div>

              {/* Price Ranges */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600 font-semibold">Avg. Rent:</span>
                  <span className="text-gray-900 font-semibold">KES {neighborhood.avgRent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600 font-semibold">Avg. Sale:</span>
                  <span className="text-gray-900 font-semibold">KES {neighborhood.avgSale}</span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-50 rounded-xl p-6 h-48 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold text-gray-900">Neighborhood Map</p>
                  <p className="text-sm">{neighborhood.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
