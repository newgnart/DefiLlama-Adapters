// test/starknet-rpc-proxy.test.js
const axios = require('axios')

// Mock axios
jest.mock('axios')

describe('Starknet rpc-proxy', () => {
  test('should call starknet call endpoint', async () => {
    // Mock the axios response
    const mockResponse = { data: '0x123' }
    axios.create.mockReturnValue({
      post: jest.fn().mockResolvedValue(mockResponse)
    })

    // Import after mocking
    const { starknet } = require('../projects/helper/chain/rpcProxy')

    // Mock call body (what formCallBody would generate)
    const mockCallBody = {
      jsonrpc: "2.0",
      id: 0,
      method: "starknet_call",
      params: [{
        contract_address: "0x123",
        entry_point_selector: "0x456",
        calldata: ["0x789"]
      }, "latest"]
    }

    const mockAbi = {
      name: "balanceOf",
      outputs: [{ name: "balance", type: "Uint256" }]
    }

    // Call the function
    const result = await starknet.call({ 
      callBody: mockCallBody,
      abi: mockAbi,
      allAbi: [],
      permitFailure: false
    })

    // Verify the call was made correctly
    const mockClient = axios.create()
    expect(mockClient.post).toHaveBeenCalledWith('/starknet/call', {
      callBody: mockCallBody,
      abi: mockAbi,
      allAbi: [],
      permitFailure: false
    })
    expect(result).toBe('0x123')
  })


})
