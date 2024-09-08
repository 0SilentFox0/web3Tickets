import '@worldcoin/idkit-standalone'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      idkit: {
        initializeIDKit: () => {
          IDKit.init({
            signal: 'test_signal',
            app_id: 'app_50a2eb61b6070b947b4934a9261a95b9',
            action: 'verify-for-ticket-purchase',
            action_description: 'Test action description',
            verification_level: "device",
            handleVerify: (response) => {
            },
            onSuccess: (response) => {
              console.log(response);
            },
          });
        },
        openIDKit: async () => {
          console.log(IDKit.isInitialized);
          await IDKit.open();
        },
      },
    },
  };
});
