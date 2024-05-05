import questionStore from './question-store';
import userStore from './user-store';

class RootStore {
  question = questionStore;
  user = userStore;
}

export default RootStore