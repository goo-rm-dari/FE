export const geolocation = {
  get: async function () {
    if ('geolocation' in navigator) {
      const result: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        long: result.coords.longitude,
        lat: result.coords.latitude,
      };
    } else {
      console.log('Not Able');
    }
  },
};
