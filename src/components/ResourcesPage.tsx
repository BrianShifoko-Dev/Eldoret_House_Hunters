'use client';

import { BookOpen, Calculator, FileText, Users, Download, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

export function ResourcesPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('12');
  const [years, setYears] = useState('20');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(years) * 12;
    
    if (principal && rate && n) {
      const payment = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
      setMonthlyPayment(payment);
    }
  };

  const guides = [
    {
      title: 'First-Time Home Buyer Guide',
      description: 'Everything you need to know about buying your first property in Kenya.',
      icon: BookOpen,
      color: 'text-blue-400',
    },
    {
      title: 'Rent vs. Buy Calculator',
      description: 'Should you rent or buy? Find out what makes sense for your situation.',
      icon: Calculator,
      color: 'text-green-400',
    },
    {
      title: 'Moving Checklist',
      description: 'A comprehensive checklist to make your move stress-free.',
      icon: FileText,
      color: 'text-purple-400',
    },
    {
      title: 'Tenant Rights in Kenya',
      description: 'Know your rights as a tenant under Kenyan law.',
      icon: Users,
      color: 'text-amber-400',
    },
  ];

  const providers = [
    { name: 'Kenya Commercial Bank', service: 'Mortgage Provider' },
    { name: 'Equity Bank', service: 'Home Loans' },
    { name: 'Co-operative Bank', service: 'Property Financing' },
    { name: 'Absa Bank Kenya', service: 'Mortgage Solutions' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4 pb-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 mb-4">Resources & Guides</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to make informed property decisions in Kenya
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <button
                key={index}
                className="bg-white rounded-2xl p-6 text-left hover:shadow-lg transition-all space-y-4 shadow-sm border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-2">{guide.title}</h4>
                  <p className="text-sm text-gray-600">{guide.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                  <span>Read More</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Mortgage Calculator */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-blue-600" />
            <h2 className="text-gray-900">Mortgage Calculator</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900 font-semibold">Loan Amount (KES)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 5000000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-semibold">Interest Rate (%)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 12"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-semibold">Loan Term (Years)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 20"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <Button
                onClick={calculateMortgage}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Calculate Payment
              </Button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center border border-gray-200">
              {monthlyPayment ? (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Monthly Payment</div>
                  <div className="text-4xl text-blue-600 font-bold mb-2">
                    KES {monthlyPayment.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-gray-600">
                    Over {years} years at {interestRate}% interest
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-600">
                  <Calculator className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <p>Enter loan details to calculate</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trusted Providers */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-gray-900">Trusted Financial Partners</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {providers.map((provider, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all border border-gray-200"
              >
                <div className="text-gray-900 font-semibold mb-1">{provider.name}</div>
                <div className="text-sm text-gray-600">{provider.service}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads Section */}
        <div className="bg-white rounded-2xl p-8 mt-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-blue-600" />
            <h2 className="text-gray-900">Downloadable Resources</h2>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-all border border-gray-200">
              <div className="text-left">
                <div className="text-gray-900 font-semibold mb-1">Property Inspection Checklist</div>
                <div className="text-sm text-gray-600">PDF • 250 KB</div>
              </div>
              <Download className="w-5 h-5 text-blue-600" />
            </button>

            <button className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-all border border-gray-200">
              <div className="text-left">
                <div className="text-gray-900 font-semibold mb-1">Rental Agreement Template</div>
                <div className="text-sm text-gray-600">DOCX • 180 KB</div>
              </div>
              <Download className="w-5 h-5 text-blue-600" />
            </button>

            <button className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-all border border-gray-200">
              <div className="text-left">
                <div className="text-gray-900 font-semibold mb-1">Eldoret Market Report 2025</div>
                <div className="text-sm text-gray-600">PDF • 1.2 MB</div>
              </div>
              <Download className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
