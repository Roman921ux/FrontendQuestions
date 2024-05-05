import axios from 'axios';
import { makeAutoObservable } from 'mobx'
import { isHtmlElement } from 'react-router-dom/dist/dom';

export interface IQuestions {
  _id?: string;
  title: string;
  answer: string;
  rating: number;
  type: string[];
  level: string;
  complex: number;
  voted: any[]; // Замените any[] на конкретный тип, если у вас есть ожидаемая структура для поля voted
  __v?: number;
}
interface IQuestionCreate {
  token: string;
  body: IQuestions;
}
interface IBody {
  action: string;
  btn: {
    left: number;
    right: number;
  };
}
interface ICountRating {
  token: string;
  questionId: string | undefined;
  body: IBody;
}
interface IResetRating {
  token: string;
  questionId: string | undefined;
  action: string
}

//
class QuestionStore {
  questions: IQuestions[] = [];
  loading: string = 'idle';
  type: string = 'all';
  level: string = 'all';

  constructor() {
    makeAutoObservable(this, {}, { deep: true })
    // deep для глубоко отслеживания изменений состояния 
  }

  // нужно оптимизировать код
  get selectQuestionsByType() {
    switch (this.type) {
      case 'all':
        return this.questions
          .filter(item => {
            if (this.level === 'all') {
              return true; // Возвращаем все элементы, если уровень - 'all'
            } else {
              return item.level === this.level; // Возвращаем элементы с соответствующим уровнем
            }
          })
          .sort((a, b) => {
            return b.rating - a.rating; // Сортировка по возрастанию рейтинга
            // Для сортировки по убыванию замените 'a.rating - b.rating' на 'b.rating - a.rating'
          });
      case 'Web':
        return this.questions.filter(item => {
          if (this.level === 'all') {
            return item
          } else {
            return item.level === this.level
          }
        }).filter(item => item.type.some(t => this.type.includes(t)))
          .sort((a, b) => {
            return b.rating - a.rating; // Сортировка по возрастанию рейтинга
            // Для сортировки по убыванию замените 'a.rating - b.rating' на 'b.rating - a.rating'
          })
      case 'React':
        return this.questions.filter(item => {
          if (this.level === 'all') {
            return item
          } else {
            return item.level === this.level
          }
        }).filter(item => item.type.some(t => this.type.includes(t)))
          .sort((a, b) => {
            return b.rating - a.rating; // Сортировка по возрастанию рейтинга
            // Для сортировки по убыванию замените 'a.rating - b.rating' на 'b.rating - a.rating'
          })
      case 'JavaScript':
        return this.questions.filter(item => {
          if (this.level === 'all') {
            return item
          } else {
            return item.level === this.level
          }
        }).filter(item => item.type.some(t => this.type.includes(t)))
          .sort((a, b) => {
            return b.rating - a.rating; // Сортировка по возрастанию рейтинга
            // Для сортировки по убыванию замените 'a.rating - b.rating' на 'b.rating - a.rating'
          })
      case 'TypeScript':
        return this.questions.filter(item => {
          if (this.level === 'all') {
            return item
          } else {
            return item.level === this.level
          }
        }).filter(item => item.type.some(t => this.type.includes(t)))
          .sort((a, b) => {
            return b.rating - a.rating; // Сортировка по возрастанию рейтинга
            // Для сортировки по убыванию замените 'a.rating - b.rating' на 'b.rating - a.rating'
          })
      case 'Css':
        return this.questions.filter(item => {
          if (this.level === 'all') {
            return item
          } else {
            return item.level === this.level
          }
        }).filter(item => item.type.some(t => this.type.includes(t)))
          .sort((a, b) => {
            return b.rating - a.rating; // Сортировка по возрастанию рейтинга
            // Для сортировки по убыванию замените 'a.rating - b.rating' на 'b.rating - a.rating'
          })
      case 'Html':
        return this.questions.filter(item => {
          if (this.level === 'all') {
            return item
          } else {
            return item.level === this.level
          }
        }).filter(item => item.type.some(t => this.type.includes(t)))
          .sort((a, b) => {
            return b.rating - a.rating; // Сортировка по возрастанию рейтинга
            // Для сортировки по убыванию замените 'a.rating - b.rating' на 'b.rating - a.rating'
          })
      default:
        return this.questions
    }
  }


  toggleType(newType: string) {
    this.type = newType
  }
  toggleLevel(newLevel: string) {
    this.level = newLevel
  }

  async loadQuestions() {
    try {
      const response = await axios.get(`http://localhost:4444/question`);
      const data = response.data;
      console.log(data)
      this.questions = [...data];
    } catch (error) {
      console.error('Произошла ошибка при загрузке вопросов:', error);
    }
  }
  async countRating(ObjData: ICountRating) {
    try {
      const res = await fetch(`http://localhost:4444/question/${ObjData.questionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ObjData.token}`
        },
        body: JSON.stringify(ObjData.body)
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json()
      console.log('countRating', data)
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
  async resetRating(ObjData: IResetRating) {
    try {
      const res = await fetch(`http://localhost:4444/question/${ObjData.questionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ObjData.token}`
        },
        body: JSON.stringify({ action: ObjData.action })
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json()
      console.log('resetRating', data)
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
  async createQuestion(ObjData: IQuestionCreate) {
    try {
      const res = await fetch(`http://localhost:4444/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ObjData.token}`
        },
        body: JSON.stringify(ObjData.body)
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json()
      console.log('createQuestion', data)
    } catch (error) {
      console.error('Error fetching createQ data:', error);
      throw error;
    }
  }

}

export default new QuestionStore