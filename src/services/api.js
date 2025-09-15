// API service functions for contracts
const API_BASE_URL = '';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const contractsApi = {
  // Get all contracts
  async getContracts() {
    await delay(500); // Simulate network delay
    try {
      const response = await fetch('/contracts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contracts');
      }
      const contracts = await response.json();
      return contracts;
    } catch (error) {
      throw new Error('Failed to load contracts data');
    }
  },

  // Get contract by ID
  async getContractById(id) {
    await delay(300);
    try {
      const response = await fetch('/contracts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contract');
      }
      const contracts = await response.json();
      const contract = contracts.find(c => c.id === id);
      if (!contract) {
        throw new Error('Contract not found');
      }
      return contract;
    } catch (error) {
      throw new Error('Failed to load contract details');
    }
  },

  // Search contracts
  async searchContracts(query) {
    await delay(400);
    try {
      const response = await fetch('/contracts.json');
      if (!response.ok) {
        throw new Error('Failed to search contracts');
      }
      const contracts = await response.json();
      const filtered = contracts.filter(contract => 
        contract.name.toLowerCase().includes(query.toLowerCase()) ||
        contract.parties.toLowerCase().includes(query.toLowerCase())
      );
      return filtered;
    } catch (error) {
      throw new Error('Failed to search contracts');
    }
  },

  // Filter contracts
  async filterContracts(filters) {
    await delay(400);
    try {
      const response = await fetch('/contracts.json');
      if (!response.ok) {
        throw new Error('Failed to filter contracts');
      }
      let contracts = await response.json();
      
      if (filters.status && filters.status.length > 0) {
        contracts = contracts.filter(contract => 
          filters.status.includes(contract.status)
        );
      }
      
      if (filters.risk && filters.risk.length > 0) {
        contracts = contracts.filter(contract => 
          filters.risk.includes(contract.risk)
        );
      }
      
      return contracts;
    } catch (error) {
      throw new Error('Failed to filter contracts');
    }
  }
};

// Mock authentication API
export const authApi = {
  async login(username, password) {
    await delay(800); // Simulate network delay
    
    if (password !== 'test123') {
      throw new Error('Invalid credentials');
    }
    
    // Mock JWT token
    const mockToken = btoa(JSON.stringify({
      username,
      exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      iat: Date.now()
    }));
    
    return {
      token: mockToken,
      user: {
        username,
        email: `${username}@example.com`,
        name: username.charAt(0).toUpperCase() + username.slice(1)
      }
    };
  },

  async logout() {
    await delay(200);
    return true;
  }
};

// Mock file upload API
export const uploadApi = {
  async uploadFile(file) {
    await delay(2000); // Simulate upload time
    
    // Randomly simulate success/failure
    if (Math.random() > 0.1) { // 90% success rate
      return {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        status: 'success',
        uploadedAt: new Date().toISOString()
      };
    } else {
      throw new Error('Upload failed');
    }
  }
};