import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./layouts/DefaultLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('./pages/common/AppHome.vue') },
      { path: 'events', name: 'Events', component: () => import('./pages/common/AppEvents.vue') },
      { path: 'artists', name: 'ArtistList', component: () => import('./pages/common/ArtistList.vue') },
      { path: 'posts', name: 'Posts', component: () => import('./pages/common/AppPosts.vue') },
      { path: 'profile', name: 'Profile', component: () => import('./pages/common/UserProfile.vue') },
      { path: 'tickets', name: 'TicketHistory', component: () => import('./pages/common/TicketHistory.vue') },
      // Artist-only pages
      { path: 'artist/home', name: 'ArtistHome', component: () => import('./pages/artist/ArtistHome.vue') },
      { path: 'artist/events', name: 'ArtistEvents', component: () => import('./pages/artist/ArtistEvents.vue') },
      { path: 'artist/artists', name: 'OtherArtistList', component: () => import('./pages/artist/OtherArtistList.vue') },
      { path: 'artist/posts', name: 'ArtistPosts', component: () => import('./pages/artist/ArtistPosts.vue') },
      { path: 'artist/profile', name: 'ArtistProfile', component: () => import('./pages/artist/ArtistProfile.vue') },
      { path: 'artist/my-events', name: 'MyEvents', component: () => import('./pages/artist/MyEvents.vue') },
      { path: 'artist/event/:id', name: 'ArtistEventDetail', component: () => import('./pages/artist/ArtistEventDetail.vue') },
      { path: 'artist/tickets', name: 'ArtistTicketHistory', component: () => import('./pages/artist/ArtistTicketHistory.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('./layouts/BlankLayout.vue'),
    children: [
      { path: 'login', name: 'Login', component: () => import('./pages/auth/AuthLogin.vue') },
      { path: 'register', name: 'Register', component: () => import('./pages/auth/AuthRegister.vue') },
      { path: 'forgot-password', name: 'ForgotPassword', component: () => import('./pages/auth/ForgotPassword.vue') },
      { path: 'change-password', name: 'ChangePassword', component: () => import('./pages/auth/ChangePassword.vue') },
      { path: 'email-verification', name: 'EmailVerification', component: () => import('./pages/auth/EmailVerification.vue') },
      { path: 'mobile-verification', name: 'MobileVerification', component: () => import('./pages/auth/MobileVerification.vue') },
    ]
  },
  // 404 Not Found
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./pages/NotFound.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 