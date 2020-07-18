export function signIn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'dcsakjghlikodshbgioulsuiiusugklsiuoaigoñihgi',
        user: {
          name: 'Cláudio Filipe Lima Rapôso',
          email: 'engcfraposo@gmail.com',
        },
      });
    }, 2000);
  });
}
