import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Definition typée du tableau de routes
const routes: RouteRecordRaw[] = [
    // Nouvelle manière avec lazy loading
    {
        path: '/',
        alias: '/home',
        component: () => import('../Views/tp/Home.vue'),
    },
    {
        path: '/about',
        meta: {
            title: 'About',
        },
        component: () => import('../Views/tp/About.vue'),
    },
    {
        path: '/services',
        name: 'services',
        component: () => import('../Views/tp/Service.vue'),
    },
    {
        path: '/contact',
        component: () => import('../Views/tp/Contact.vue'),
    },
    {
        path: '/cookie',
        component: () => import('../Views/tp/Cookie.vue'),
    },
    {
        path: '/privacy',
        component: () => import('../Views/tp/Privacy.vue'),
    },
    {
        path: '/exInterpolation',
        component: () => import('../Views/exercices/ExInterpolation.vue'),
    },
    {
        path: '/lessonAttributeBinding',
        component: () => import('../Views/lessons/LessonAttributeBinding.vue'),
    },
    {
        path: '/lessonTextInterpolation',
        component: () => import('../Views/lessons/LessonTextInterpolation.vue'),
    },
    {
        path: '/lessonIntroduction',
        component: () => import('../Views/lessons/LessonIntroduction.vue'),
    },
    {
        path: '/lessonSetup',
        component: () => import('../Views/lessons/LessonSetup.vue'),
    },
    {
        path: '/lessonSyntax',
        component: () => import('../Views/lessons/LessonSyntax.vue'),
    },
    {
        path: '/dataBinding',
        component: () => import('../Views/tp/Databinding.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../Views/tp/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;