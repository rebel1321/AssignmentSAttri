import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contractsApi } from '../services/api';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText,
  BarChart3,
  Eye,
  X
} from 'lucide-react';

const ContractDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);

  useEffect(() => {
    loadContract();
  }, [id]);

  const loadContract = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contractsApi.getContractById(id);
      setContract(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (risk) => {
    const styles = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800'
    };
    return `px-3 py-1 text-sm font-medium rounded-full ${styles[risk]}`;
  };

  const getStatusBadge = (status) => {
    const styles = {
      Active: 'bg-green-100 text-green-800',
      'Renewal Due': 'bg-orange-100 text-orange-800',
      Expired: 'bg-gray-100 text-gray-800'
    };
    return `px-3 py-1 text-sm font-medium rounded-full ${styles[status]}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Renewal Due':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'Expired':
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const openEvidenceDrawer = (evidence) => {
    setSelectedEvidence(evidence);
    setEvidenceDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <h3 className="text-sm font-medium text-red-800">Error Loading Contract</h3>
          </div>
          <p className="text-sm text-red-700 mt-1">{error}</p>
          <div className="mt-3 space-x-2">
            <button
              onClick={loadContract}
              className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!contract) {
    return null;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{contract.name}</h1>
          <p className="text-gray-600 mt-1">Contract Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract Metadata */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Parties</p>
                    <p className="text-sm text-gray-600">{contract.parties}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Start Date</p>
                    <p className="text-sm text-gray-600">{contract.start}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Expiry Date</p>
                    <p className="text-sm text-gray-600">{contract.expiry}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {getStatusIcon(contract.status)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Status</p>
                    <span className={getStatusBadge(contract.status)}>
                      {contract.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Risk Score</p>
                  <span className={getRiskBadge(contract.risk)}>
                    {contract.risk} Risk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Clauses Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Clauses</h2>
            
            <div className="space-y-4">
              {contract.clauses?.map((clause, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{clause.title}</h3>
                    <div className="flex items-center ml-4">
                      <span className="text-xs text-gray-500 mr-2">Confidence:</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${clause.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 ml-2">
                        {Math.round(clause.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{clause.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h2>
            
            <div className="space-y-3">
              {contract.insights?.map((insight, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                    insight.risk === 'High' ? 'bg-red-500' :
                    insight.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        insight.risk === 'High' ? 'bg-red-100 text-red-800' :
                        insight.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {insight.risk} Risk
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{insight.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Evidence Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Evidence</h2>
            
            <div className="space-y-3">
              {contract.evidence?.map((evidence, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => openEvidenceDrawer(evidence)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">{evidence.source}</p>
                    <button className="text-indigo-600 hover:text-indigo-700">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{evidence.snippet}</p>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">Relevance:</span>
                    <div className="w-12 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full" 
                        style={{ width: `${evidence.relevance * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 ml-2">
                      {Math.round(evidence.relevance * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Detail Drawer */}
      {evidenceDrawerOpen && selectedEvidence && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Evidence Detail</h3>
              <button
                onClick={() => setEvidenceDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-1">Source</p>
                <p className="text-sm text-gray-600">{selectedEvidence.source}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-1">Content</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{selectedEvidence.snippet}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Relevance Score</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${selectedEvidence.relevance * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {Math.round(selectedEvidence.relevance * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractDetailPage;