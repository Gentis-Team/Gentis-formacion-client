const createWrapper = () => {
    // ✅ creates a new QueryClient for each test
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
        },
      },
    })
    return ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
  
  test("my first test", async () => {
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: createWrapper()
    })
  })