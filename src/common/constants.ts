import { CalendarPriorityKeys, CalendarTaskList } from '../components/Calendars/types'
import dayjs from 'dayjs'

export const MonthList = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

export const WeekDaysList = [
  'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
]

export const disabledColor = 'rgba(30,30,30,.1)'
export const defaultColor = 'rgba(30,30,30,.30)'
export const currentColor = 'rgba(100,149,237,.9)'
export const hoverColor = 'rgba(100,149,237,.35)'

export const priorityColors: { [key in CalendarPriorityKeys]: string } = {
  veryLow: defaultColor,
  low: 'lightblue',
  medium: currentColor,
  high: 'orange',
  veryHigh: 'red'
}

const priorityRu: { [key in CalendarPriorityKeys]: string } = {
  veryLow: 'Очень низкий',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  veryHigh: 'Очень высокий'
}

export const DATE_RENDER_FORMAT = 'DD-MM-YYYY HH:mm'
export let defaultTasksList: CalendarTaskList = [
  {
    id: '1',
    title: 'Завершить написание модального окна',
    description: 'Необходимо завершить работу с модальным окном, чтобы информация по заданию выводилась корректно.',
    createdAt: new Date( 2022, 5, 1, 12, 20 ),
    priority: 'veryHigh',
    time: dayjs( new Date( 2022, 5, 1, 12, 20 ) ).add( 3, 'day' ).toDate(),
    members: [
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Проконтролировать акции в БКС',
    description: 'Необходимо проконтролировать акции в БКС, так как сильно меняются котировки. Возможно, будет шанс докупиться',
    createdAt: new Date(),
    priority: 'veryHigh',
    time: dayjs( new Date( 2022, 5, 1, 20, 50 ) ).toDate(),
    members: [
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }, {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }, {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Проконтролировать акции в БКС',
    description: 'Необходимо проконтролировать акции в БКС, так как сильно меняются котировки. Возможно, будет шанс докупиться',
    createdAt: new Date(),
    priority: 'veryHigh',
    time: dayjs( new Date( 2022, 5, 1, 20, 50 ) ).toDate(),
    members: [
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }
    ]
  }
]
