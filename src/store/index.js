import { createStore } from 'vuex'
import global from './global'
import auth from './auth'
import admins from './admins'
import biomes from './biomes'
import books from './books'
import bookCategories from './book-categories'
import children from './children'
import users from './users'
import clothings from './clothings'
import lessons from './lessons'
import tasks from './tasks'
import tags from './tags'
import resources from './resources'
import rooms from './rooms'
import pets from './pets'
import features from './features'
import learningLevels from './learning-levels'
import itemRooms from './item-rooms'
import itemAquaria from './item-aquaria'
import itemHamsters from './item-hamsters'
import items from './items'
import childClothings from './child-clothings'
import childItems from './child-items'
import childPets from './child-pets'
import childTasks from './child-tasks'

const store = {
  modules: {
    global,
    auth,
    admins,
    biomes,
    books,
    bookCategories,
    children,
    users,
    clothings,
    lessons,
    tasks,
    tags,
    resources,
    rooms,
    pets,
    features,
    learningLevels,
    itemRooms,
    itemAquaria,
    itemHamsters,
    items,
    childClothings,
    childItems,
    childPets,
    childTasks,
  },
}

export default createStore(store)
