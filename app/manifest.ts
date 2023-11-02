import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'pingping',
    short_name: 'pingping',
    description: 'pingping is a space shared with users who adjust their own ideal type',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: 'icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'icons/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}

// {
//   "theme_color": "#f69435",
//   "background_color": "#f69435",
//   "display": "standalone",
//   "scope": "/",
//   "start_url": "/",
//   "name": "PingPing",
//   "short_name": "pingping",
//   "description": "pingping is a space shared with users who adjust their own ideal type",
//   "icons": [
//     {
//       "src": "android-chrome-192x192.png",
//       "sizes": "192x192",
//       "type": "image/png"
//     },
//     {
//       "src": "icons/android-chrome-512x512.png",
//       "sizes": "512x512",
//       "type": "image/png"
//     },
//     {
//       "src": "icons/favicon.ico",
//       "sizes": "any",
//       "type": "image/x-icon"
//     }
//   ]
// }
