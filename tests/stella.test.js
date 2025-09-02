// test/stellar-rpc-proxy.test.js
const axios = require('axios')

// Mock axios
jest.mock('axios')

describe('Stellar rpc-proxy', () => {
  test('should call stellar tokenBalance endpoint', async () => {
    // Mock the axios response
    const mockResponse = { data: '136987' }
    axios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse)
    })

    // Import after mocking
    const { stellar } = require('../projects/helper/chain/rpcProxy')

    // Call the function
    const result = await stellar.tokenBalance({ 
      token: 'USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1', 
      address: 'GABC123...' 
    })

    // Verify the call was made correctly
    const mockClient = axios.create()
    expect(mockClient.get).toHaveBeenCalledWith(
      '/stellar/token-balance/USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1/GABC123...'
    )
    expect(result).toBe('136987')
  })
})