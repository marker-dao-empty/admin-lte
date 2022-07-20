/**
 * Pages
 */
import DashboardIndex from './dashboard-index/DashboardIndex'
import DashboardAdmins from './dashboard-admins/DashboardAdmins'
import DashboardBiomes from './dashboard-biomes/DashboardBiomes'
import DashboardBooks from './dashboard-books/DashboardBooks'
import DashboardBookCategories from './dashboard-book-categories/DashboardBookCategories'
import DashboardChildren from './dashboard-children/DashboardChildren'
import DashboardClothings from './dashboard-clothings/DashboardClothings'
import DashboardLessons from './dashboard-lessons/DashboardLessons'
import DashboardTasks from './dashboard-tasks/DashboardTasks'
import DashboardTags from './dashboard-tags/DashboardTags'
import DashboardResources from './dashboard-resources/DashboardResources'
import DashboardRooms from './dashboard-rooms/DashboardRooms'
import DashboardUsers from './dashboard-users/DashboardUsers'
import DashboardPets from './dashboard-pets/DashboardPets'
import DashboardFeatures from './dashboard-features/DashboardFeatures'
import DashboardLearningLevels from './dashboard-learning-levels/DashboardLearningLevels'
import DashboardItemRooms from './dashboard-item-rooms/DashboardItemRooms'
import DashboardItemAquaria from './dashboard-item-aquaria/DashboardItemAquaria'
import DashboardItemHamsters from './dashboard-item-hamsters/DashboardItemHamsters'
import DashboardChildClothings from './dashboard-child-clothings/DashboardChildClothings'
import DashboardChildItems from './dashboard-child-items/DashboardChildItems'
import DashboardChildPets from './dashboard-child-pets/DashboardChildPets'
import DashboardChildTasks from './dashboard-child-tasks/DashboardChildTasks'

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardIndex,
    meta: {
      title: 'Dashboard',
    },
  },
  {
    path: '/admin-users',
    name: 'Admins',
    component: DashboardAdmins,
    meta: {
      title: 'Admin Users',
    },
  },
  {
    path: '/biomes',
    name: 'Biomes',
    component: DashboardBiomes,
    meta: {
      title: 'Biomes',
    },
  },
  {
    path: '/book-categories',
    name: 'Book Categories',
    component: DashboardBookCategories,
    meta: {
      title: 'Book Categories',
    },
  },
  {
    path: '/books',
    name: 'Books',
    component: DashboardBooks,
    meta: {
      title: 'Books',
    },
  },
  {
    path: '/clothings',
    name: 'Clothings',
    component: DashboardClothings,
    meta: {
      title: 'Clothings',
    },
  },
  {
    path: '/children',
    name: 'Children',
    component: DashboardChildren,
    meta: {
      title: 'Children',
    },
  },
  {
    path: '/lessons',
    name: 'Lessons',
    component: DashboardLessons,
    meta: {
      title: 'Lessons',
    },
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: DashboardTasks,
    meta: {
      title: 'Tasks',
    },
  },
  {
    path: '/tags',
    name: 'Tags',
    component: DashboardTags,
    meta: {
      title: 'Tags',
    },
  },
  {
    path: '/resources',
    name: 'Resources',
    component: DashboardResources,
    meta: {
      title: 'Resources',
    },
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: DashboardRooms,
    meta: {
      title: 'Rooms',
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: DashboardUsers,
    meta: {
      title: 'Users',
    },
  },
  {
    path: '/pets',
    name: 'Pets',
    component: DashboardPets,
    meta: {
      title: 'Pets',
    },
  },
  {
    path: '/features',
    name: 'Features',
    component: DashboardFeatures,
    meta: {
      title: 'Features',
    },
  },
  {
    path: '/learning-levels',
    name: 'LearningLevels',
    component: DashboardLearningLevels,
    meta: {
      title: 'Learning levels',
    },
  },
  {
    path: '/item-rooms',
    name: 'ItemRooms',
    component: DashboardItemRooms,
    meta: {
      title: 'Item rooms',
    },
  },
  {
    path: '/item-aquaria',
    name: 'ItemAquaria',
    component: DashboardItemAquaria,
    meta: {
      title: 'Item aquaria',
    },
  },
  {
    path: '/item-hamsters',
    name: 'ItemHamsters',
    component: DashboardItemHamsters,
    meta: {
      title: 'Item hamsters',
    },
  },
  {
    path: '/child-clothings',
    name: 'ChildClothings',
    component: DashboardChildClothings,
    meta: {
      title: 'Child clothings',
    },
  },
  {
    path: '/child-items',
    name: 'ChildItems',
    component: DashboardChildItems,
    meta: {
      title: 'Child items',
    },
  },
  {
    path: '/child-pets',
    name: 'ChildPets',
    component: DashboardChildPets,
    meta: {
      title: 'Child pets',
    },
  },
  {
    path: '/child-tasks',
    name: 'ChildTasks',
    component: DashboardChildTasks,
    meta: {
      title: 'Child tasks',
    },
  },
].map(item => {
  item.meta.layout = 'DashboardLayout'
  item.meta.auth = true

  return item
})
